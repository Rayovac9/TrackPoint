import React, { useEffect } from 'react';  
import { addPageVisit } from './Storage';   

function Page1() {  
    const uid = 'user123'; // 这里可以替换为实际的用户 ID  
    let startTime;  
  
    useEffect(() => {  
      startTime = Date.now(); // 记录开始时间  
  
      return () => {  
        // 组件卸载时计算停留时间  
        const duration = Math.floor((Date.now() - startTime) / 1000); // 计算停留时间（秒）
        console.log('保存跟踪数据:', duration); // 添加日志   
        addPageVisit('Page1', duration, uid); // 添加页面访问记录  
      };  
    }, [uid]); // 依赖于 uid  
    
    return (  
      <div style={{ textAlign: 'center', padding: '50px' }}>  
        <h2>Button 1 Page</h2>  
        <p>这是按键1打开的新页面。</p>  
      </div>  
    );  
}  

export default Page1;