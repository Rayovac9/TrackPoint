// ExpandableList.js  
import React, { useState } from 'react';  
import Add from './Add.js'; 
import Change from './Change.js';

function ExpandableList() {  
  //const [isOpen, setIsOpen] = useState(false); // 控制列表的展开和收起状态  
  const [items, setItems] = useState([ // 确保初始化为数组  
    { id: 1, name: '事件 1', parameters: ['A', 'B'] },  
    { id: 2, name: '事件 12', parameters: ['A'] },  
    { id: 3, name: '事件 123', parameters: ['A', 'C'] },  
  ]);  

  // const toggleList = () => {  
  //   setIsOpen(!isOpen); // 切换列表的状态  
  // }; 
  
  const [eventToEdit, setEventToEdit] = useState(null); // 新增状态，存储待编辑的事件  

  const handleButtonClick = (itemId, action) => {  
    if (action === '删除') {  
      const confirmDelete = window.confirm('确定要删除这个事件吗？');  
      if (confirmDelete) {  
        setItems(items.filter(item => item.id !== itemId)); // 删除事件  
      }  
    } 
    else if (action === '修改') {  
      const itemToEdit = items.find(item => item.id === itemId);  
      setEventToEdit(itemToEdit); // 设置为待编辑的事件  
    }   
    else {  
      console.log(`按钮操作: ${action}，项目 ID: ${itemId}`);  
    }  
  };  

  const handleAddEvent = (newEvent) => {  
    setItems(prevItems => [...prevItems, newEvent]);  
  }; 

  const handleUpdateEvent = (updatedEvent) => {  
    setItems(prevItems =>   
      prevItems.map(item => item.id === updatedEvent.id ? updatedEvent : item)  
    );  
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
            <div style={{ display: 'flex', gap: '0' }}>  
              <button onClick={() => handleButtonClick(item.id, '查看')}>查看</button>  
              <button onClick={() => handleButtonClick(item.id, '修改')}>修改</button>  
              <button onClick={() => handleButtonClick(item.id, '删除')}>删除</button>  
            </div>  
          </div>  
        ))}  
      </div>  

      {eventToEdit && (  
        <Change   
          eventToEdit={eventToEdit}   
          onUpdateEvent={handleUpdateEvent}   
          onClose={() => setEventToEdit(null)} // 关闭编辑框  
        />  
      )}  
    </div>  
  );  
}  

export default ExpandableList;