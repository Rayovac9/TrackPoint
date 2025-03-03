import React from 'react';  
import { useNavigate } from 'react-router-dom'; // 导入 useNavigate   
import { addButtonClick } from './Storage';   

const Page = () => {  
  const navigate = useNavigate(); // 初始化 useNavigate 钩子  

  const handleButtonClick = (buttonId) => {  
    const uid = 'user123'; // 这里可以替换为实际的用户 ID  
    addButtonClick(buttonId, uid); // 添加按钮点击记录  
    const url = `/${buttonId}`; // 构建 URL  
    window.open(url, '_blank');  
  };  

  return (  
    <div style={{ textAlign: 'center', padding: '20px' }}>  
      <h1>测试网页</h1>   
      <div>  
        <button onClick={() => handleButtonClick('button1')} style={buttonStyle}>  
          按钮1  
        </button>  
        <div style={boxStyle}>文本框1</div>  
      </div>  
      <div>  
        <button onClick={() => handleButtonClick('button2')} style={buttonStyle}>  
          按钮2  
        </button>  
        <div style={boxStyle}>文本框2</div>  
      </div>  
      <div>  
        <button onClick={() => handleButtonClick('button3')} style={buttonStyle}>  
          按钮3  
        </button>  
        <div style={boxStyle}>文本框3</div>  
      </div>  
    </div>  
  );  
};  

// CSS 样式  
const buttonStyle = {  
  borderRadius: '8px',  
  padding: '10px 20px',  
  margin: '10px',  
  border: '1px solid #000',  
  background: '#fff',  
  cursor: 'pointer',  
};  

const boxStyle = {  
  marginTop: '10px',  
  padding: '20px',  
  border: '1px solid #000',  
  display: 'inline-block',  
  width: '250px',  
};  

export default Page;