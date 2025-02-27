import React, { useState } from 'react'; 

function Add({onAddEvent}) {
  const [isOpen, setIsOpen] = useState(false); // 控制弹出区域的显示状态
  const [inputValue, setInputValue] = useState('');  
  const [inputValue2, setInputValue2] = useState(''); // 存储输入的文本  
  const [selectedOptions, setSelectedOptions] = useState([]); // 存储选中的选项  

  const handleCheckboxChange = (event) => {  
    const { value } = event.target;  
    setSelectedOptions(prevSelectedOptions =>  
      prevSelectedOptions.includes(value)  
        ? prevSelectedOptions.filter(option => option !== value) // 如果已经选择过，则移除  
        : [...prevSelectedOptions, value] // 否则添加  
    );  
  };  

  const handleButtonClick = () => {  
    setIsOpen(true); // 点击按钮时打开操作区域  
  };  

  const handleSubmit = (event) => {  
    event.preventDefault(); // 防止默认提交行为 
    alert(`事件名称: ${inputValue}, 事件地址： ${inputValue2}, 参数: ${selectedOptions}`);  
    const newEvent = {  
      id: Date.now(),  // 使用时间戳作为唯一ID  
      name: inputValue,  
      //address: inputValue2,  
      parameters: selectedOptions // 储存选择的参数数组  
    };  
    onAddEvent(newEvent);
    setIsOpen(false); // 提交后关闭操作区域
    setInputValue('');  
    setInputValue2(''); // 清空输入  
    setSelectedOptions([]); // 清空选择  
  };  
  return (  
    <div>  
      <button onClick={handleButtonClick}>点击添加新事件</button>  

      {isOpen && (  
        <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>  
          <h3>添加新事件</h3>  
          <form onSubmit={handleSubmit}>  
            <div>  
              <label>  
                事件名称:  
                <input  
                  type="text"  
                  value={inputValue}  
                  onChange={(e) => setInputValue(e.target.value)}  
                />  
              </label>  
            </div>
            <div>  
              <label>  
                事件地址:  
                <input  
                  type="text"  
                  value={inputValue2}  
                  onChange={(e) => setInputValue2(e.target.value)}  
                />  
              </label>  
            </div>  
            <div>  
              <p>事件参数:</p>  
              {["A", "B", "C", "D"].map(option => ( // 创建复选框  
                <label key={option}>  
                  <input  
                    type="checkbox"  
                    value={option}  
                    checked={selectedOptions.includes(option)}  
                    onChange={handleCheckboxChange}  
                  />  
                  {option}  
                </label>  
              ))}  
            </div>  
            <button type="submit">提交</button>  
            <button type="button" onClick={() => setIsOpen(false)}>关闭</button>  
          </form>  
        </div>  
      )}  
    </div>  
  );   
}

export default Add;