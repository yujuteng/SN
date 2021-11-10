from django.urls import path
from filter import views

urlpatterns = [
    path('stations', views.station_list),
]