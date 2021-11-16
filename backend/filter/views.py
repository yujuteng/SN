from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from filter.models import Mrt_Station, Mrt_Line, Mrt_Pos, Mrt_Move, Air, Weather, Spot_Info, Spot_Loc, Spot_Tag
from django.db.models import Q

# https://www.django-rest-framework.org/api-guide/status-codes/

@api_view(['GET'])
def station_list(request):
    if request.method == 'GET':
        lines = Mrt_Line.objects.all()
        result = []
        for l in lines:
            l_data = {}
            l_data['value'] = l.cname
            l_data['label'] = l.cname
            l_data['children'] = []
            stations = Mrt_Station.objects.filter(line = l.ename).all()
            for station in stations:
                s_data = {}
                s_data['value'] = f'{station.name}'
                s_data['label'] = f'{station.name}'
                l_data['children'].append(s_data)
            result.append(l_data)

        return Response(result, status=status.HTTP_200_OK)

@api_view(['POST'])
def spot_search(request):
    if 'application/json' not in request.content_type:
        return Response("Content type should be 'application/json'.", status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'POST':
        try:
            start_s = request.data['nearStation'][-1]
            limit = int(request.data['time'])
            transfer = bool(request.data['transfer'])
            tags = request.data['tag']
        except KeyError:
            return Response("4 parameters are all required.", status=status.HTTP_400_BAD_REQUEST)
        
        end_s = Mrt_Move.objects.filter(station1 = start_s, time__lt = limit)   # check time (only move)
        spots = Spot_Loc.objects.filter(Q(mrt__in = end_s.values('station2')) | Q(mrt = start_s))
        spots = Spot_Tag.objects.filter(sid__in = spots.values('sid'), tag__in = tags).distinct('sid')  # check tag
        start_line = Mrt_Station.objects.filter(name = start_s).values('line')
        nice_spot = []
        for s in spots:
            s_loc = Spot_Loc.objects.filter(sid = s.sid)
            # check transfer
            mrt = Mrt_Station.objects.filter(name__in = s_loc.values('mrt'), line__in = start_line)
            if transfer == False:
                if not mrt:
                    continue
            # check time
            travel_time = 0
            s_mrt = s_loc.values('mrt')[0]
            s_mrt = s_mrt.get('mrt')
            if s_mrt != start_s:
                mrt_time = Mrt_Move.objects.filter(station1 = start_s, station2 = s_mrt).values('time')[0]
                travel_time += mrt_time.get('time')
            s_distance = s_loc.values('distance')[0]
            travel_time += s_distance.get('distance') / 60
            if travel_time > limit:
                continue

            # append data
            data = {}
            data['nameInfo'] = {}
            data['nameInfo']['sname'] = s.sid.name
            data['nameInfo']['websiteURL'] = s.sid.website_url
            data['mrtInfo'] = {}
            data['mrtInfo']['mrt'] = s_mrt
            data['mrtInfo']['mrtLine'] = []
            end_line = Mrt_Station.objects.filter(name = s_mrt).values('line')
            for lines in end_line:
                line = Mrt_Line.objects.filter(ename = lines.get('line')).values()[0]
                data['mrtInfo']['mrtLine'].append(line.get('cname'))
            if mrt: data['transfer'] = False
            else: data['transfer'] = True
            data['time'] = round(travel_time)
            if start_s != s_mrt:
                mrt_fare = Mrt_Move.objects.filter(station1 = start_s, station2 = s_mrt).values('fare')[0]
                data['fare'] = mrt_fare.get('fare')
            else: data['fare'] = 0
            data['detail'] = {}
            data['detail']['sname'] = s.sid.name
            data['detail']['pictureURL'] = s.sid.pic_url
            data['detail']['descrip'] = s.sid.descrip
            data['detail']['addr'] = s.sid.addr
            data['detail']['openTime'] = s.sid.open_time
            data['tag'] = []
            s_tags = Spot_Tag.objects.filter(sid = s.sid).values('tag')
            for tag in s_tags:
                data['tag'].append(tag.get('tag'))
            aw = Mrt_Pos.objects.filter(name = s_mrt).values('near_s_air', 'near_s_weather')[0]
            air = Air.objects.filter(sid = aw.get('near_s_air')).values('aqi', 'status')[0]
            data['aqi'] = air.get('aqi')
            data['aqiDescrip'] = air.get('status')
            wea = Weather.objects.filter(sid = aw.get('near_s_weather')).values('temp', 'weather')[0]
            data['temp'] = wea.get('temp')
            data['weather'] = wea.get('weather')
            
            nice_spot.append(data)
        
        # sort by time
        nice_spot = sorted(nice_spot, key=lambda d: d['time'])
        # add key
        result = []
        for i, d in enumerate(nice_spot, start=1):
            d.setdefault('key',i)
            result.append(d)

        return Response(result, status=status.HTTP_200_OK)
