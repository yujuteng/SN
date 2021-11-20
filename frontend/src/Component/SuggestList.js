import { Table, Tag, Button, Modal} from 'antd';
import { useState} from 'react';
import './detail.css'
import { EnvironmentOutlined, FileExcelOutlined, UploadOutlined, DoubleRightOutlined } from '@ant-design/icons';


const SuggestList = ({returnData}) => {
  const [tableList , setTableList] = useState([])

const AQIcolor = (aqi)=>{
  if (aqi>0 && aqi<= 50) return "green"
  else if (aqi>50 && aqi<= 100) return "green"
  else if (aqi>100 && aqi<= 150) return "orange"
  else if (aqi>150 && aqi<= 200) return "red"
  else if (aqi>200 && aqi<= 300) return "purple"
  else return "balck"
}

const colorSelect = (input)=>{
  let finalColor = "grey"
  if (input==="淡水信義") finalColor = "red"
  else if (input==="松山新店") finalColor = "green"
  else if (input==="文湖") finalColor = "brown"
  else if (input==="中和新蘆") finalColor = "orange"
  else if (input==="環狀") finalColor = "yellow"
  else finalColor = "blue";

  return finalColor
}

const MRTLineEnglishTransfer = (input)=>{
  let finalColor = "BL"
  if (input==="淡水信義") finalColor = "R"
  else if (input==="松山新店") finalColor = "G"
  else if (input==="文湖") finalColor = "BR"
  else if (input==="中和新蘆") finalColor = "O"
  else if (input==="環狀") finalColor = "Y"
  else finalColor = "BL";

  return finalColor
}

const columns = [
  {
    title: '景點名稱',
    dataIndex: 'nameInfo',
    key: 'nameInfo',
    render: nameInfo => (nameInfo.websiteURL)===""?<>{nameInfo.sname}</>:<a href={nameInfo.websiteURL} target="_blank">{nameInfo.sname}</a>
  },

  {
    title: '捷運站',
    dataIndex: 'mrtInfo',
    key: 'mrtInfo',
    render: mrtInfo => 
        <>{mrtInfo.mrt+" "}{mrtInfo.mrtLine.map(item=>{return (<Tag color = {colorSelect(item)}>{ MRTLineEnglishTransfer(item)}</Tag>) })}</>
        // <>{mrtInfo.mrt}{mrtInfo.mrtLine.map(item=>{return (<font color = {colorSelect(item)}>{"  "+ MRTLineEnglishTransfer(item)}</font>) })}</>
},
  {
    title: '分鐘',
    dataIndex: 'time',
    key: 'time',
    sorter: {
      compare: (a, b) => a.time - b.time,
    },
    responsive: ['md'],
    render: text => <>{text}</>,
  },
  {
    title: '票價',
    dataIndex: 'fare',
    key: 'fare',
    sorter: {
      compare: (a, b) => a.fare - b.fare,
    },
    responsive: ['md'],
    render: text => <>{text}</>,
  },
  {
    title: 'AQI',
    dataIndex: 'aqi',
    key: 'aqi',
    sorter: {
      compare: (a, b) => a.aqi - b.aqi,
    },
    responsive: ['md'],
    render: aqi => <font color = {AQIcolor(aqi)}>{aqi}</font>
  },  
  {
    title: '空氣品質',
    dataIndex: 'aqiDescrip',
    key: 'aqiDescrip',
    render: aqiDescrip => <>{aqiDescrip}</>
  },
  {
    title: '溫度',
    dataIndex: 'temp',
    key: 'temp',
    sorter: {
      compare: (a, b) => a.temp - b.temp,
    },
    render: temp => (temp===-99)?"無資料":<>{temp}</>,
    
  },
  {
    title: '天氣描述',
    dataIndex: 'weather',
    key: 'weather',
    render: weather => (weather==="相對濕度：-9900%")?"無資料":<>{weather}</>
  },
  {
    title: 'Tag',
    key: 'tag',
    dataIndex: 'tag',
    sorter: {
      compare: (a, b) => a.tag.length - b.tag.length,
    },
    responsive: ['md'],
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
    title: '更多',
    dataIndex: 'detail',
    key: 'detail',
    render: detail =>
    <Button onClick={()=>{
      return(
        Modal.info( {
          icon: <EnvironmentOutlined  style={{ fontSize: '150%'}}/>,
          title: '',
          // width: 'auto',
          // closable: true,
          style:{ top: 20 },
          footer: null,
          content: (
            <div className="modalBox">
              {(detail.pictureURL==="")?<FileExcelOutlined left style={{ fontSize: '660%'}} />:
                  <img className="picUrl" src={detail.pictureURL}></img>}
              <h1 className="Infowrapper">{detail.sname}</h1>  
              <p className="Infowrapper">{detail.openTime}</p>
              <p className="Infowrapper">{(detail.addr)===""?'':'地址：'+detail.addr}</p>
              <div className="detailBox">
                <p className="detailInfo"> {detail.descrip}</p>
              </div>
            </div>
          ),
          onOk() {},
        }))
    }}><DoubleRightOutlined style={{ fontSize: '75%'}} /></Button>
  },
];


    const state = {top: 'topLeft',bottom: 'bottomRight'}
    return (
    <div>
        <Table
        columns={columns}
        dataSource={returnData}
        size="small"
        fontSize="12"
        />
    </div>
    );

}

export default SuggestList
