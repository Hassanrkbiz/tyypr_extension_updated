import { getStorageVal } from '../../../modules/utils';
import { Server, Store } from '../../../modules/variables';
import axios from 'axios';

/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
 * in FIPS 180-1
 * Version 2.2 Copyright Paul Johnston 2000 - 2009.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad = ''; /* base-64 pad character. "=" for strict RFC compliance   */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_sha1(s) {
  return rstr2hex(rstr_sha1(str2rstr_utf8(s)));
}
function b64_sha1(s) {
  return rstr2b64(rstr_sha1(str2rstr_utf8(s)));
}
function any_sha1(s, e) {
  return rstr2any(rstr_sha1(str2rstr_utf8(s)), e);
}
function hex_hmac_sha1(k, d) {
  return rstr2hex(rstr_hmac_sha1(str2rstr_utf8(k), str2rstr_utf8(d)));
}
function b64_hmac_sha1(k, d) {
  return rstr2b64(rstr_hmac_sha1(str2rstr_utf8(k), str2rstr_utf8(d)));
}
function any_hmac_sha1(k, d, e) {
  return rstr2any(rstr_hmac_sha1(str2rstr_utf8(k), str2rstr_utf8(d)), e);
}

/*
 * Perform a simple self-test to see if the VM is working
 */
function sha1_vm_test() {
  return (
    hex_sha1('abc').toLowerCase() == 'a9993e364706816aba3e25717850c26c9cd0d89d'
  );
}

/*
 * Calculate the SHA1 of a raw string
 */
function rstr_sha1(s) {
  return binb2rstr(binb_sha1(rstr2binb(s), s.length * 8));
}

/*
 * Calculate the HMAC-SHA1 of a key and some data (raw strings)
 */
function rstr_hmac_sha1(key, data) {
  var bkey = rstr2binb(key);
  if (bkey.length > 16) bkey = binb_sha1(bkey, key.length * 8);

  var ipad = Array(16),
    opad = Array(16);
  for (var i = 0; i < 16; i++) {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5c5c5c5c;
  }

  var hash = binb_sha1(ipad.concat(rstr2binb(data)), 512 + data.length * 8);
  return binb2rstr(binb_sha1(opad.concat(hash), 512 + 160));
}

/*
 * Convert a raw string to a hex string
 */
function rstr2hex(input) {
  try {
    hexcase;
  } catch (e) {
    hexcase = 0;
  }
  var hex_tab = hexcase ? '0123456789ABCDEF' : '0123456789abcdef';
  var output = '';
  var x;
  for (var i = 0; i < input.length; i++) {
    x = input.charCodeAt(i);
    output += hex_tab.charAt((x >>> 4) & 0x0f) + hex_tab.charAt(x & 0x0f);
  }
  return output;
}

/*
 * Convert a raw string to a base-64 string
 */
function rstr2b64(input) {
  try {
    b64pad;
  } catch (e) {
    b64pad = '';
  }
  var tab = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  var output = '';
  var len = input.length;
  for (var i = 0; i < len; i += 3) {
    var triplet =
      (input.charCodeAt(i) << 16) |
      (i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0) |
      (i + 2 < len ? input.charCodeAt(i + 2) : 0);
    for (var j = 0; j < 4; j++) {
      if (i * 8 + j * 6 > input.length * 8) output += b64pad;
      else output += tab.charAt((triplet >>> (6 * (3 - j))) & 0x3f);
    }
  }
  return output;
}

/*
 * Convert a raw string to an arbitrary string encoding
 */
function rstr2any(input, encoding) {
  var divisor = encoding.length;
  var remainders = Array();
  var i, q, x, quotient;

  /* Convert to an array of 16-bit big-endian values, forming the dividend */
  var dividend = Array(Math.ceil(input.length / 2));
  for (i = 0; i < dividend.length; i++) {
    dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
  }

  /*
   * Repeatedly perform a long division. The binary array forms the dividend,
   * the length of the encoding is the divisor. Once computed, the quotient
   * forms the dividend for the next step. We stop when the dividend is zero.
   * All remainders are stored for later use.
   */
  while (dividend.length > 0) {
    quotient = Array();
    x = 0;
    for (i = 0; i < dividend.length; i++) {
      x = (x << 16) + dividend[i];
      q = Math.floor(x / divisor);
      x -= q * divisor;
      if (quotient.length > 0 || q > 0) quotient[quotient.length] = q;
    }
    remainders[remainders.length] = x;
    dividend = quotient;
  }

  /* Convert the remainders to the output string */
  var output = '';
  for (i = remainders.length - 1; i >= 0; i--)
    output += encoding.charAt(remainders[i]);

  /* Append leading zero equivalents */
  var full_length = Math.ceil(
    (input.length * 8) / (Math.log(encoding.length) / Math.log(2))
  );
  for (i = output.length; i < full_length; i++) output = encoding[0] + output;

  return output;
}

