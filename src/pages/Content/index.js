import React from 'react';
import { render } from 'react-dom';

import Newtab from '../Newtab/Newtab';
import './modules/sha1';
import { getStorageVal, setStore } from '../../modules/utils';
import { Server, Store } from '../../modules/variables';
import { getResults } from './modules/request';
import { getSign, getCookies, createMarker } from './modules/utils';

const main = async () => {
  console.log('tyyr is loaded');
  // var signInfo = await getSignInfo();
  // console.log(signInfo);
  // await setStore('signInfo', signInfo);
  // var sign = await getSign();
  // await setStore('signKey', sign);
//   var cookies = await getCookies();
//   console.log('cookies',cookies);
//   await setStore('auth_id', cookies.auth_id);
//   await setStore('sess', cookies.sess);
//   var startDate = await getResults('/api2/v2/users/me/start-date-model');
//   console.log("startDate",startDate);
//   var date = '2022-12-02 00:00:00'
//   var marker = parseInt(new Date().getTime() / 1000);
//   var endpoint = `/api2/v2/earnings/chart?startDate=2022-12-02%2001%3A49%3A30&endDate=2022-12-25%2000%3A01%3A01&withTotal=true&filter[total_amount]=total_amount&filter[subscribes_amount]=subscribes_amount&filter[tips_amount]=tips_amount&filter[post_amount]=post_amount&filter[messages_amount]=messages_amount&filter[ref_amount]=ref_amount&filter[stream_amount]=stream_amount`;
//   var transactions = await getResults(endpoint);
//   console.log("transactions",transactions);
};
// main();




injectSidebar();
function injectSidebar() {
    console.log('main func executed');
    var body = document.body;
    if(body){
        var div = document.createElement('div');
        div.id = 'sidebarTesting';
        div.style.position = 'fixed';
        div.style.zIndex = '9999';
        body.appendChild(div);
        render(<Newtab />, document.querySelector('#sidebarTesting'));
    } else {
        setTimeout(() => {
            main();
        }, 1000);
    }
}




