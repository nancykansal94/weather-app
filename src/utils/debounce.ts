const debounce = (func: (...params: any) => void, timeout = 200) => {
  let timer: NodeJS.Timeout;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      // @ts-ignore
      func(...args);
    }, timeout);
  };
};

export default debounce;
