
/**
 * @fileoverview Template to compose HTTP reqeuest.
 * 
 */

const url = `https://script.baertt.com/count2/callback?si=f3e2383a6ee4941316bcef3eae4a96fg&referer=https%253A%252F%252Ffocus.youth.cn%252Farticle%252Fs%253Fsignature%253DZLAxJmwrdW82D634Z3PMkOH8gK2duvdXyMP7N9B05XEbOlQGnj%2526uid%253D34274504%2526phone_code%253D72e7d86f624d54d5b2b5b206a65c2e89%2526scid%253D38133403%2526time%253D1620181903%2526app_version%253D2.0.2%2526sign%253D9875effb55d028afe5ac6a07db998e2e&_=1620181924888&jsonpcallback=jsonp6`;
const method = `GET`;
const headers = {
'Accept-Encoding' : `gzip, deflate, br`,
'Accept' : `*/*`,
'Connection' : `keep-alive`,
'Referer' : `https://focus.youth.cn/`,
'Host' : `script.baertt.com`,
'User-Agent' : `Mozilla/5.0 (iPhone; CPU iPhone OS 14_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.5(0x18000527) NetType/4G Language/zh_CN`,
'Accept-Language' : `zh-cn`
};
const body = ``;

const myRequest = {
    url: url,
    method: method,
    headers: headers,
    body: body
};

$task.fetch(myRequest).then(response => {
    console.log(response.statusCode + "\n\n" + response.body);
    $done();
}, reason => {
    console.log(reason.error);
    $done();
});
