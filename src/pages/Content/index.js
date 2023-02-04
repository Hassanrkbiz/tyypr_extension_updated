import React from 'react';
import { render } from 'react-dom';

import Newtab from '../Newtab/Newtab';
import './modules/sha1';
import { getStorageVal, setStore } from '../../modules/utils';
import { Server, Store } from '../../modules/variables';
import './modules/arrive.js';
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
    var me = await getResults('/api2/v2/users/me');
    console.log('me', me);
    if (!me?.error) {
        injectSidebar();
    }
};
main();



function injectSidebar() {
    console.log('main func executed');
    var body = document.body;
    if (body) {
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

document.arrive('a[data-name="Chats"] .l-header__menu__item__count', async (e) => {
    var me = await getResults('/api2/v2/users/me');
    console.log('me', me);
    if (!me?.error) {
        injectSidebar();
    }
    checkForPostList();
    console.log('message section arrived');
    Store.set({ msgCount: e?.target?.innerText ?? "0", msgArrivalTime: 0 });
    listen4newMessages();
});

document.arrive('.b-chat__header__title a', (e) => {
    console.log('chat appeared');
    updateReactTime();
})

const updateReactTime = async () => {
    var newMessageArrived = await getStorageVal('msgArrivalTime', 0);
    var currentTime = Date.now();
    if (newMessageArrived == 0) {
        console.log('no reaction time available');
        return;
    }
    var timeDiff = parseInt(currentTime) - parseInt(newMessageArrived);
    console.log('time difference', timeDiff);
    Store.set({ timeDiff: timeDiff });
}


function listen4newMessages() {
    var observables = document.querySelector('a[data-name="Chats"] .l-header__menu__item__count');

    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            console.log(mutation);
            var text = mutation?.target?.wholeText;
            updateState(text.trim());
        });
    });

    var config = { characterData: true, subtree: true };
    observer.observe(observables, config);
}


async function updateState(newCount) {
    console.log('newCount', newCount);
    try {
        var count = await getStorageVal("msgCount", "0");
        Store.set({ msgCount: newCount });
        console.log(parseInt(newCount), parseInt(count))
        if (parseInt(newCount) > parseInt(count)) {
            newMessageIconShow();
            Store.set({ msgArrivalTime: Date.now() });
        } else {
            removeMsgIcon();
        }
    } catch (err) {
        console.log(err);
    }
}

function newMessageIconShow() {
    var msgSection = document.querySelectorAll('a[data-name="Chats"]');
    if (msgSection.length) {
        var msgIcon = chrome.runtime.getURL('New.svg');
        var span = document.createElement('span');
        span.id = 'newMsgTyyprExt';
        span.innerHTML = `<img src="${msgIcon}" />`;
        span.style.marginLeft = '1rem';
        removeMsgIcon();
        msgSection[0].appendChild(span);
        console.log('appended');
    }
}

function removeMsgIcon() {
    var elems = document.querySelectorAll('#newMsgTyyprExt');
    for (let elem of elems) {
        elem.remove();
    }
    return;
}

document.arrive('.b-photos__item', (e) => {
    console.log('photos appeared');
    injectInVault(e);
})


async function injectInVault(e) {
    // var photos = document.querySelectorAll('.b-photos__item');

    var imageURL = e.querySelectorAll('img');
    if (!imageURL.length) {
        console.log('no image url found');
        return;
    }
    imageURL = imageURL[0].src;
    console.log('image url', imageURL);
    var imageFound = false;

    var imgList = await getStorageVal('imgList', []);

    for (var postImg of imgList) {
        var result = compareImage(postImg.thumb, imageURL);
        console.log('result', result);
        if (result) {
            imageFound = true;
        }
    };

    if (!imageFound) {
        console.log('no image matched');
        return;
    }
    var msgIcon = chrome.runtime.getURL('New.svg');
    var span = document.createElement('span');
    span.id = 'newPhotoTyyprExt';
    span.innerHTML = `<img src="${msgIcon}" />`;
    span.style = `    z-index: 9999999999;
    top: 1rem;
    right: 3.5rem;
    position: absolute;`
    e.appendChild(span);
    console.log('appended');
}

function getListID(e) {
    var listID = '';
    if (e?.list) {
        for (var li of e.list) {
            if (li.name == 'Posts') {
                listID = li.id;
            }
        }
    }
    return listID;
}

function compareImage(imageURL, imageURL2) {
    var img1ID = imageURL?.split('/')[6];
    var img2ID = imageURL2?.split('/')[6];
    return img1ID == img2ID;
}

async function checkForPostList() {
    var list = await getResults('/api2/v2/vault/lists?view=list&filled=1&limit=10');
    var postListID = getListID(list);
    if (postListID == '') {
        console.log('no post id found');
        return;
    }
    var postsList = await getResults(`/api2/v2/vault/media?limit=24&offset=0&field=recent&sort=desc&list=${postListID}`);
    if (!postsList?.list) {
        console.log('no post list');
        return;
    }
    Store.set({ imgList: postsList.list })
}


