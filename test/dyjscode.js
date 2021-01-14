var $tool = tool();

try {

    var headers = {
        "x-tt-trace-id": "00-fe7c68fa0a10587cfd48154eca8b0919-fe7c68fa0a10587c-01",
        "Connection": "keep-alive",
        "Accept-Encoding": "gzip, deflate",
        "X-SS-Cookie": "d_ticket=ef6d49c3b621b630e3ad1131499f62bd38347; n_mh=u12Xp3SShAFoQ_1Q2Fs7pDZgocvIX4XTj1r2WIfzyoQ; odin_tt=6b4b42775df03cdd6308e87fa1fd88a936ba005cd4d085f786894a10d865944969bee8679c7d35dbb3efa69ded38ccbc; sessionid=d9b1ce6d1babd99949c8e388da6b7b2b; sessionid_ss=d9b1ce6d1babd99949c8e388da6b7b2b; sid_guard=d9b1ce6d1babd99949c8e388da6b7b2b%7C1610587293%7C5184000%7CMon%2C+15-Mar-2021+01%3A21%3A33+GMT; sid_tt=d9b1ce6d1babd99949c8e388da6b7b2b; uid_tt=6b42965ef60842525419c1394848f38e; uid_tt_ss=6b42965ef60842525419c1394848f38e; install_id=3993082529846014; passport_csrf_token=f634fb7d22ca50a2df37db2dd4682995; passport_csrf_token_default=f634fb7d22ca50a2df37db2dd4682995; ttreq=1$85919650b308958f3d047bb72aee87218074b46b",
        "sdk-version": "2",
        "Content-Type": "application\/json; encoding=utf-8",
        "x-Tt-Token": "00d9b1ce6d1babd99949c8e388da6b7b2b060f3502901a9a2ad9d45c05f36de71615d61c3835a74d05ddea5a273c794a33ac4ab2f54d96d424a58e0655955fca7ee67b76ec74bf67f1997206043d0ec217a0a-1.0.0",
        "X-SS-STUB": "FB9613E49BC1669D908E1516EBF9F7B5",
        "X-Khronos": "1610587334",
        "User-Agent": "AwemeLite 13.3.0 rv:133006 (iPhone; iOS 14.2; zh_CN) Cronet",
        "tt-request-time": "1610587334531",
        "Cookie": "install_id=3993082529846014; ttreq=1$85919650b308958f3d047bb72aee87218074b46b; passport_csrf_token=f634fb7d22ca50a2df37db2dd4682995; passport_csrf_token_default=f634fb7d22ca50a2df37db2dd4682995; odin_tt=6b4b42775df03cdd6308e87fa1fd88a936ba005cd4d085f786894a10d865944969bee8679c7d35dbb3efa69ded38ccbc; n_mh=u12Xp3SShAFoQ_1Q2Fs7pDZgocvIX4XTj1r2WIfzyoQ; d_ticket=ef6d49c3b621b630e3ad1131499f62bd38347; sid_guard=d9b1ce6d1babd99949c8e388da6b7b2b%7C1610587293%7C5184000%7CMon%2C+15-Mar-2021+01%3A21%3A33+GMT; uid_tt=6b42965ef60842525419c1394848f38e; uid_tt_ss=6b42965ef60842525419c1394848f38e; sid_tt=d9b1ce6d1babd99949c8e388da6b7b2b; sessionid=d9b1ce6d1babd99949c8e388da6b7b2b; sessionid_ss=d9b1ce6d1babd99949c8e388da6b7b2b",
        "Host": "aweme.snssdk.com",
        "passport-sdk-version": "5.12.1",
        "X-Tyhon": "2wUGGmKsNRox0CQhHJFwNwuKDhQWjHYyHYko3yc=",
        "X-Gorgon": "840460b11000605dca471682bd695485f708214799147b831304",
        "Accept": "application\/json",
        "Content-Length": "45"
    };

    var url = "https://aweme-hl.snssdk.com/luckycat/aweme/v1/task/done/post_invite_code?_request_from=web&version_code=13.3.0&js_sdk_version=1.77.0.2&tma_jssdk_version=1.77.0.2&app_name=douyin_lite&app_version=13.3.0&vid=91472701-189F-4218-894C-E4A8F85C6184&device_id=70204063048&channel=App%20Store&mcc_mnc=46011&aid=2329&screen_width=1242&openudid=5a491b60b0a36c99d3b9cc3e855c8c1a77af5c45&cdid=0581E381-6EA7-4DFA-A5FD-15433B015272&os_api=18&ac=WIFI&os_version=14.2&client_niu_ready=1&device_platform=iphone&build_number=133006&iid=3993082529846014&device_type=iPhone10,2&idfa=595A68F9-B6A5-41A6-8E65-33B300BF1F35";//.replace("aweme.snssdk.com:443", "aweme-hl.snssdk.com").replace("read?", "post_invite_code?_request_from=web&");
    console.log(url);
    
    var myRequest = {
        url: url,
        headers: headers,
        body: '{\n  "in_sp_time" : 0,\n  "invite" : "8254851731"\n}'
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

