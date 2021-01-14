var $tool = tool();

try {

    var headers = {
        
    };

    var url = "https://aweme.snssdk.com:443/luckycat/aweme/v1/task/done/read?version_code=13.3.0&js_sdk_version=1.77.0.2&tma_jssdk_version=1.77.0.2&app_name=douyin_lite&app_version=13.3.0&vid=91472701-189F-4218-894C-E4A8F85C6184&device_id=70204063048&channel=App%20Store&mcc_mnc=46011&aid=2329&screen_width=1242&openudid=5a491b60b0a36c99d3b9cc3e855c8c1a77af5c45&cdid=0581E381-6EA7-4DFA-A5FD-15433B015272&os_api=18&ac=WIFI&os_version=14.2&client_niu_ready=1&device_platform=iphone&build_number=133006&iid=3993082529846014&device_type=iPhone10,2&idfa=595A68F9-B6A5-41A6-8E65-33B300BF1F35";//.replace("aweme.snssdk.com:443", "aweme-hl.snssdk.com").replace("read?", "post_invite_code?_request_from=web&");
    url = "https://aweme-hl.snssdk.com/luckycat/aweme/v1/task/done/post_invite_code?_request_from=web&" + url.split('?')[1];
    console.log(url);
    
    var myRequest = {
        url: url,
        headers: headers,
        body: '{\n  "in_sp_time" : 0,\n  "invite_code" : "8254851731"\n}'
    };

    $tool.post(myRequest, function (e, r, d) {
        console.log("✳️" + d);
        $done();
    })

} catch (e) {
    console.log("❌错误:" + e);
    $done();
}

function tool() { var isLoon = typeof $httpClient != "undefined"; var isQuanX = typeof $task != "undefined"; var obj = { notify: function (title, subtitle, message, option) { var option_obj = {}; if (isQuanX) { if (!!option) { if (typeof option == "string") { option_obj["open-url"] = option } if (!!option.url) { option_obj["open-url"] = option.url } if (!!option.img) { option_obj["media-url"] = option.img } $notify(title, subtitle, message, option_obj) } else { $notify(title, subtitle, message) } } if (isLoon) { if (!!option) { if (typeof option == "string") { option_obj["openUrl"] = option } if (!!option.url) { option_obj["openUrl"] = option.url } if (!!option.img) { option_obj["mediaUrl"] = option.img } $notification.post(title, subtitle, message, option_obj) } else { $notification.post(title, subtitle, message) } } }, get: function (options, callback) { if (isQuanX) { if (typeof options == "string") { options = { url: options } } options["method"] = "GET"; $task.fetch(options).then(function (response) { callback(null, adapterStatus(response), response.body) }, function (reason) { callback(reason.error, null, null) }) } if (isLoon) { $httpClient.get(options, function (error, response, body) { callback(error, adapterStatus(response), body) }) } }, post: function (options, callback) { if (isQuanX) { if (typeof options == "string") { options = { url: options } } options["method"] = "POST"; $task.fetch(options).then(function (response) { callback(null, adapterStatus(response), response.body) }, function (reason) { callback(reason.error, null, null) }) } if (isLoon) { $httpClient.post(options, function (error, response, body) { callback(error, adapterStatus(response), body) }) } }, unicode: function (str) { return unescape(str.replace(/\\u/gi, "%u")) }, decodeurl: function (str) { return decodeURIComponent(str) }, json2str: function (obj) { return JSON.stringify(obj) }, str2json: function (str) { return JSON.parse(str) }, setkeyval: function (value, key) { if (isQuanX) { $prefs.setValueForKey(value, key) } if (isLoon) { $persistentStore.write(value, key) } }, getkeyval: function (key) { if (isQuanX) { return $prefs.valueForKey(key) } if (isLoon) { return $persistentStore.read(key) } } }; function adapterStatus(response) { if (response) { if (response.status) { response["statusCode"] = response.status } else { if (response.statusCode) { response["status"] = response.statusCode } } } return response } return obj };

