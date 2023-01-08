import { Store, Server } from "../../modules/variables";


chrome.webRequest.onBeforeSendHeaders.addListener((reqData) => {
    console.log(reqData);
    var reqHeaders = reqData?.requestHeaders;
    if(reqHeaders.length){
        for(let rH of reqHeaders){
            if(rH.name == 'app-token'){
                Store.set({appToken: rH.value});
            } else if (rH.name == 'sign'){
                var sign = rH.value.split(':');
                Store.set({sign: sign});
            } else if (rH.name == 'x-bc'){
                Store.set({xbc: rH.value});
            }
        }
    }
}, { urls: ["https://onlyfans.com/api2/v2/users/me"] },
["requestHeaders"]);

Server.onMessage.addListener((res, sender, sendResponse) => {
    switch(res.action){
        case 'getCookies':
            getAllOnlyFansCookies(function (cookiesinfo) {
                let auth_id = "";
                let sess = "";
                cookiesinfo.forEach((cookieinfo, index, array) => {
                    if (cookieinfo.name !== undefined && cookieinfo.name != "" && cookieinfo.name != null && cookieinfo.value !== undefined && cookieinfo.value != "" && cookieinfo.value != null) {
                        if (cookieinfo.name == "sess") {
                            sess = cookieinfo.value;
                        }
                        if (cookieinfo.name == "auth_id") {
                            auth_id = cookieinfo.value;
                        }
                    }
                });
                sendResponse({auth_id: auth_id, sess: sess});
            });
        break;
        default:
            sendResponse('no action found');
    }
    return true;
})



function getAllOnlyFansCookies(callback) {
    chrome.cookies.getAll({ url: "https://onlyfans.com/" }, function (cookies) {
        if (callback) {
            callback(cookies);
        }
    });
}

