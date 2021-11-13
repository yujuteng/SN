from django.urls import path
from filter import views

urlpatterns = [
    path('stations', views.station_list),
    path('spots/search', views.spot_search)
]