import { Table, Tag, Radio, Space, Button,  Card, Modal} from 'antd';
import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import './detail.css'
import { EnvironmentOutlined, FileExcelOutlined } from '@ant-design/icons';

const returnDataHardCode = [
  {
      "nameInfo": {
          "sname": "二二八和平公園",
          "websiteURL": "http://228memorialmuseum.gov.taipei/ct.asp?xItem=1874245&ctNode=38980&mp=11900A"
      },
      "mrtInfo": {
          "mrt": "台大醫院",
          "mrtLine": [
              "淡水信義"
          ]
      },
      "transfer": false,
      "time": 3,
      "fare": 20,
      "detail": {
          "sname": "二二八和平公園",
          "pictureURL": "https://www.travel.taipei/image/63649",
          "descrip": "二二八和平公園位於臺北市公園路、襄陽路、懷寧街與凱達格蘭大道所圍成的街廓內，古典風格的都會公園，園內有日本庭園式造景池塘、拱橋、綠地步道及露天音樂臺，而台北二二八紀念館和紀念碑也設立在園區內。1995年，李前總統代表政府，在二二八紀念碑前向受難家屬致歉，同年內，前臺北市長陳水扁也將「臺北新公園」改名為「二二八和平公園」希望藉此安慰受難者家屬心中的哀痛，更希望後代子孫能記取歷史教訓，共同為臺灣的前途和人民奮鬥。1997年，二二八事件50周年時，「二二八事件紀念碑碑文」完成銘刻揭幕儀式。同時也設置「台北二二八紀念館」藉由紀念館展覽，將事件始末以及受難史實公諸於世。唯有認清歷史和發現事實，為自己和後代追求幸福，才能獲得真正的平靜。",
          "addr": "",
          "openTime": ""
      },
      "tag": [
          "休閒"
      ],
      "aqi": 0,
      "aqiDescrip": "普通",
      "temp": 0.0,
      "weather": "-",
      "key": 1
  },
  {
      "nameInfo": {
          "sname": "國立臺灣博物館_南門館",
          "websiteURL": "https://www.ntm.gov.tw/submenu_171.html"
      },
      "mrtInfo": {
          "mrt": "中正紀念堂",
          "mrtLine": [
              "松山新店",
              "淡水信義"
          ]
      },
      "transfer": false,
      "time": 4,
      "fare": 0,
      "detail": {
          "sname": "國立臺灣博物館_南門館",
          "pictureURL": "https://www.travel.taipei/image/89006",
          "descrip": "日本時代臺灣總督府於1897年規定鴉片專賣，並陸續將樟腦（1899年）、食鹽（1899年）、菸草（1906年）、酒（1922年）等納入專賣事業。「臺灣總督府專賣局臺北南門工場」創建於1899年，為製造及試驗樟腦、鴉片等兩大專賣品的重要生產基地，1901年改稱南門工場，1931年再改名為臺北南門工場，是日本時代臺灣唯一的公營樟腦加工廠。戰後本工場由政府接收，1947年二二八事件後，臺灣專賣（公賣）業務縮減為菸、酒、樟腦三項，本工場於1952年改稱臺灣省樟腦煉製廠、1956年再改名為臺灣省樟腦廠。1967年12月樟腦開放民營，本工場遂停工廢廠。今日建築物僅有物品倉庫（小白宮）、樟腦倉庫（紅樓）和四百石貯水槽，現存基地面積不及日治時期的八分之一。1998年，南門工場由內政部指定為國定古蹟，2004年起臺灣博物館配合文化部（原行政院文化建設委員會）首都文化園區計畫，建構「臺灣博物館系統」，將都市中的歷史空間整頓再利用為博物館空間。2006年本工場土地建物由國有財產局撥交臺灣博物館，將古蹟建築物再利用為展示館並新建一棟典藏庫房，由詹益忠建築師事務所負責修復再利用之規劃設計。本工場修復過程宛如建築歷史的解剖，涉及建築設計、結構、機電設備、保存、考古、傳統工藝、歷史和工程等專業領域合作。",
          "addr": "",
          "openTime": ""
      },
      "tag": [
          "博物館"
      ],
      "aqi": 0,
      "aqiDescrip": "良好",
      "temp": 0.0,
      "weather": "-",
      "key": 2
  },
  {
      "nameInfo": {
          "sname": "捷運中山地下書街_誠品R79",
          "websiteURL": "https://meet.eslite.com/tw/tc/store/20180220044"
      },
      "mrtInfo": {
          "mrt": "中山",
          "mrtLine": [
              "松山新店",
              "淡水信義"
          ]
      },
      "transfer": false,
      "time": 5,
      "fare": 20,
      "detail": {
          "sname": "捷運中山地下書街_誠品R79",
          "pictureURL": "https://www.travel.taipei/image/100366",
          "descrip": "地下街全長815公尺，地下街總面積約4,446坪，包括廣場、走道、店鋪及辦公室等使用空間，出入口共有7處、廣場共有5座。位於捷運中山站及雙連站間的中山地下書街，提供愛書人更明亮、舒適、豐富的閱覽及購書休閒環境，是串聯中山、雙連捷運站的樞紐，也是全台最長書街。除了書店、文具館與音樂館之外，書街內還有許多文創小店及不定期的展覽，看書之餘也能吹冷氣逛街。",
          "addr": "",
          "openTime": "週一至週日11：00~22：00"
      },
      "tag": [
          "商圈",
          "休閒"
      ],
      "aqi": 0,
      "aqiDescrip": "普通",
      "temp": 0.0,
      "weather": "-",
      "key": 3
  },
  {
      "nameInfo": {
          "sname": "國立中正紀念堂",
          "websiteURL": "http://www.cksmh.gov.tw/"
      },
      "mrtInfo": {
          "mrt": "中正紀念堂",
          "mrtLine": [
              "松山新店",
              "淡水信義"
          ]
      },
      "transfer": false,
      "time": 6,
      "fare": 0,
      "detail": {
          "sname": "國立中正紀念堂",
          "pictureURL": "https://www.travel.taipei/image/63530",
          "descrip": "白牆藍瓦，70公尺高聳立在紀念公園的中央，不論從哪個角度看過去，都很宏偉。國外觀光客來到臺灣，不論行程如何排，都一定會到這裡來參觀一下。紀念堂的下方有陳列和展覽，也有紀念品販售。紀念堂是為了紀念中華民國第一任總統蔣介石，他於1975年逝世，次年行政院就破土開建中正紀念堂，設計師是設計圓山大飯店的楊卓成。紀念堂原址是陸軍總部，當時是臺北市區內最大的軍區，據說從大陸運過來的黃金，就曾經存放在這個地方。紀念堂採用的藍白兩色，是國旗上面主要的顏色，紀念堂頂部天穹的裝飾是青天白日12道光芒，銅像朝西面對總統府和中國大陸，其中都有特殊的意義。隨著民主演進思想開放，紀念堂前的廣場 已成了民主運動的集會場。",
          "addr": "",
          "openTime": "紀念堂開放時間：am09:00-pm06:00（星期一不休館）紀念公園開放時間：am05:00-pm12:00(休館日：除年度機電保養日、二二八紀念日、春節除夕及大年初一休館外，幾乎全年不休館)"
      },
      "tag": [
          "歷史",
          "休閒"
      ],
      "aqi": 0,
      "aqiDescrip": "良好",
      "temp": 0.0,
      "weather": "-",
      "key": 4
  }]

