fetch("https://onlyfans.com/api2/v2/payouts/transactions?startDate=2022-11-08%2000%3A00%3A00&marker=1670525999", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9",
    "app-token": "33d57ade8c02dbc5a333db99ff9ae26a",
    "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Microsoft Edge\";v=\"108\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "sign": "6146:4a0f56ad9e4d38c0c65ac4edcfd5d2b236c9bce7:7fb:639227d4",
    "time": "1670608705037",
    "user-id": "277995472",
    "x-bc": "2aa8b90720500425de2b480e377fca83c0330e9d"
  },
  "referrer": "https://onlyfans.com/my/statistics/statements/earnings",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
}).then((res) => { return res.json(); }).then((res) => { console.log(res)})