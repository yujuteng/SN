import { Cascader } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

const NearStation = ({setStation}) => {

    const [stationList, setStationList] = useState([])

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/stations')
        .then((res) => { 
            console.log(res)
            setStationList(res.data)
            console.log(stationList)
        })
        .catch((error) => { console.log(error) })
      },[])

    function handleChange(value) {
        console.log(`Selected: ${value}`);
        setStation(value);
      }
    return (
        <Cascader  
            // size="large"
            style={{ width: '100%' }}
            defaultValue={['松山新店', '公館']}
            options={stationList}
            onChange={handleChange}
        />
    )
}

export default NearStation            
