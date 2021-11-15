# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Mrt_Line(models.Model):
    ename = models.TextField(primary_key=True)
    cname = models.TextField()

    class Meta:
        db_table = 'mrt"."MRT_Line'

    def __str__(self):
        return self.ename

class Mrt_Station(models.Model):
    sid = models.TextField(primary_key=True)
    line = models.ForeignKey(Mrt_Line, on_delete=models.CASCADE, db_column='line')
    name = models.ForeignKey('Mrt_Pos', on_delete=models.CASCADE, db_column='name')

    class Meta:
        db_table = 'mrt"."MRT_Station'
    
    def __str__(self):
        return self.name

class Mrt_Pos(models.Model):
    name = models.TextField(primary_key=True)
    longitude = models.FloatField()
    latitude = models.FloatField()
    near_s_weather = models.ForeignKey('Weather', null=True, on_delete=models.SET_NULL, db_column='near_s_weather', related_name='mrt2wea')
    near_s_air = models.ForeignKey('Air', null=True, on_delete=models.SET_NULL, db_column='near_s_air', related_name='mrt2air')

    class Meta:
        db_table = 'mrt"."MRT_Position'
    
    def __str__(self):
        return self.name


class Mrt_Move(models.Model):
    station1 = models.ForeignKey(Mrt_Pos, on_delete=models.CASCADE, db_column='station1', related_name='s1')
    station2 = models.ForeignKey(Mrt_Pos, on_delete=models.CASCADE, db_column='station2', related_name='s2')
    fare = models.IntegerField()
    time = models.IntegerField()
    id = models.IntegerField(primary_key=True)

    class Meta:
        db_table = 'mrt"."MRT_Move'
    
    def __str__(self):
        return f'{self.station1}2{self.station2}'

class Air(models.Model):
    sid = models.TextField(primary_key=True)
    aqi = models.IntegerField()
    status = models.TextField()

    class Meta:
        db_table = 'air_wea"."air'

    def __str__(self):
        return f'{self.sid}_{self.status}'

class Weather(models.Model):
    sid = models.TextField(primary_key=True)
    temp = models.FloatField()
    humd = models.FloatField()
    weather = models.TextField()

    class Meta:
        db_table = 'air_wea"."weather'

    def __str__(self):
        return f'{self.sid}_{self.weather}'

class Spot_Info(models.Model):
    sid = models.TextField(primary_key=True)
    name = models.TextField()
    descrip = models.TextField()
    addr = models.TextField()
    open_time = models.TextField()
    pic_url = models.TextField()
    website_url = models.TextField()

    class Meta:
        db_table = 'spot"."spot_info'

    def __str__(self):
        return self.name

class Spot_Loc(models.Model):
    sid = models.ForeignKey(Spot_Info, on_delete=models.CASCADE, db_column='sid', primary_key=True)
    distance = models.FloatField()
    mrt = models.ForeignKey(Mrt_Pos, null=True, on_delete=models.SET_NULL, db_column='mrt')

    class Meta:
        db_table = 'spot"."spot_locate'

    def __str__(self):
        return f'{self.id}_{self.mrt}'

class Spot_Tag(models.Model):
    sid = models.ForeignKey(Spot_Info, on_delete=models.CASCADE, db_column='sid')
    tag = models.TextField()
    id = models.IntegerField(primary_key=True)

    class Meta:
        db_table = 'spot"."spot_tag'

    def __str__(self):
        return f'{self.sid}_{self.tag}'
