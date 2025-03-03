import React from 'react';  
import ReactDOM from 'react-dom/client';  
import { BrowserRouter, Routes, Route } from 'react-router-dom';  
import Main from './main.js'
import App from './App';  
import Page from './Page.js';  
import Page1 from './Page1.js';  
import Page2 from './Page2.js';  
import Page3 from './Page3.js';  
console.log(Page); 
console.log(Page1); 
console.log(typeof Page1);
console.log(Page2); 
console.log(typeof Page2);
console.log(Page3); 

const root = ReactDOM.createRoot(document.getElementById('root'));   

root.render(  
  <BrowserRouter>  
    <Routes>  
      <Route path="/" element={<Main />}  />
      <Route path="/button1" element={<Page1 />} /> 
      <Route path="/button2" element={<Page2 />} />  
      <Route path="/button3" element={<Page3 />} />  
      {/* <Route path="*" element={<NotFound />} /> 处理未匹配路径的组件 */}
    </Routes>  
  </BrowserRouter>  
);  

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
