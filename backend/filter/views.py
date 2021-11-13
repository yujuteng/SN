from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from filter.models import Mrt_Station, Mrt_Line, Mrt_Pos, Mrt_Move, Air, Weather, Spot_Info, Spot_Loc, Spot_Tag
# from filter.serializers import Mrt_Pos_Serializer
# from django.db.models import F

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
            start_s = request.data['nearStation']
            limit = int(request.data['time'])
            transfer = bool(request.data['transfer'])
            tags = request.data['tag']
            
        except KeyError:
            return Response("4 parameters are all required.", status=status.HTTP_400_BAD_REQUEST)
        
        '''
        end_s = Mrt_Move.objects.filter(station1 = start_s, time__lte = limit)
        spots = Spot_Loc.objects.filter(mrt = end_s.values('station2'), limit__gte = (F(('distance' / 60)) + end_s.values('time')))
        '''

        result = "恭喜成功！"
        return Response(result, status=status.HTTP_200_OK)
        

