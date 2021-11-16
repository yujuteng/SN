import { Fragment, useState, useEffect } from 'react';
import NearStation from '../Component/NearStation'
import TransferSelect from '../Component/TransferSelect'
import { CarOutlined } from '@ant-design/icons';
import { SwapOutlined } from '@ant-design/icons';
import { HistoryOutlined } from '@ant-design/icons';
import { TagsOutlined } from '@ant-design/icons';
import spotnext from '../spotnext.svg';
import '../App.css'
import SuggestList from '../Component/SuggestList';
import TimeSelect from '../Component/TimeSelect';
import TagSelect from '../Component/TagSelect';
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';

const MenuSet = ( ) => {
    const [station, setStation] = useState(["板南","市政府"])
    const [time, setTime] = useState(0)
    const [transfer, setTransfer] = useState(false)
    const [tag, setTag] = useState([])
    const [check, setCheck] = useState(false)
    const [show, setShow] = useState(false)
    const [returnData, setReturnData] = useState([])

    useEffect(() => {
        fetch("../db.php")
        // axios.get('http://localhost:8000/api/db.php')
        .then((res) => { 
          console.log("db.php api ok"+res);
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
        //   setShow(true);
          setReturnData(res.data);
          console.log(res)
          console.log(userInput);
          console.log("spots/search api ok");
        })
        .catch((error) => { console.log(error); console.log('api/spots/search~~~GG') })
      },[check])

    const handelCheck = () => {
        if (tag.length===0) {
            alert("請選取景點類別")
        }else{
            console.log("按了check!")
            console.log("check: "+check)
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
            {/* <img src={picBackground}></img> */}
            <div className="header_box">
                {/* <img src={logo} className="header_icon" alt="logo" ></img> */}
                <img src={spotnext} className="spotnext-logo" alt="spotnext" ></img>
                <p className="header_inline">SPOT NEXT  </p>
            </div>
            {/* select near station */}

            <div className="select_box">
                <div className="selector_wrapper">
                    <div className="wrapper_icon" > <CarOutlined style={{ fontSize: '160%'}} /> </div>
                    <div className="wrapper_element" > <NearStation station={station} setStation={setStation}/> </div>
                </div>

                {/* select time interval */}
                <div className="selector_wrapper">
                    <div className="wrapper_icon" ><HistoryOutlined style={{ fontSize: '160%'}} /></div>
                    <div className="wrapper_element" ><TimeSelect setTime={setTime}/></div>
                </div>

                {/* is transfer? */}
                <div className="selector_wrapper">
                    <div className="wrapper_icon" ><SwapOutlined style={{ fontSize: '160%'}} /></div>
                    <div className="wrapper_element" ><TransferSelect setTransfer={setTransfer}/></div>
                </div>

                {/* select tag */}
                <div className="selector_wrapper">
                    <div className="wrapper_icon" ><TagsOutlined style={{ fontSize: '160%'}} /></div>
                    <div className="wrapper_element" ><TagSelect setTag={setTag}/></div>
                </div>
    
                <div className="wrapper_icon">
                    <div className="check" ><Btm/></div>
                </div>
            </div>
            {show? <SuggestList returnData={returnData} />:<></>}
            <p>{returnData}</p>
        </div>
    )
}

export default MenuSet