import { Select } from 'antd';

const { Option } = Select;

const tagArray = ["藝術", "運動", "休閒", "風景", "宗教", "歷史", "夜市", "商圈", "博物館"];
const children =[]

for (let i = 0; i < tagArray.length; i++) {
  children.push(<Option key={i} value={tagArray[i]}>{tagArray[i]}</Option>);
}

const TagSelect = ({tag, setTag}) => {
  function handleChange(value) {
    console.log(`Selected: ${value}`);
    setTag(value);
  }

  return (
    <>
      <Select
        mode="multiple"
        size="default"
        placeholder="Please select"
        onChange={handleChange}
        style={{ width: '200px' }}
      >
        {children}
      </Select>
    </>
  );
};

export default TagSelect