const SuggestList = ({returnData}) => {
  const [tableList , setTableList] = useState([])



// const handleChange = (pagination, filters, sorter) => {
//   console.log('Various parameters', pagination, filters, sorter);
//   setFilteredInfo(filters);
//   setSortedInfo(filters);
// };

// const clearFilters = () => {
//   setFilteredInfo(null)
// };

// const clearAll = () => {
//   setFilteredInfo(null);
//   setSortedInfo(null);
// };

// const setAgeSort = () => {
//   this.setState({
//     sortedInfo: {
//       order: 'descend',
//       columnKey: 'age',
//     },
//   });
// };
const colorSelect = (input)=>{
  let finalColor = "blue"
  if (input==="淡水信義") finalColor = "red"
  else if (input==="松山新店") finalColor = "green"
  else if (input==="文湖") finalColor = "brown"
  else if (input==="中和新蘆") finalColor = "orange"
  else if (input==="環狀") finalColor = "yellow"
  else finalColor = "blue";

  return finalColor
}

const handleTemperature =(input)=>{
  if (input>=30) return "red"
  else if (input>19 && input<30) return "green"
  else if (input<20) return "blue"
}

const columns = [
  {
    title: '景點名稱',
    dataIndex: 'nameInfo',
    key: 'nameInfo',
    render: nameInfo => (nameInfo.websiteURL)===""?<>{nameInfo.sname}</>:<a href={nameInfo.websiteURL} target="_blank">{nameInfo.sname}</a>
  },
  {
    title: '靠近的捷運站',
    dataIndex: 'mrtInfo',
    key: 'mrtInfo',
    render: mrtInfo => 
        <>
          {mrtInfo.mrtLine.map(item=>{return (<font color = {colorSelect(item)}>{item+" / "}</font>) })}{mrtInfo.mrt}</>
  },
  {
    title: '時間',
    dataIndex: 'time',
    key: 'time',
    sorter: {
      compare: (a, b) => a.time - b.time,
    },
    render: text => <>{text+ ' 分鐘'}</>,
  },
  {
    title: '票價(元)',
    dataIndex: 'fare',
    key: 'fare',
    sorter: {
      compare: (a, b) => a.fare - b.fare,
    },
  },
  {
    title: 'AQI',
    dataIndex: 'aqi',
    key: 'aqi',
    sorter: {
      compare: (a, b) => a.aqi - b.aqi,
    },
    render: aqi => <p color = {aqi > 100?'red':'green'}>{aqi}</p>
  },  
  {
    title: ':)',
    dataIndex: 'aqiDescrip',
    key: 'aqiDescrip',
    sorter: {
      compare: (a, b) => a.aqiDescrip - b.aqiDescrip,
    },
    render: aqiDescrip => <p >{aqiDescrip}</p>
  },
  {
    title: '溫度（C）',
    dataIndex: 'temperature',
    key: 'temperature',
    sorter: {
      compare: (a, b) => a.temperature - b.temperature,
    },
    render: temperature => temperature==="-"?<></>:<font color={handleTemperature(temperature)}> {temperature +'度'} </font>
    
  },
  {
    title: '氣象描述',
    dataIndex: 'weather',
    key: 'weather',
    sorter: {
      compare: (a, b) => a.weather - b.weather,
    },
  },
  {
    title: 'Tag',
    key: 'tag',
    dataIndex: 'tag',
    sorter: {
      compare: (a, b) => a.tag.length - b.tag.length,
    },
    render: tag => (
      <span>
        {tag.map(item => {
          let color = "";
          if (item === "藝術")color = 'yellow';
          else if (item ===  "運動")color = 'geekblue';
          else if (item ===  "休閒")color = 'blue';
          else if (item ===  "風景")color = 'green';
          else if (item ===  "宗教")color = 'red';
          else if (item ===  "歷史")color = 'brown';
          else if (item ===  "夜市")color = 'purple';
          else if (item ===  "商圈")color = 'black';
          else if (item ===  "博物館")color = 'orange';


          return (
            <Tag color={color} key={item}>
              {item}
            </Tag>
          );
        })}
      </span>
    ),
  },
  {
    title: '詳細資料',
    dataIndex: 'detail',
    key: 'detail',
    render: detail =>
    <Button onClick={()=>{
      return(
        Modal.info( {
          icon: <EnvironmentOutlined  style={{ fontSize: '300%'}}/>,
          title: '',
          width: '800px',
          content: (
            <div className="detailInfo">
              {(detail.pictureURL==="")?<FileExcelOutlined left style={{ fontSize: '660%'}} />:
                <img className="picUrl" src={detail.pictureURL}></img>}
              <div className="Infowrapper">
                <h1>{detail.sname}</h1>  
                <p>{detail.openTime}</p>
                <p>{(detail.addr)===""?'':'地址：'+detail.addr}</p>
                <p>{detail.descrip}</p>
              </div>
            </div>
          ),
          onOk() {},
        }))
    }}> More</Button>
  },
];


    const state = {top: 'topLeft',bottom: 'bottomRight'}
    return (
    <div>
        <Table
        columns={columns}
        dataSource={returnData}
        // size="middle"
        // dataSource={tableList} Final
        />
    </div>
    );

}

export default SuggestList