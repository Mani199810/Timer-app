export const saveToStorage = (state) => {
    localStorage.setItem('timers', JSON.stringify(state));
  };
  
  export const loadFromStorage = () => {
    const data = localStorage.getItem('timers');
    return data ? JSON.parse(data) : { timersByCategory: {}, history: [] };
  };
  