import { Table, Tag, Radio, Space, Button,  Card, Modal} from 'antd';
import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import './detail.css'
import { EnvironmentOutlined } from '@ant-design/icons';
const data = [
  {
    key: '1',
    sname: '中正紀念堂',
    mrt: '淡水信義/中正紀念堂',
    time: '30 mins',
    money: '20台幣',
    tags: ['nice', 'developer'],
    aqi: ["205","😢"],
    temperature: "22-25C",
    weather: "晴時多雲偶陣雨",
  },
  {
    key: '2',
    sname: '中正紀念堂',
    mrt: '淡水信義/象山',
    time: '30 mins',
    tags: ['溫泉', '古蹟'],
    aqi: ["15","🤗"],
    temperature: "12-55C",
    weather: "陣雨",
  },
  {
    key: '3',
    sname: '中正紀念堂',
    mrt: '淡水信義/象山',
    time: '30 mins',
    tags: ['溫泉', '古蹟'],
    aqi: ["15","🤗"],
    temperature: "12-55C",
    weather: "陣雨",
  },
  {
    key: '4',
    sname: '中正紀念堂',
    mrt: '淡水信義/中正紀念堂',
    time: '30 mins',
    tags: ['溫泉', '古蹟'],
    aqi: ["15","🤗"],
    temperature: "12-55C",
    weather: "陣雨",
  },
  {
    key: '5',
    sname: '中正紀念堂',
    mrt: '淡水信義/中正紀念堂',
    time: '30 mins',
    tags: ['溫泉', '古蹟'],
    aqi: ["15","🤗"],
    temperature: "12-55C",
    weather: "陣雨",
  },
 
];


