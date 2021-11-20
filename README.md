# Spot Next（SN）
原定的行程提早結束了，想要在附近逛逛，但不知道有什麼地方能去？

只要輸入你指定的條件，Spot Next 就可以幫助你決定下一個景點要去哪裡！

## 分工
- 陳琳瑄 Front-end using ReactJS, Axios
- 施懿修 Database of spot using python and postgreSQL
- 沈姿雨 Database of air quality and weather station, MRT with their nearest stations, and updating database by python and postgreSQL
- 鄧鈺儒 Back-end using python and Django, database of MRT using python and postgreSQL

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
------------------- ---------
asgiref             3.4.1
certifi             2021.10.8
charset-normalizer  2.0.7
dj-database-url     0.5.0
Django              3.2.6
django-cors-headers 3.8.0
djangorestframework 3.12.4
idna                3.3
numpy               1.17.3
pandas              1.1.5
pathlib             1.0.1
pip                 21.3.1
psycopg2-binary     2.9.1
python-dateutil     2.8.2
python-decouple     3.4
pytz                2021.3
requests            2.26.0
ruamel.yaml         0.17.17
ruamel.yaml.clib    0.2.6
setuptools          49.2.1
six                 1.16.0
sqlparse            0.4.2
urllib3             1.26.7
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
DEBUG=False
ALLOWED_HOSTS=.localhost,127.0.0.1
DATABASE_URL={postgres://USER:PASSWORD@HOST:PORT/NAME}
```

至 `SN/backend/filter/views.py` 的第17行中修改連接資料庫的相關參數

```
conn = psycopg2.connect(database="SN", user="USERNAME", password="PASSWORD", host="127.0.0.1", port="5432")
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

#### 電腦版
<img width="1424" alt="StartPage" src="https://user-images.githubusercontent.com/72818070/142722824-c892fab3-9a6c-4967-bb86-aa7ae1463a5c.png">

#### 手機版

<img width="926" alt="截圖 2021-11-20 下午10 22 28" src="https://user-images.githubusercontent.com/72818070/142729843-d21fe6e1-1286-4174-8905-4c102174c918.png">

##### 使用chrom開啟「開發人員工具」後點選Element/Consloe左側的圖案

##### 並將頁面左上角的長寬設定為450x800

<img width="375" alt="Phone_start_page" src="https://user-images.githubusercontent.com/72818070/142722851-e34f00f2-ab73-44bd-8d2e-7da80d12e30f.png">

#### 查詢選單
<img width="368" alt="選擇" src="https://user-images.githubusercontent.com/72818070/142722887-e65766c9-3727-4dc4-a34b-bb89d28e7575.png">

透過選擇想要多久之內抵達、離自己最近的捷運站、是否接受轉乘以及旅遊景點分類標籤後，按下查詢。

#### 推薦景點

即可獲得每十個景點一面的顯示畫面

<img width="359" alt="截圖 2021-11-20 下午10 18 19" src="https://user-images.githubusercontent.com/72818070/142729635-72dbfff2-da81-4acd-80db-ce72941b3715.png">


1. 於右下角可切換頁數
2. 左側景點文字若為藍色，表示可點按跳轉至其官網。
3. 捷運站名後方的有色英文指的是此站所對應的線。
4. 點選下方的「Restart」，可回到查詢頁面進行新的查詢。（無記憶上次查詢功能）
5. 右側的更多，則是點按後出現景點照片、開放時間、地址、與景點介紹，

   若介紹過多則會在右側出現下拉滑動條。
   
   點按右下角的ok即可回到推薦景點畫面。
   
<img width="374" alt="MoreInfo" src="https://user-images.githubusercontent.com/72818070/142723015-c501e331-6efe-4e75-95d7-d2b9790cdeac.png">

#### 排序操作(僅限電腦版)
由於版面配置因素，於手機版取消票價、移動時間、AQI、溫度、Tags等資訊，選擇性放置於電腦版面中。

<img width="1364" alt="截圖 2021-11-20 下午10 02 22" src="https://user-images.githubusercontent.com/72818070/142729105-70caba78-7b4a-4fc4-bae4-2ee3f31c9de5.png">


1. 點選「票價、移動時間、AQI、溫度」欄位中右側的雙三角形，可對該欄數據進行升降冪的排序。
2. 點選「Tag」欄位中右側的雙三角形，則可以對Tag的數量進行排序。
