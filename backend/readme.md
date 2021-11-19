### 後端架構
```
|-- backend
    |-- manage.py
    |-- requirements.txt
    |-- .env.example
	|-- .env.swp
    |-- filter
    |   |-- __init__.py
    |   |-- admin.py
    |   |-- apps.py
    |   |-- models.py
    |   |-- tests.py
    |   |-- urls.py
    |   |-- views.py
    |-- SN
    |   |-- __init__.py
    |   |-- asgi.py
    |   |-- settings.py
    |   |-- urls.py
    |   |-- wsgi.py
```

### Django 指令
```{python}
django-admin startproject backend
python manage.py startapp filter
python manage.py makemigrations filter
python manage.py migrate
```

### 安裝套件(requirements.txt)
- `django`: python web 應用框架
- `djangorestframework`:  Django 方便建立 REST API 功能的工具組。
- `psycopg2`: python module for PostgreSQL
- `python-decouple`: 將 config 和 code 分開的好用工具。
- `dj-database-url`: configure "DATABASE_URL" environment variable
- `django-cors-headers`: 允許前端port3000的請求


### 模型定義範例 filter/models.py
```
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
```
