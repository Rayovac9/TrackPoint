import React, { useState } from 'react';  
import Add from './Add.js';   
import Change from './Change.js';  
import Query from './Query.js'; // 引入查询组件  
import { getTrackingData, deleteTrackingData, saveTrackingData } from './Storage'; // 引入 storage 函数  

function ExpandableList() {  
  const [items, setItems] = useState([  
    { id: 1, name: '事件 1', actionType: '点击', buttonOrPage: '按钮1', parameters: ['浏览器版本', '操作系统'] },  
    { id: 2, name: '事件 12', actionType: '浏览', buttonOrPage: 'Page3', parameters: ['浏览器版本'] },  
    { id: 3, name: '事件 123', actionType: '点击', buttonOrPage: '按钮2', parameters: ['浏览器版本', 'uid'] }, 
  ]);  

  const [eventToEdit, setEventToEdit] = useState(null);  
  const [showQuery, setShowQuery] = useState(false); // 控制查询组件的显示  
  const [selectedEvent, setSelectedEvent] = useState(null); // 用于存储当前查看的事件  
  
  const handleButtonClick = (itemId, action) => {  
    if (action === '删除') {  
      const confirmDelete = window.confirm('确定要删除这个事件吗？');  
      if (confirmDelete) {  
        setItems(prevItems =>   
          Array.isArray(prevItems) ? prevItems.filter(item => item.id !== itemId) : [] // 确保 items 是数组  
        );  
        deleteTrackingData(itemId); // 从 localStorage 删除相应的事件信息  
      }  
    }   
    else if (action === '修改') {  
      const itemToEdit = items.find(item => item.id === itemId);  
      setEventToEdit(itemToEdit); // 设置为待编辑的事件  
    }  
    else if (action === '查看') {  
      setSelectedEvent(items.find(item => item.id === itemId)); // 设置当前查看的事件  
      setShowQuery(true); // 显示查询组件  
    }  
  };  

  const handleAddEvent = (newEvent) => {  
    setItems(prevItems => Array.isArray(prevItems) ? [...prevItems, newEvent] : [newEvent]);  
    saveTrackingData(newEvent); // 添加事件到 localStorage  
  };   

  const handleUpdateEvent = (updatedEvent) => {  
    setItems(prevItems =>   
      Array.isArray(prevItems) ? prevItems.map(item => item.id === updatedEvent.id ? updatedEvent : item) : []  
    );  
    saveTrackingData(updatedEvent); // 更新 localStorage  
    setEventToEdit(null); // 更新后关闭编辑框  
  };  

  return (  
    <div>  
      <div style={{ marginTop: '10px', border: '1px solid #ccc', padding: '10px' }}>  
        <h3>全部事件</h3>   
        <Add onAddEvent={handleAddEvent}/>   

        {Array.isArray(items) && items.map(item => (  
          <div key={item.id} style={{ margin: '5px 0', display: 'flex', alignItems: 'center' }}>  
            <span style={{ minWidth: '100px', marginRight: '10px' }}>{item.name}</span>  
            <span style={{ minWidth: '150px', marginRight: '10px' }}>  
              参数：{Array.isArray(item.parameters) ? item.parameters.join(', ') : '无参数'}  
            </span>   
            <div style={{ marginLeft: '200px', display: 'flex', alignItems: 'center' }}> {/* 控制按钮右移和对齐 */}  
              <button style={{ marginRight: '10px' }} onClick={() => handleButtonClick(item.id, '查看')}>查看</button>  
              <button style={{ marginRight: '10px' }} onClick={() => handleButtonClick(item.id, '修改')}>修改</button>  
              <button onClick={() => handleButtonClick(item.id, '删除')}>删除</button>  
            </div>  
          </div>  
        ))}  
      </div>  

      {eventToEdit && (  
        <Change   
          eventToEdit={eventToEdit}   
          onUpdateEvent={handleUpdateEvent}   
          onClose={() => setEventToEdit(null)}  
        />  
      )}  

      {showQuery && <Query event={selectedEvent} onClose={() => setShowQuery(false)} />} {/* 传递选中的事件到 Query 组件 */}  
    </div>  
  );  
}  

export default ExpandableList;