// const transferDS= (input)=>{
//   cosnt tempArray = []
//   input.map()
// }
const newData = [
  {
    key: '1',
    nameInfo:{
      sname: '中正紀念堂',
      websiteURL: "https://google.com",
    },
    mrtInfo:{
      mrt: '中正紀念堂',
      mrtLine: '淡水信義'
    },
    transfer: true,
    time: 30,
    fare: 20,
    detail:{
      sname: "中正紀念堂",
      pictureURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Chiang_Kai-shek_memorial_amk.jpg/2560px-Chiang_Kai-shek_memorial_amk.jpg",
      descrip: "台灣街區．．．",
      addr: null,
      openTime: "全年開放",
    },
    tag: ["藝術", "運動", "休閒", "風景",  "博物館"],
    aqi: 205,
    aqiDescrip: "良好",
    temp: 22,
    weather: "晴時多雲偶陣雨",
},
{
  key: '2',
  nameInfo:{
    sname: '象山親山步道',
    websiteURL: "https://www.travel.taipei/zh-tw/attraction/details/185",
  },
  mrtInfo:{
    mrt: '象山',
    mrtLine: '淡水信義',
  },
  transfer: true,
  time: 40,
  fare: 30,
  detail:{
    sname: "象山親山步道",
    pictureURL: "https://www.travel.taipei/image/182750/1024x768",
    descrip: "象山因外形似象頭而得名，位於臺北盆地東南方的信義區，與虎山地質相同主要由砂岩組成，因造山作用步道中可見黃褐色陡峭的岩壁與巨石，加上自然環境生物、鳥類種類繁多，使得整座山如同一座天然生態樂園般，成為民眾接近淺山、享受戶外綠林悠閒時光的好去處。",
    addr: "臺北市信義區南港山系西北側山麓",
    openTime: "全年開放",
  },
  tag: ["宗教", "歷史", "夜市", "商圈"],
  aqi: 100,
  aqiDescrip: "良好",
  temp: 22,
  weather: "晴時多雲偶陣雨",
},
{
  key: '3',
  nameInfo:{
    sname: '中正紀念堂',
    websiteURL: "https://google.com",
  },
  mrtInfo:{
    mrt: '中正紀念堂',
    mrtLine: '淡水信義'
  },
  transfer: true,
  time: 30,
  fare: 20,
  detail:{
    sname: "中正紀念堂",
    pictureURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Chiang_Kai-shek_memorial_amk.jpg/2560px-Chiang_Kai-shek_memorial_amk.jpg",
    descrip: "台灣街區．．．",
    addr: null,
    openTime: "全年開放",
  },
  tag: ["藝術", "運動", "休閒", "風景",  "博物館"],
  aqi: 205,
  aqiDescrip: "良好",
  temp: 22,
  weather: "晴時多雲偶陣雨",
},
{
key: '4',
nameInfo:{
  sname: '象山親山步道',
  websiteURL: "https://www.travel.taipei/zh-tw/attraction/details/185",
},
mrtInfo:{
  mrt: '象山',
  mrtLine: '淡水信義',
},
transfer: true,
time: 40,
fare: 30,
detail:{
  sname: "象山親山步道",
  pictureURL: "https://www.travel.taipei/image/182750/1024x768",
  descrip: "象山因外形似象頭而得名，位於臺北盆地東南方的信義區，與虎山地質相同主要由砂岩組成，因造山作用步道中可見黃褐色陡峭的岩壁與巨石，加上自然環境生物、鳥類種類繁多，使得整座山如同一座天然生態樂園般，成為民眾接近淺山、享受戶外綠林悠閒時光的好去處。",
  addr: "臺北市信義區南港山系西北側山麓",
  openTime: "全年開放",
},
tag: ["宗教", "歷史", "夜市", "商圈"],
aqi: 100,
aqiDescrip: "良好",
temp: 22,
weather: "晴時多雲偶陣雨",
},
{
  key: '5',
  nameInfo:{
    sname: '中正紀念堂',
    websiteURL: "https://google.com",
  },
  mrtInfo:{
    mrt: '中正紀念堂',
    mrtLine: '淡水信義'
  },
  transfer: true,
  time: 30,
  fare: 20,
  detail:{
    sname: "中正紀念堂",
    pictureURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Chiang_Kai-shek_memorial_amk.jpg/2560px-Chiang_Kai-shek_memorial_amk.jpg",
    descrip: "台灣街區．．．",
    addr: null,
    openTime: "全年開放",
  },
  tag: ["藝術", "運動", "休閒", "風景",  "博物館"],
  aqi: 205,
  aqiDescrip: "良好",
  temp: 22,
  weather: "晴時多雲偶陣雨",
},
{
key: '6',
nameInfo:{
  sname: '象山親山步道',
  websiteURL: "https://www.travel.taipei/zh-tw/attraction/details/185",
},
mrtInfo:{
  mrt: '象山',
  mrtLine: '淡水信義',
},
transfer: true,
time: 40,
fare: 30,
detail:{
  sname: "象山親山步道",
  pictureURL: "https://www.travel.taipei/image/182750/1024x768",
  descrip: "象山因外形似象頭而得名，位於臺北盆地東南方的信義區，與虎山地質相同主要由砂岩組成，因造山作用步道中可見黃褐色陡峭的岩壁與巨石，加上自然環境生物、鳥類種類繁多，使得整座山如同一座天然生態樂園般，成為民眾接近淺山、享受戶外綠林悠閒時光的好去處。",
  addr: "臺北市信義區南港山系西北側山麓",
  openTime: "全年開放",
},
tag: ["宗教", "歷史", "夜市", "商圈"],
aqi: 100,
aqiDescrip: "良好",
temp: 22,
weather: "晴時多雲偶陣雨",
},
{
  key: '7',
  nameInfo:{
    sname: '中正紀念堂',
    websiteURL: "https://google.com",
  },
  mrtInfo:{
    mrt: '中正紀念堂',
    mrtLine: '淡水信義'
  },
  transfer: true,
  time: 30,
  fare: 20,
  detail:{
    sname: "中正紀念堂",
    pictureURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Chiang_Kai-shek_memorial_amk.jpg/2560px-Chiang_Kai-shek_memorial_amk.jpg",
    descrip: "台灣街區．．．",
    addr: null,
    openTime: "全年開放",
  },
  tag: ["藝術", "運動", "休閒", "風景",  "博物館"],
  aqi: 205,
  aqiDescrip: "良好",
  temp: 22,
  weather: "晴時多雲偶陣雨",
},
{
key: '8',
nameInfo:{
  sname: '象山親山步道',
  websiteURL: "https://www.travel.taipei/zh-tw/attraction/details/185",
},
mrtInfo:{
  mrt: '象山',
  mrtLine: '淡水信義',
},
transfer: true,
time: 40,
fare: 30,
detail:{
  sname: "象山親山步道",
  pictureURL: "https://www.travel.taipei/image/182750/1024x768",
  descrip: "象山因外形似象頭而得名，位於臺北盆地東南方的信義區，與虎山地質相同主要由砂岩組成，因造山作用步道中可見黃褐色陡峭的岩壁與巨石，加上自然環境生物、鳥類種類繁多，使得整座山如同一座天然生態樂園般，成為民眾接近淺山、享受戶外綠林悠閒時光的好去處。",
  addr: "臺北市信義區南港山系西北側山麓",
  openTime: "全年開放",
},
tag: ["宗教", "歷史", "夜市", "商圈"],
aqi: 100,
aqiDescrip: "良好",
temp: 22,
weather: "晴時多雲偶陣雨",
},
{
  key: '9',
  nameInfo:{
    sname: '中正紀念堂',
    websiteURL: "https://google.com",
  },
  mrtInfo:{
    mrt: '中正紀念堂',
    mrtLine: '淡水信義'
  },
  transfer: true,
  time: 30,
  fare: 20,
  detail:{
    sname: "中正紀念堂",
    pictureURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Chiang_Kai-shek_memorial_amk.jpg/2560px-Chiang_Kai-shek_memorial_amk.jpg",
    descrip: "台灣街區．．．",
    addr: null,
    openTime: "全年開放",
  },
  tag: ["藝術", "運動", "休閒", "風景",  "博物館"],
  aqi: 205,
  aqiDescrip: "良好",
  temp: 22,
  weather: "晴時多雲偶陣雨",
},
{
key: '10',
nameInfo:{
  sname: '象山親山步道',
  websiteURL: "https://www.travel.taipei/zh-tw/attraction/details/185",
},
mrtInfo:{
  mrt: '象山',
  mrtLine: '淡水信義',
},
transfer: true,
time: 40,
fare: 30,
detail:{
  sname: "象山親山步道",
  pictureURL: "https://www.travel.taipei/image/182750/1024x768",
  descrip: "象山因外形似象頭而得名，位於臺北盆地東南方的信義區，與虎山地質相同主要由砂岩組成，因造山作用步道中可見黃褐色陡峭的岩壁與巨石，加上自然環境生物、鳥類種類繁多，使得整座山如同一座天然生態樂園般，成為民眾接近淺山、享受戶外綠林悠閒時光的好去處。",
  addr: "臺北市信義區南港山系西北側山麓",
  openTime: "全年開放",
},
tag: ["宗教", "歷史", "夜市", "商圈"],
aqi: 100,
aqiDescrip: "良好",
temp: 22,
weather: "晴時多雲偶陣雨",
},
{
  key: '11',
  nameInfo:{
    sname: '中正紀念堂',
    websiteURL: "https://google.com",
  },
  mrtInfo:{
    mrt: '中正紀念堂',
    mrtLine: '淡水信義'
  },
  transfer: true,
  time: 30,
  fare: 20,
  detail:{
    sname: "中正紀念堂",
    pictureURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Chiang_Kai-shek_memorial_amk.jpg/2560px-Chiang_Kai-shek_memorial_amk.jpg",
    descrip: "台灣街區．．．",
    addr: null,
    openTime: "全年開放",
  },
  tag: ["藝術", "運動", "休閒", "風景",  "博物館"],
  aqi: 205,
  aqiDescrip: "良好",
  temp: 22,
  weather: "晴時多雲偶陣雨",
},
{
key: '12',
nameInfo:{
  sname: '象山親山步道',
  websiteURL: "https://www.travel.taipei/zh-tw/attraction/details/185",
},
mrtInfo:{
  mrt: '象山',
  mrtLine: '淡水信義',
},
transfer: true,
time: 40,
fare: 30,
detail:{
  sname: "象山親山步道",
  pictureURL: "https://www.travel.taipei/image/182750/1024x768",
  descrip: "象山因外形似象頭而得名，位於臺北盆地東南方的信義區，與虎山地質相同主要由砂岩組成，因造山作用步道中可見黃褐色陡峭的岩壁與巨石，加上自然環境生物、鳥類種類繁多，使得整座山如同一座天然生態樂園般，成為民眾接近淺山、享受戶外綠林悠閒時光的好去處。",
  addr: "臺北市信義區南港山系西北側山麓",
  openTime: "全年開放",
},
tag: ["宗教", "歷史", "夜市", "商圈"],
aqi: 100,
aqiDescrip: "良好",
temp: 22,
weather: "晴時多雲偶陣雨",
},
]

