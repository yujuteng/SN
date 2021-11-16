import {useState, useEffect } from 'react';
import { CarOutlined, SwapOutlined, HistoryOutlined, TagsOutlined, SearchOutlined  } from '@ant-design/icons';
import { Button } from 'antd';
import axios from 'axios';
import spotnext from '../spotnext.svg';
import '../App.css'
import SuggestList from '../Component/SuggestList';
import TimeSelect from '../Component/TimeSelect';
import TagSelect from '../Component/TagSelect';
import NearStation from '../Component/NearStation'
import TransferSelect from '../Component/TransferSelect'


const MenuSet = () => {
    const [station, setStation] = useState(["板南","市政府"])
    const [time, setTime] = useState(10)
    const [transfer, setTransfer] = useState(false)
    const [tag, setTag] = useState([])
    const [check, setCheck] = useState(false)
    const [show, setShow] = useState(false)
    const [returnData, setReturnData] = useState([])

    useEffect(() => {
        // fetch("db.php")
        fetch('http://192.168.50.214/db.php')
        .then((res) => { 
          console.log("db.php api ok");
          console.log(res)
        })
        .catch((error) => { console.log(error); console.log('DB/PHP/QQ') })
      },[])

    useEffect(() => {
        let userInput = {
            "nearStation": station,
            "time": time,
            "transfer": transfer,	
            "tag": tag
        }

        axios.post('http://127.0.0.1:8000/api/spots/search', {
          "nearStation":station,
          "time":time,
          "transfer":transfer,	
          "tag":tag
        })
        .then((res) => { 
          setReturnData(res.data);
          console.log(userInput);
          console.log("spots/search api ok");
        })
        .catch((error) => { console.log(error); console.log('api/spots/search~~~GG') })
      },[check])

    const handelCheck = () => {
        if (tag.length===0) {
            alert("請選取景點類別")
        }else{
            setCheck(!check)
            setShow(true)
        }
    }
    const Btm =() =>{
        return(
            <Button onClick={()=>handelCheck()} type="default" shape="round" icon={<SearchOutlined />} size="large">查詢</Button>
        )
    } 
    

    return (
        <div className='App-header '
            style={{ 
                backgroundImage:`url("https://images.pexels.com/photos/417023/pexels-photo-417023.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260")` 
                }}>
            <div className="header_box">
                <img src={spotnext} className="spotnext-logo" alt="spotnext" ></img>
                <p className="header_inline">SPOT NEXT  </p>
            </div>
            {/* select near station */}

            <div className="select_box">
                <div className="selector_wrapper">
                    <div className="wrapper_icon" > <CarOutlined style={{ fontSize: '160%'}} /> </div>
                    <div className="wrapper_element" > 離你最近的車站： <NearStation station={station} setStation={setStation}/> </div>
                </div>

                {/* select time interval */}
                <div className="selector_wrapper">
                    <div className="wrapper_icon" ><HistoryOutlined style={{ fontSize: '160%'}} /></div>
                    <div className="wrapper_element" > 選擇可接受時間：<TimeSelect setTime={setTime}/></div>
                </div>

                {/* is transfer? */}
                <div className="selector_wrapper">
                    <div className="wrapper_icon" ><SwapOutlined style={{ fontSize: '160%'}} /></div>
                    <div className="wrapper_element" > 決定是否轉乘：<TransferSelect setTransfer={setTransfer}/></div>
                </div>

                {/* select tag */}
                <div className="selector_wrapper">
                    <div className="wrapper_icon" ><TagsOutlined style={{ fontSize: '160%'}} /></div>
                    <div className="wrapper_element" > 請選擇標籤：<TagSelect setTag={setTag}/></div>
                </div>
    
                <div className="wrapper_icon">
                    <div className="check" ><Btm/></div>
                </div>
            </div>
            {show? <SuggestList returnData={returnData} />:<></>}
        </div>
    )
}

export default MenuSet