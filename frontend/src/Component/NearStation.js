import { Cascader } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import { useEffect, useState } from 'react';


const options = [
  {
    value: '淡水',
    label: '淡水',
    children: [
        {
            value: '淡水',
            label: '淡水',
        },
        {
            value: '劍潭',
            label: '劍潭',
        },
        {
            value: '石牌',
            label: '石牌',
        },
        {
            value: '明德',
            label: '明德',
        },
        ],
  },{
  value: '板南',
  label: '板南',
  children: [
      {
          value: '市政府',
          label: '市政府',
      },
      {
          value: '國父紀念館',
          label: '國父紀念館',
      }
      ],
},
];

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
            defaultValue={['板南', '市政府']}
            options={stationList}
            onChange={handleChange}
            placeholder="最靠近的捷運站："
        />
    )
}

export default NearStation            