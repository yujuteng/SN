from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from filter.models import Mrt_Station, Mrt_Line, Mrt_Pos, Mrt_Move, Air, Weather, Spot_Info, Spot_Loc, Spot_Tag
from django.db.models import Q

import requests
import psycopg2
import pandas as pd
import numpy as np
import time

# https://www.django-rest-framework.org/api-guide/status-codes/

def db_update():
    conn = psycopg2.connect(database="SN", user="qibao", password="Qingdiyu", host="127.0.0.1", port="5432")
    print("[6] Opened database successfully")
    cur = conn.cursor()

    header = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36',
    'Connection':'close'
    }
    r = requests.get("https://data.epa.gov.tw/api/v1/aqx_p_432?format=json&limit=100&api_key=39e7e545-e563-4395-ba6a-0aa7af4a078b", headers = header)
    time.sleep(1)
    astation = r.json()
    Airstation = pd.DataFrame(astation['records']).filter(items=['SiteName','AQI','Status'])
    Airstation = Airstation.rename(columns={"SiteName": "sid", "AQI": "aqi",'Status':"status"})
    BTPAS=Airstation.copy()
    r = requests.get("https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-1BFEDE3C-7DE9-4A8D-AAD0-34EAC563AD22&format=JSON", headers = header)
    time.sleep(1)
    wstation_p = r.json()
    r = requests.get("https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0001-001?Authorization=CWB-1BFEDE3C-7DE9-4A8D-AAD0-34EAC563AD22&format=JSON", headers = header)
    time.sleep(1)
    wstation_np = r.json()
    WstationP = pd.DataFrame(wstation_p['records']['location']).filter(items=['stationId', 'weatherElement'])
    WstationNP = pd.DataFrame(wstation_np['records']['location']).filter(items=['stationId', 'weatherElement'])

    WstationP['temp']=0.0
    WstationP['humd']=0.0
    WstationP['weather']='-'
    WstationNP['temp']=0.0
    WstationNP['humd']=0.0
    WstationNP['weather']=''


    for i in range(len(WstationP['weatherElement'])):
        WstationP.loc[i,'temp']=float(WstationP['weatherElement'][i][3]["elementValue"])
        WstationP.loc[i,'humd']=float(WstationP['weatherElement'][i][4]["elementValue"])
        WstationP.loc[i,'weather']=WstationP['weatherElement'][i][20]["elementValue"]

    for i in range(len(WstationNP['weatherElement'])):
        WstationNP.loc[i,'temp']=float(WstationNP['weatherElement'][i][3]["elementValue"])
        WstationNP.loc[i,'humd']=float(WstationNP['weatherElement'][i][4]["elementValue"])
        WstationNP.loc[i,'weather']="相對濕度：" + str(round(float(WstationNP['weatherElement'][i][4]["elementValue"])*100))+"%"

    WstationP=WstationP.drop("weatherElement",axis=1)
    WstationNP=WstationNP.drop("weatherElement",axis=1)
    Wstation=pd.concat([WstationP,WstationNP],axis=0)
    Wstation.reset_index(inplace=True, drop=True)
    Wstation = Wstation.rename(columns={"stationId": "sid"})
    #print(Wstation)
    def update_air(aqi_v, status_s, site_now):
        """ update vendor name based on the vendor id """
        sql = """ UPDATE air_wea.air
                    SET aqi=%s, status= %s
                    WHERE sid = %s"""
        #conn = None
        updated_rows = 0
        try:
            cur.execute(sql, (aqi_v, status_s, site_now))
            # get the number of updated rows
            updated_rows = cur.rowcount
            # Commit the changes to the database
            conn.commit()
        #   # Close communication with the PostgreSQL database
        #   cur.close()
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
    #  finally:
    #      if conn is not None:
    #          conn.close()

        return updated_rows

    def update_wea(temp_v, humd_v, weather_s, site_now):
        """ update vendor name based on the vendor id """
        sql = """ UPDATE air_wea.weather
                    SET temp=%s,humd=%s,weather=%s
                    WHERE sid = %s"""
        #conn = None
        updated_rows = 0
        try:
            cur.execute(sql, (temp_v, humd_v, weather_s, site_now))
            # get the number of updated rows
            updated_rows = cur.rowcount
            # Commit the changes to the database
            conn.commit()
        #   # Close communication with the PostgreSQL database
        #   cur.close()
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
    #  finally:
    #      if conn is not None:
    #          conn.close()

        return updated_rows
    
    for i in range(len(BTPAS)):
        update_air(BTPAS.iloc[i]['aqi'], BTPAS.iloc[i]['status'], BTPAS.iloc[i]['sid'])
        
    for i in range(len(Wstation)):
        update_wea(Wstation.iloc[i]['temp'], Wstation.iloc[i]['humd'], Wstation.iloc[i]['weather'], Wstation.iloc[i]['sid'])


    print("[27]Operation done successfully")
    conn.close()



@api_view(['GET'])
def station_list(request):
    db_update()
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