/*
 * Encode a string as utf-8.
 * For efficiency, this assumes the input is valid utf-16.
 */
function str2rstr_utf8(input) {
  var output = '';
  var i = -1;
  var x, y;

  while (++i < input.length) {
    /* Decode utf-16 surrogate pairs */
    x = input.charCodeAt(i);
    y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
    if (0xd800 <= x && x <= 0xdbff && 0xdc00 <= y && y <= 0xdfff) {
      x = 0x10000 + ((x & 0x03ff) << 10) + (y & 0x03ff);
      i++;
    }

    /* Encode output as utf-8 */
    if (x <= 0x7f) output += String.fromCharCode(x);
    else if (x <= 0x7ff)
      output += String.fromCharCode(
        0xc0 | ((x >>> 6) & 0x1f),
        0x80 | (x & 0x3f)
      );
    else if (x <= 0xffff)
      output += String.fromCharCode(
        0xe0 | ((x >>> 12) & 0x0f),
        0x80 | ((x >>> 6) & 0x3f),
        0x80 | (x & 0x3f)
      );
    else if (x <= 0x1fffff)
      output += String.fromCharCode(
        0xf0 | ((x >>> 18) & 0x07),
        0x80 | ((x >>> 12) & 0x3f),
        0x80 | ((x >>> 6) & 0x3f),
        0x80 | (x & 0x3f)
      );
  }
  return output;
}

/*
 * Encode a string as utf-16
 */
function str2rstr_utf16le(input) {
  var output = '';
  for (var i = 0; i < input.length; i++)
    output += String.fromCharCode(
      input.charCodeAt(i) & 0xff,
      (input.charCodeAt(i) >>> 8) & 0xff
    );
  return output;
}

function str2rstr_utf16be(input) {
  var output = '';
  for (var i = 0; i < input.length; i++)
    output += String.fromCharCode(
      (input.charCodeAt(i) >>> 8) & 0xff,
      input.charCodeAt(i) & 0xff
    );
  return output;
}

/*
 * Convert a raw string to an array of big-endian words
 * Characters >255 have their high-byte silently ignored.
 */
function rstr2binb(input) {
  var output = Array(input.length >> 2);
  for (var i = 0; i < output.length; i++) output[i] = 0;
  for (var i = 0; i < input.length * 8; i += 8)
    output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << (24 - (i % 32));
  return output;
}

/*
 * Convert an array of big-endian words to a string
 */
function binb2rstr(input) {
  var output = '';
  for (var i = 0; i < input.length * 32; i += 8)
    output += String.fromCharCode((input[i >> 5] >>> (24 - (i % 32))) & 0xff);
  return output;
}

/*
 * Calculate the SHA-1 of an array of big-endian words, and a bit length
 */
function binb_sha1(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << (24 - (len % 32));
  x[(((len + 64) >> 9) << 4) + 15] = len;

  var w = Array(80);
  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;
  var e = -1009589776;

  for (var i = 0; i < x.length; i += 16) {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    var olde = e;

    for (var j = 0; j < 80; j++) {
      if (j < 16) w[j] = x[i + j];
      else w[j] = bit_rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
      var t = safe_add(
        safe_add(bit_rol(a, 5), sha1_ft(j, b, c, d)),
        safe_add(safe_add(e, w[j]), sha1_kt(j))
      );
      e = d;
      d = c;
      c = bit_rol(b, 30);
      b = a;
      a = t;
    }

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
    e = safe_add(e, olde);
  }
  return Array(a, b, c, d, e);
}

/*
 * Perform the appropriate triplet combination function for the current
 * iteration
 */
function sha1_ft(t, b, c, d) {
  if (t < 20) return (b & c) | (~b & d);
  if (t < 40) return b ^ c ^ d;
  if (t < 60) return (b & c) | (b & d) | (c & d);
  return b ^ c ^ d;
}

/*
 * Determine the appropriate additive constant for the current iteration
 */
function sha1_kt(t) {
  return t < 20
    ? 1518500249
    : t < 40
    ? 1859775393
    : t < 60
    ? -1894007588
    : -899497514;
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y) {
  var lsw = (x & 0xffff) + (y & 0xffff);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xffff);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt) {
  return (num << cnt) | (num >>> (32 - cnt));
}

