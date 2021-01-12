
//多组账号设置,一组账号两个cookie
//几组账号就设置签到脚本几遍循环,一遍循环执行两个账号

var cklist = [
    ['ck1',
         'ck2'],
    ['ck3',
        'ck4'],
    ['ck5',
        'ck6']
];

//惊喜农场token
var tokenlist = [
    ['tk1',
         'tk2'],
    ['tk3',
        'tk4'],
    ['tk5',
        'tk6']
];

var $tool = tool();
var isfirst = false;
for (var i = 0; i < cklist.length; i++) {
    if (cklist[i][0] == $tool.getkeyval('CookieJD')) {
        isfirst = true;
        if (i == cklist.length - 1) {
            $tool.setkeyval(cklist[0][0], 'CookieJD');
            $tool.setkeyval(cklist[0][1], 'CookieJD2');

            $tool.setkeyval(tokenlist[0][0], 'jxnc_token1');
            $tool.setkeyval(tokenlist[0][1], 'jxnc_token2');
        }
        else {
            $tool.setkeyval(cklist[i + 1][0], 'CookieJD');
            $tool.setkeyval(cklist[i + 1][1], 'CookieJD2');

            $tool.setkeyval(tokenlist[i + 1][0], 'jxnc_token1');
            $tool.setkeyval(tokenlist[i + 1][1], 'jxnc_token2');
        }
        break;
    }
}
if (!isfirst) {
    $tool.setkeyval(cklist[0][0], 'CookieJD');
    $tool.setkeyval(cklist[0][1], 'CookieJD2');

    $tool.setkeyval(tokenlist[0][0], 'jxnc_token1');
    $tool.setkeyval(tokenlist[0][1], 'jxnc_token2');
}
console.log("🍎CK1:" + $tool.getkeyval('CookieJD'));
console.log("🍎CK2:" + $tool.getkeyval('CookieJD2'));

console.log("🍎TK1:" + $tool.getkeyval('jxnc_token1'));
console.log("🍎TK2:" + $tool.getkeyval('jxnc_token2'));
$done();

function tool() { var isLoon = typeof $httpClient != "undefined"; var isQuanX = typeof $task != "undefined"; var obj = { notify: function (title, subtitle, message, option) { var option_obj = {}; if (isQuanX) { if (!!option) { if (typeof option == "string") { option_obj["open-url"] = option } if (!!option.url) { option_obj["open-url"] = option.url } if (!!option.img) { option_obj["media-url"] = option.img } $notify(title, subtitle, message, option_obj) } else { $notify(title, subtitle, message) } } if (isLoon) { if (!!option) { if (typeof option == "string") { option_obj["openUrl"] = option } if (!!option.url) { option_obj["openUrl"] = option.url } if (!!option.img) { option_obj["mediaUrl"] = option.img } $notification.post(title, subtitle, message, option_obj) } else { $notification.post(title, subtitle, message) } } }, get: function (options, callback) { if (isQuanX) { if (typeof options == "string") { options = { url: options } } options["method"] = "GET"; $task.fetch(options).then(function (response) { callback(null, adapterStatus(response), response.body) }, function (reason) { callback(reason.error, null, null) }) } if (isLoon) { $httpClient.get(options, function (error, response, body) { callback(error, adapterStatus(response), body) }) } }, post: function (options, callback) { if (isQuanX) { if (typeof options == "string") { options = { url: options } } options["method"] = "POST"; $task.fetch(options).then(function (response) { callback(null, adapterStatus(response), response.body) }, function (reason) { callback(reason.error, null, null) }) } if (isLoon) { $httpClient.post(options, function (error, response, body) { callback(error, adapterStatus(response), body) }) } }, unicode: function (str) { return unescape(str.replace(/\\u/gi, "%u")) }, decodeurl: function (str) { return decodeURIComponent(str) }, json2str: function (obj) { return JSON.stringify(obj) }, str2json: function (str) { return JSON.parse(str) }, setkeyval: function (value, key) { if (isQuanX) { $prefs.setValueForKey(value, key) } if (isLoon) { $persistentStore.write(value, key) } }, getkeyval: function (key) { if (isQuanX) { return $prefs.valueForKey(key) } if (isLoon) { return $persistentStore.read(key) } } }; function adapterStatus(response) { if (response) { if (response.status) { response["statusCode"] = response.status } else { if (response.statusCode) { response["status"] = response.statusCode } } } return response } return obj };