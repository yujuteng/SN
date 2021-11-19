# Spot Next（SN）
原定的行程提早結束了，想要在附近逛逛，但不知道有什麼地方能去？

只要輸入你指定的條件，Spot Next 就可以幫助你決定下一個景點要去哪裡！

## 分工
- 陳琳瑄 Front-end using ReactJS, Axios
- 施懿修 Database of spot (include schema design and data colleciton) using python and postgreSQL
- 沈姿雨 Table of MRT stations and their nearest air quality and weather station, database of air quality and weather station , and updating database by python and postgreSqQL
- 鄧鈺儒 Back-end using python and Django, Database of mrt (include schema design and data colleciton) using python and postgreSQL

## Database

- 下載 [PostgreSQL 13](https://www.postgresql.org/download/) 以及 [pdAdmin](https://www.pgadmin.org/) (GUI介面)
- db 資料夾裡有個 sql 檔案，在pgAdmin中開一個叫做「SN」的database，
- 再對其按右鍵 → restore...
- 選擇剛剛下載的「SN.sql」（Format: Custom or tar），
- 按右下的restore

- refresh後有看到資料就是成功了

* [Postgres setup on MacOS](https://www.youtube.com/watch?v=EZAa0LSxPPU)
* [匯入/匯出現有資料庫 by pdAdmin](https://www.youtube.com/watch?v=C30q5i1e9KE)


### API

- **API endpoint**: http://127.0.0.1:8000/api
- **兩個接口**
    >GET /stations
    
    >POST /spots/search


## Backend

確定電腦有安裝 `python3` 以及完成上述資料匯入資料庫的指令後打開終端機執行以下指令：

```shell
# for mac
cd backend
python3 -m venv env #建立虛擬環境 #-m: module-name
source env/bin/activate #啟動虛擬環境 for mac
```

```shell
# for windows
cd backend
python -m venv env #建立虛擬環境 #-m: module-name
env\Scripts\activate.bat #啟動虛擬環境 for windows
```

成功的話，command prompt 前面應該會多出 `(env)` 的字樣，代表已經進入這個虛擬環境。如果未來想退出這個虛擬環境，可以輸入 `deactivate`。
接著下載所需套件，需要的套件與版本已定義在 `requirements.txt`，下載完可以輸入`pip list`檢查所有用 `pip` 下載的套件。

```shell
python -m pip install --upgrade pip #pip更新至最新版本
pip install -r requirements.txt
pip list
```
```
Package             Version
------------------- -------
asgiref             3.4.1
dj-database-url     0.5.0
Django              3.2.6
django-cors-headers 3.8.0
djangorestframework 3.12.4
pip                 21.3
psycopg2            2.9.1
python-decouple     3.4
pytz                2021.1
setuptools          47.1.0
sqlparse            0.4.1
```

安裝完套件後複製 `.env.example` 的內容到 `.env`。

```shell
# for mac
cp .env.example .env
```

```shell
# for windows
copy .env.example .env
```

接著可以將 `.env` 當中的變數改成符合你電腦資料庫的值。

```shell
SECRET_KEY={aaaaaaaaa}
DEBUG=True
ALLOWED_HOSTS=.localhost,127.0.0.1
DATABASE_URL={postgres://USER:PASSWORD@HOST:PORT/NAME}
```

最後，同步資料庫並啟動 backend server。

```shell
python manage.py migrate
python manage.py runserver
```

用瀏覽器打開  http://127.0.0.1:8000/api/stations ，如果有順利拿到資源表示後端起成功。


## Frontend

#### Step 0. 安裝 yarn
如果你還沒有安裝 yarn，請參考官網 https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable ，依照步驟安裝。

#### Step 1. 安裝 packages
第一次開啟專案請先用以下指令安裝所有需要的 packages，之後再次開啟專案跳過這個指令即可。
```shell
cd frontend
yarn
```

#### Step 2. 開啟前端
```shell
cd frontend
yarn start
```
#### Step 3. 開啟瀏覽器 
一般情況會自動開啟瀏覽器，若沒有請手動開啟 http://127.0.0.1:3000/ ，看到以下畫面即代表成功開啟前端且前後端連接成功。

#### 查詢選單

#### 推薦景點

#### 排序與細目



