localStorage.__proto__.setItemJSON = (key, item) => {
  return localStorage.setItem(key, JSON.stringify(item));
};

localStorage.__proto__.getItemJSON = key => {
  return JSON.parse(localStorage.getItem(key));
};
