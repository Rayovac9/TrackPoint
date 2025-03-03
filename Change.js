// Change.js  
import React, { useState } from 'react'; 
import { saveTrackingData } from './Storage'; 

function Change({ eventToEdit, onUpdateEvent, onClose }) {  
  const [inputValue, setInputValue] = useState(eventToEdit.name);  
  const [inputValue2, setInputValue2] = useState(eventToEdit.address || ''); // 假设地址可选  
  const [selectedOptions, setSelectedOptions] = useState(eventToEdit.parameters);  

  const handleCheckboxChange = (event) => {  
    const { value } = event.target;  
    setSelectedOptions(prevSelectedOptions =>   
      prevSelectedOptions.includes(value)  
        ? prevSelectedOptions.filter(option => option !== value) // 移除  
        : [...prevSelectedOptions, value] // 添加  
    );  
  };  

  const handleSubmit = (event) => {  
    event.preventDefault();  
    const updatedEvent = {  
      ...eventToEdit,  
      name: inputValue,  
      address: inputValue2,  
      parameters: selectedOptions,  
    };  
    onUpdateEvent(updatedEvent);  
    saveTrackingData(updatedEvent);
  };  

  return (  
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>  
      <h3>修改事件</h3>  
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
          {["浏览器版本", "操作系统", "uid", "上报时间"].map(option => (  
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
        <button type="submit">更新</button>  
        <button type="button" onClick={onClose}>关闭</button>  
      </form>  
    </div>  
  );  
}  

export default Change;