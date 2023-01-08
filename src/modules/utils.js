import { Store } from './variables';

export const getStorageVal = (key, empty) => {
  return new Promise((resolve) => {
    Store.get([key], (e) => {
        console.log(e);
        console.log(key);
      if (e[key]) {
        resolve(e[key]);
      } else {
        resolve(empty);
      }
    });
  });
};

export const setStore = (key, val) => {
    return new Promise((resolve) => {
        var obj = {};
        obj[key] = val;
        console.log(obj);
        Store.set(obj, () => {
            console.log('saved');
            resolve(true);
        });
    })
}
