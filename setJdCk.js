
//多组账号设置,一组账号两个cookie
//几组账号就设置签到脚本几遍循环,一遍循环执行两个账号

var cklist = [
    [{
        'name': '',
        'cookie': '',
        'jxtoken': '',
        'fruitcode': ''
    },
         {
             'name': '',
             'cookie': '',
             'jxtoken': '',
             'fruitcode': ''
         }],
    [{
        'name': '',
        'cookie': '',
        'jxtoken': '',
        'fruitcode': ''
    },
        {
            'name': '',
            'cookie': '',
            'jxtoken': '',
            'fruitcode': ''
        }],
    [{
        'name': '',
        'cookie': '',
        'jxtoken': '',
        'fruitcode': ''
    },
        {
            'name': '',
            'cookie': '',
            'jxtoken': '',
            'fruitcode': ''
        }]
];

var $tool = tool();
var isfirst = false, index = 0;
for (var i = 0; i < cklist.length; i++) {
    if (cklist[i][0] == $tool.getkeyval('CookieJD')) {
        isfirst = true;
        if (i == cklist.length - 1) {
            $tool.setkeyval(cklist[0][0].cookie, 'CookieJD');
            $tool.setkeyval(cklist[0][1].cookie, 'CookieJD2');

            $tool.setkeyval(getToken4Url(cklist[0][0].jxtoken), 'jxnc_token1');
            $tool.setkeyval(getToken4Url(cklist[0][1].jxtoken), 'jxnc_token2');
        }
        else {
            index = i + 1;
            $tool.setkeyval(cklist[i + 1][0].cookie, 'CookieJD');
            $tool.setkeyval(cklist[i + 1][1].cookie, 'CookieJD2');

            $tool.setkeyval(getToken4Url(cklist[i + 1][0].jxtoken), 'jxnc_token1');
            $tool.setkeyval(getToken4Url(cklist[i + 1][1].jxtoken), 'jxnc_token2');
        }
        break;
    }
}
if (!isfirst) {
    $tool.setkeyval(cklist[0][0].cookie, 'CookieJD');
    $tool.setkeyval(cklist[0][1].cookie, 'CookieJD2');

    $tool.setkeyval(getToken4Url(cklist[0][0].jxtoken), 'jxnc_token1');
    $tool.setkeyval(getToken4Url(cklist[0][1].jxtoken), 'jxnc_token2');
}

console.log('🍎Name1:' + cklist[index][0].name);
console.log('🍎Name2:' + cklist[index][1].name);

console.log('🍎CK1:' + cklist[index][0].cookie);
console.log('🍎CK2:' + cklist[index][1].cookie);

console.log('🍎TK1:' + cklist[index][0].jxtoken);
console.log('🍎TK2:' + cklist[index][1].jxtoken);

console.log('🍎fCode1:' + cklist[index][0].fruitcode);
console.log('🍎fCode2:' + cklist[index][1].fruitcode);


$done();

//根据url获取惊喜农场种子token对象
function getToken4Url(url) {
    try {
        if (!!url) {
            var query = url.split('?')[1];
            var params = query.split('&');
            var obj = {};
            for (var i = 0; i < params.length; i++) {
                obj[params[i].split('=')[0]] = params[i].split('=')[1];
            }
            return JSON.stringify({ 'farm_jstoken': obj['farm_jstoken'], phoneid: obj.phoneid, timestamp: obj.timestamp });
        }
        else {
            return '';
        }
    } catch (e) {
        return '';
    }
}

function tool() { var isLoon = typeof $httpClient != "undefined"; var isQuanX = typeof $task != "undefined"; var obj = { notify: function (title, subtitle, message, option) { var option_obj = {}; if (isQuanX) { if (!!option) { if (typeof option == "string") { option_obj["open-url"] = option } if (!!option.url) { option_obj["open-url"] = option.url } if (!!option.img) { option_obj["media-url"] = option.img } $notify(title, subtitle, message, option_obj) } else { $notify(title, subtitle, message) } } if (isLoon) { if (!!option) { if (typeof option == "string") { option_obj["openUrl"] = option } if (!!option.url) { option_obj["openUrl"] = option.url } if (!!option.img) { option_obj["mediaUrl"] = option.img } $notification.post(title, subtitle, message, option_obj) } else { $notification.post(title, subtitle, message) } } }, get: function (options, callback) { if (isQuanX) { if (typeof options == "string") { options = { url: options } } options["method"] = "GET"; $task.fetch(options).then(function (response) { callback(null, adapterStatus(response), response.body) }, function (reason) { callback(reason.error, null, null) }) } if (isLoon) { $httpClient.get(options, function (error, response, body) { callback(error, adapterStatus(response), body) }) } }, post: function (options, callback) { if (isQuanX) { if (typeof options == "string") { options = { url: options } } options["method"] = "POST"; $task.fetch(options).then(function (response) { callback(null, adapterStatus(response), response.body) }, function (reason) { callback(reason.error, null, null) }) } if (isLoon) { $httpClient.post(options, function (error, response, body) { callback(error, adapterStatus(response), body) }) } }, unicode: function (str) { return unescape(str.replace(/\\u/gi, "%u")) }, decodeurl: function (str) { return decodeURIComponent(str) }, json2str: function (obj) { return JSON.stringify(obj) }, str2json: function (str) { return JSON.parse(str) }, setkeyval: function (value, key) { if (isQuanX) { $prefs.setValueForKey(value, key) } if (isLoon) { $persistentStore.write(value, key) } }, getkeyval: function (key) { if (isQuanX) { return $prefs.valueForKey(key) } if (isLoon) { return $persistentStore.read(key) } } }; function adapterStatus(response) { if (response) { if (response.status) { response["statusCode"] = response.status } else { if (response.statusCode) { response["status"] = response.statusCode } } } return response } return obj };