export const getUserSales = async () => {
  var timeStamp = new Date().getTime();
  var appToken = await getStorageVal('appToken', null);
  var xbc = await getStorageVal('xbc', null);
  var signKey = await getStorageVal('signKey', null);
  var authID = await getStorageVal('auth_id', '');

  if (authID == '') {
    console.log('auth id not found');
    return;
  }

  fetch(
    'https://onlyfans.com/api2/v2/payouts/transactions?startDate=2022-11-08%2000%3A00%3A00&marker=1670525999',
    {
      headers: {
        accept: 'application/json, text/plain, */*',
        'app-token': appToken,
        sign: signKey,
        time: timeStamp,
        'user-id': authID,
        'x-bc': xbc,
      },
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
    });
};

export const getSignInfo = async () => {
  var sign = await getStorageVal('sign', null);
  var appToken = await getStorageVal('appToken', null);
  var xbc = await getStorageVal('xbc', null);
  var appid = Server.id;

  if (sign === null || appToken === null || xbc === null) {
    console.log('complete data is not available');
    return null;
  }

  var requesturl =
    'https://api.onlyfansmanager.tools/onlyfans/signinfo/?timezone=' +
    encodeURIComponent(Intl.DateTimeFormat().resolvedOptions().timeZone) +
    '&appid=' +
    appid +
    '&signstart=' +
    sign[0] +
    '&signend=' +
    sign[3] +
    '&apptoken=' +
    appToken +
    '&xbc=' +
    xbc;

  return fetch(requesturl)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
      if (res?.validsign) {
        var info = res?.signinfo;
        // info data looks like this
        // charcodes: (32)[
        //   ('12',
        //   '28',
        //   '16',
        //   '39',
        //   '25',
        //   '0',
        //   '18',
        //   '21',
        //   '36',
        //   '26',
        //   '27',
        //   '2',
        //   '7',
        //   '13',
        //   '7',
        //   '20',
        //   '10',
        //   '25',
        //   '20',
        //   '20',
        //   '35',
        //   '15',
        //   '35',
        //   '26',
        //   '8',
        //   '19',
        //   '12',
        //   '10',
        //   '17',
        //   '28',
        //   '12',
        //   '9')
        // ];
        // end: '639227d4';
        // extracode: -352;
        // key: 'hsHDdnYtOMK1k7nycUWmn526HsubpNAY';
        // start: '6146';
        return info;
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

const createSignKey = () => {};

const fetchCheckSum = () => {
  return fetch(
    'https://raw.githubusercontent.com/DATAHOARDERS/dynamic-rules/main/onlyfans.json'
  )
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

export const getResults = async (endpoint) => {
  return new Promise(async (resolve, reject) => {
    var appToken = await getStorageVal('appToken', null);
    var xbc = await getStorageVal('xbc', null);

    if (appToken === null || xbc === null) {
      console.log('complete data is not available');
      resolve(null);
    }
    var timestamp = new Date().getTime();

    var url = endpoint;

    var dynamicRules = await fetchCheckSum();

    if (!dynamicRules) {
      console.log('dynamic rules not found');
      resolve(null);
    }

    var secretParamString = [
      dynamicRules.static_param,
      timestamp.toString(),
      url,
      0,
    ].join('\n');

    var sha1Sign = hex_sha1(secretParamString);

    var splittedFormat = dynamicRules.format.split(':');

    var checksum = getChecksum(dynamicRules, sha1Sign);
    var prefix = splittedFormat.at(0);
    var suffix = splittedFormat.at(-1);

    var hash = [prefix, sha1Sign, checksum, suffix].join(':');

    console.log(hash);

    console.log(timestamp);

    var config = {};

    var fullUrl = `https://onlyfans.com${endpoint}`;

    var additionalHeaders = [
      { name: 'app-token', value: appToken },
      { name: 'x-bc', value: xbc },
    ];

    config.headers = {};
    additionalHeaders.forEach(
      (header) => (config.headers[header.name] = header.value)
    );

    config.headers.time = timestamp;

    config.headers.sign = hash;

    var results = await axios.get(fullUrl, config);

    resolve(results?.data);
  });
};

function getChecksum(dynamicRules, sha1Sign) {
  let sha1SignAscii = Array.from(sha1Sign, (char) => char.charCodeAt(0));
  let checksum =
    dynamicRules.checksum_indexes
      .map((number) => sha1SignAscii[number])
      .reduce((a, b) => a + b) + dynamicRules.checksum_constant;
  return Math.abs(checksum).toString(16);
}
