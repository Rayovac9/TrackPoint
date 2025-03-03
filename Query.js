import React from 'react';  
import { getTrackingData } from './Storage'; // 确保导入获取跟踪数据的函数  

const Query = () => {  
  const trackingData = getTrackingData(); // 获取跟踪数据  

  return (  
    <div style={{ padding: '20px' }}>  
      <h1>跟踪数据查询</h1>  

      <h2>按钮点击记录</h2>  
      {trackingData.buttonClicks && trackingData.buttonClicks.length > 0 ? (  
        <ul>  
          {trackingData.buttonClicks.map((click, index) => (  
            <li key={index}>  
              按钮ID: {click.buttonId}, 点击时间: {click.timestamp}  
            </li>  
          ))}  
        </ul>  
      ) : (  
        <p>没有按钮点击记录。</p>  
      )}  

      <h2>页面访问记录</h2>  
      {trackingData.pageVisits && trackingData.pageVisits.length > 0 ? (  
        <ul>  
          {trackingData.pageVisits.map((visit, index) => (  
            <li key={index}>  
              页面ID: {visit.pageId}, 停留时间: {visit.visitDuration}秒, 上报时间: {visit.timestamp}  
            </li>  
          ))}  
        </ul>  
      ) : (  
        <p>没有页面访问记录。</p>  
      )}  
    </div>  
  );  
};  

export default Query;