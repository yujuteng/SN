import { Select } from 'antd';
import 'antd/dist/antd.css';

const { Option } = Select;
const TransferSelect = ({setTransfer}) =>{

  const transferTable =[{id:true, choose:"在同一條線上"}, {id:false, choose:"可接受轉乘"}]

  const handleChange = (value) => {
    console.log(`Selected: ${value}`);
    setTransfer(value);
  }
  return (
      <Select
        showSearch
        onChange={handleChange}
        style={{ width: 150 }}
        defaultValue={"在同一條線上"}
      >
      {transferTable.map((e)=>{
          return <Option value={e.id}>{e.choose}</Option>
      })}
      </Select>
      
    );
}

export default TransferSelect
