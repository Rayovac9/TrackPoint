// storage.js  
const STORAGE_KEY = 'pageTrackingData';  

export const clearAllStorage = () => {  
  localStorage.clear();  
};  

export const getTrackingData = () => {  
  const data = localStorage.getItem(STORAGE_KEY);  
  // 如果没有数据，则初始化为包含空数组的对象  
  if (!data) {  
    const initialData = { buttonClicks: [], pageVisits: [] };  
    saveTrackingData(initialData); // 将初始数据保存到 localStorage  
    return initialData;  
  }  
  return JSON.parse(data);  
};  

export const saveTrackingData = (data) => {  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));  
  console.log('保存跟踪数据:', data); // 添加日志  
};  

export const deleteTrackingData = (eventId) => {  
  const data = getTrackingData();  
  data.buttonClicks = data.buttonClicks.filter(click => click.buttonId !== eventId);  
  data.pageVisits = data.pageVisits.filter(visit => visit.pageId !== eventId);  
  saveTrackingData(data);  
};   

export const addButtonClick = (buttonId, uid) => {  
  const data = getTrackingData();  
  const newClick = {  
    buttonId,  
    timestamp: new Date().toISOString(),  
    browserVersion: navigator.userAgent,  
    operatingSystem: getOS(),  
    uid,  
  };  
  // 确保 buttonClicks 是一个数组  
  if (!data.buttonClicks) {  
    data.buttonClicks = [];  
  }  
  data.buttonClicks.push(newClick);  
  saveTrackingData(data);  
};  

export const addPageVisit = (pageId, duration, uid) => {  
  console.log(`收集页面访问数据: ${pageId}, 时长: ${duration}, 用户ID: ${uid}`); // 添加日志  
  const data = getTrackingData();  
  const newVisit = {  
    pageId,  
    visitDuration: duration,  
    timestamp: new Date().toISOString(),  
    browserVersion: navigator.userAgent,  
    operatingSystem: getOS(),  
    uid,  
  };  
  // 确保 pageVisits 是一个数组  
  if (!data.pageVisits) {  
    data.pageVisits = [];  
  }  
  data.pageVisits.push(newVisit);  
  saveTrackingData(data);  
};

// 获取操作系统信息  
const getOS = () => {  
  const userAgent = navigator.userAgent;  
  let os = 'Unknown OS';  
  if (userAgent.indexOf('Win') !== -1) os = 'Windows';  
  else if (userAgent.indexOf('Mac') !== -1) os = 'MacOS';  
  else if (userAgent.indexOf('X11') !== -1 || userAgent.indexOf('Linux') !== -1) os = 'Linux';  
  return os;  
};