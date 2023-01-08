import { Server, Store } from '../../../modules/variables';
import { getStorageVal } from '../../../modules/utils';
import sha1 from './sha1';

export const getSign = async () => {
  var now = new Date();
  var timestamp = now.getTime();
  var urlinfo = window.location;
  var path = urlinfo.pathname + urlinfo.search;
  var userid = 0;
  var signinfo = await getStorageVal('signInfo', []);
  console.log(signinfo);
  if (signinfo.length === 0) {
    console.log('no sign info found');
    return null;
  }
  var tempsign = [signinfo.key, timestamp, path, userid];
  var sign = tempsign.join('\n');
  var sign_sha1 = sha1.hex(sign);
  var final_sign =
    signinfo.start +
    ':' +
    sign_sha1 +
    ':' +
    getOnlyFansHash(sign_sha1, signinfo.charcodes, signinfo.extracode) +
    ':' +
    signinfo.end;
  console.log(final_sign);
  return final_sign;
};

export const getOnlyFansHash = (hash, charcodes, extracode) => {
  let results = 0;
  charcodes.forEach((charcode, index, array) => {
    results += hash.charCodeAt(charcode);
  });
  return Math.abs(results + extracode).toString(16);
};

export const getCookies = () => {
  return new Promise((resolve) => {
    Server.sendMessage({action: 'getCookies'}, (e) => {
        console.log('server response', e);
      resolve(e);
    });
  });
};


export const createMarker = (date) => {
  return new Date(date).getTime() / 1000 || 0;
}
