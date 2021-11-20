import {useState, useEffect } from 'react';
import { CarOutlined, SwapOutlined, HistoryOutlined, TagsOutlined, SearchOutlined, HomeOutlined  } from '@ant-design/icons';
import { Button } from 'antd';
import axios from 'axios';
import spotnext from '../spotnext.svg';
import '../App.css'
import SuggestList from '../Component/SuggestList';
import TimeSelect from '../Component/TimeSelect';
import TagSelect from '../Component/TagSelect';
import NearStation from '../Component/NearStation';
import TransferSelect from '../Component/TransferSelect';

const MenuSet = () => {
    const [station, setStation] = useState(['松山新店', '公館'])
    const [time, setTime] = useState(0)
    const [transfer, setTransfer] = useState(false)
    const [tag, setTag] = useState([])
    const [check, setCheck] = useState(false)
    const [show, setShow] = useState(false)
    const [returnData, setReturnData] = useState([])

    useEffect(() => {
        axios.post('http://127.0.0.1:8000/api/spots/search', {
          "nearStation":station,
          "time":time,
          "transfer":transfer,	
          "tag":tag
        })
        .then((res) => { 
          setReturnData(res.data);
          console.log("spots/search api ok");
        })
        .catch((error) => { console.log(error); console.log('api/spots/search~~~GG') })
      },[check])

    const handelCheck = () => {
        if (tag.length===0) {
            alert("請選取景點類別")
        }else{

            setCheck(!check)
            setShow(!show)
        }
    }
    const handelBack = () => {
        // restart
        setTag([])
        setTime(10)
        setTransfer(false)
        setStation(['松山新店', '公館'])
        setReturnData([])
        setCheck(false)
        setShow(false)

    }
    const Btm =() =>{
        return(
            <Button onClick={()=>handelCheck()} type="default" shape="round" icon={<SearchOutlined />} size="large">查詢</Button>
        )
    } 
    const BackBtm =() =>{
        return(
            <Button onClick={()=>handelBack()} type="default" shape="round" icon={<HomeOutlined />} size="large">Restart</Button>
        )
    } 
    

    return (
        <div className='App-header '
            style={{ 
                backgroundImage:`url("https://images.pexels.com/photos/417023/pexels-photo-417023.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260")` 
                }}>
            <div className="header_box">
                <img src={spotnext} className="spotnext-logo" alt="spotnext" ></img>
                <p className="header_inline">SPOT NEXT </p>
            </div>
            {/* select near station */}
            {(!show)?
            <>
            <div className="select_box">
                {/* select time interval */}
                <div className="selector_wrapper">
                    <div className="wrapper_icon" ><HistoryOutlined style={{ fontSize: '160%'}} /></div>
                    <div className="wrapper_element" > 想要多久之內抵達：<TimeSelect setTime={setTime} inputmode="none" inputReadOnly/></div>
                </div>

                <div className="selector_wrapper">
                    <div className="wrapper_icon" > <CarOutlined style={{ fontSize: '160%'}} /> </div>
                    <div className="wrapper_element" > 離你最近的捷運站： <NearStation station={station} setStation={setStation} inputmode="none" inputReadOnly/> </div>
                </div>


                {/* is transfer? */}
                <div className="selector_wrapper">
                    <div className="wrapper_icon" ><SwapOutlined style={{ fontSize: '160%'}} /></div>
                    <div className="wrapper_element" > 是否接受轉乘：<TransferSelect setTransfer={setTransfer} inputmode="none" inputReadOnly/></div>
                </div>

                {/* select tag */}
                <div className="selector_wrapper">
                    <div className="wrapper_icon" ><TagsOutlined style={{ fontSize: '160%'}} /></div>
                    <div className="wrapper_element" > 選擇景點分類：<TagSelect setTag={setTag} inputmode="none" inputReadOnly/></div>
                </div>
    

            </div>
                <div className="wrapper_icon">
                <div className="check" ><Btm/></div>
            </div>
            </>
            :<><SuggestList returnData={returnData} /> <BackBtm /></>}
            {/* {show? <SuggestList returnData={returnData} />:<></>} */}
            {/* {show? <CardList returnData={returnData} />:<></>} */}
            {/* <div className="card-wrapper">
                <CardList/>
            </div> */}
        </div>
    )
}

export default MenuSet