const SuggestList = ({suggestList}) => {
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



const columns = [
  {
    title: '景點名稱',
    dataIndex: 'nameInfo',
    key: 'nameInfo',
    render: nameInfo => <a href={nameInfo.websiteURL}>{nameInfo.sname}</a>,
  },
  {
    title: '靠近的捷運站',
    dataIndex: 'mrtInfo',
    key: 'mrtInfo',
    render: mrtInfo => 
      <span><font color="red">{mrtInfo.mrtLine}</font> / {mrtInfo.mrt}</span>
  },
  {
    title: '轉乘時間',
    dataIndex: 'time',
    key: 'time',
    sorter: {
      compare: (a, b) => a.time - b.time,
    },
    render: text => <>{text+ ' 分'}</>,
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
    // render: () => (
    //     <p color = {aqi > 100?'red':'green'}>
    //         {aqi}
    //         <p/>
    //     ),
  },
  {
    title: '溫度（C）',
    dataIndex: 'temperature',
    key: 'temperature',
    sorter: {
      compare: (a, b) => a.temperature - b.temperature,
    },
    // render: int => <a> {int +'度'} <a/>,
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
          icon: <EnvironmentOutlined />,
          title: '',
          width: '800px',
          content: (
            <div className="detailInfo">
              <img className="picUrl" src={detail.pictureURL}></img>
              <div className="Infowrapper">
                <h1>{detail.sname}</h1>  
                <p>{detail.openTime}</p>
                <p>{(detail.addr)===null?'':'地址：'+detail.addr}</p>
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
        dataSource={newData}
        // size="middle"
        // dataSource={tableList} Final
        />
    </div>
    );

}

export default SuggestList