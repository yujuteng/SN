import { Select } from 'antd';
import 'antd/dist/antd.css';

const { Option } = Select;
const TimeSelect = ({setTime}) =>{

  const timesTable =[10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90]

  function handleChange(value) {
    console.log(`Selected: ${value}`);
    setTime(value);
  }
  return (
    <Select
    showSearch
    onChange={handleChange}
    style={{ width: 150 }}
    defaultValue={"10 分鐘"}
  >
  {timesTable.map((time)=>{
      return <Option value={time}>{"約 "+time + " 分鐘"}</Option>
  })}
  </Select>
  );
}

export default TimeSelect