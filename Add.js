import React, { useState } from 'react';   
import { saveTrackingData } from './Storage';   

function Add({ onAddEvent }) {  
  const [isOpen, setIsOpen] = useState(false); // 控制弹出区域的显示状态  
  const [inputValue, setInputValue] = useState('');  
  const [selectedAction, setSelectedAction] = useState('请选择'); // 新增状态，存储第一个下拉框的选择  
  const [selectedButton, setSelectedButton] = useState('请选择'); // 新增状态，存储第二个下拉框的选择  
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
    if (selectedAction === '请选择' || selectedButton === '请选择') {  
      alert('请先选择有效的选项！');  
      return;  
    }  
    alert(`事件名称: ${inputValue}, 参数: ${selectedOptions}`);  
    const newEvent = {  
      id: Date.now(),  // 使用时间戳作为唯一ID  
      name: inputValue,  
      actionType: selectedAction, // 储存选择的事件类型  
      buttonOrPage: selectedButton, // 储存选择的按钮或页面  
      parameters: selectedOptions // 储存选择的参数数组  
    };  
    onAddEvent(newEvent);  
    saveTrackingData(newEvent); // 存储到 localStorage  
    setIsOpen(false); // 提交后关闭操作区域  
    setInputValue('');  
    setSelectedAction('请选择'); // 重置选择  
    setSelectedButton('请选择'); // 重置选择  
    setSelectedOptions([]); // 清空选择  
  };  

  return (  
    <div>  
      <button onClick={handleButtonClick}>点击添加新事件</button>  

      {isOpen && (  
        <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>  
          <h3>新事件</h3>  
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
                事件类型:  
                <select value={selectedAction} onChange={(e) => setSelectedAction(e.target.value)}>  
                  <option value="请选择">请选择</option>  
                  <option value="点击">点击</option>  
                  <option value="浏览">浏览</option>  
                </select>  
              </label>  
            </div>  
            <div>  
              <label>  
                {selectedAction === '点击' ? '按钮选择:' : '页面选择:'}  
                <select value={selectedButton} onChange={(e) => setSelectedButton(e.target.value)}>  
                  <option value="请选择">请选择</option>  
                  {selectedAction === '点击' ? (  
                    <>  
                      <option value="按钮1">按钮1</option>  
                      <option value="按钮2">按钮2</option>  
                      <option value="按钮3">按钮3</option>  
                    </>  
                  ) : (  
                    <>  
                      <option value="Page1">Page1</option>  
                      <option value="Page2">Page2</option>  
                      <option value="Page3">Page3</option>  
                    </>  
                  )}  
                </select>  
              </label>  
            </div>  
            <div>  
              <p>事件参数:</p>  
              {["浏览器版本", "操作系统", "uid", "上报时间"].map(option => ( // 创建复选框  
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