from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from filter.models import Station, Line

# https://www.django-rest-framework.org/api-guide/status-codes/

@api_view(['GET'])
def station_list(request):
    if request.method == 'GET':
        lines = Line.objects.all()
        result = []
        for line in lines:
            l_data = {}
            l_data['value'] = line.cname
            l_data['label'] = line.cname
            l_data['children'] = []
            stations = Station.objects.filter(line = line.ename).all()
            for station in stations:
                s_data = {}
                s_data['value'] = station.name
                s_data['label'] = station.name
                l_data['children'].append(s_data)
            result.append(l_data)
        
        return Response(result, status=status.HTTP_200_OK)

