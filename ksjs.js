
var $tool = tool();

try {
    if (typeof $request != "undefined") {
        console.log("🍎快手极速获取url脚本开始!");
        var url = $request.url;
        var urllist = $tool.getkeyval("ksurllist");
        if (!!url) {
            if (!!urllist) {
                var list = JSON.parse(urllist);
                list.push(url);
            }
            else {
                var list = [];
                list.push(url);
            }
            $tool.notify("获取url成功", "个数:" + list.length, "");
            $tool.setkeyval(JSON.stringify(list), "ksurllist");
            console.log("✳️" + JSON.stringify(list));
        }
        $done();
    }
    else {
        console.log("🍎快手极速刷视频脚本开始!");
        var urllist = $tool.getkeyval("ksurllist");
        var thisurl = $tool.getkeyval("ksthisurl");
        //console.log(urllist);
        //console.log(thisurl);
        if (!!urllist) {
            var list = JSON.parse(urllist);
            if (!!thisurl) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i] == thisurl) {
                        console.log("☢️第" + (i + 1) + "个url!");
                        if (list.length - 1 == i) {
                            $tool.setkeyval(list[0], "ksthisurl");
                        }
                        else {
                            $tool.setkeyval(list[i + 1], "ksthisurl");
                        }
                        break;
                    }
                }
            }
            else {
                $tool.setkeyval(list[0], "ksthisurl");
                console.log("☢️第0个url!");
            }

            var headers = {
                'Accept-Encoding': 'gzip, deflate',
                'X-REQUESTID': '161021324052898354',
                'Connection': 'keep-alive',
                'Accept': 'application/json',
                'Host': 'js2.a.yximgs.com',
                'User-Agent': 'kwai-ios',
                'Accept-Language': 'zh-Hans-CN;q=1, en-CN;q=0.9'
            };
            var myRequest = {
                url: $tool.getkeyval("ksthisurl"),
                headers: headers
            };
            console.log($tool.getkeyval("ksthisurl"), replace('"', ''));

            $tool.get(myRequest, function (e, r, d) {
                console.log("✳️" + d);
                $done();
            })
        }
        else {
            $tool.notify("请先刷视频获取url", "多多益善", "");
            $done();
        }
    }
} catch (e) {
    console.log("❌错误:" + e);
    $done();
}

function tool() { var isLoon = typeof $httpClient != "undefined"; var isQuanX = typeof $task != "undefined"; var obj = { notify: function (title, subtitle, message, option) { var option_obj = {}; if (isQuanX) { if (!!option) { if (typeof option == "string") { option_obj["open-url"] = option } if (!!option.url) { option_obj["open-url"] = option.url } if (!!option.img) { option_obj["media-url"] = option.img } $notify(title, subtitle, message, option_obj) } else { $notify(title, subtitle, message) } } if (isLoon) { if (!!option) { if (typeof option == "string") { option_obj["openUrl"] = option } if (!!option.url) { option_obj["openUrl"] = option.url } if (!!option.img) { option_obj["mediaUrl"] = option.img } $notification.post(title, subtitle, message, option_obj) } else { $notification.post(title, subtitle, message) } } }, get: function (options, callback) { if (isQuanX) { if (typeof options == "string") { options = { url: options } } options["method"] = "GET"; $task.fetch(options).then(function (response) { callback(null, adapterStatus(response), response.body) }, function (reason) { callback(reason.error, null, null) }) } if (isLoon) { $httpClient.get(options, function (error, response, body) { callback(error, adapterStatus(response), body) }) } }, post: function (options, callback) { if (isQuanX) { if (typeof options == "string") { options = { url: options } } options["method"] = "POST"; $task.fetch(options).then(function (response) { callback(null, adapterStatus(response), response.body) }, function (reason) { callback(reason.error, null, null) }) } if (isLoon) { $httpClient.post(options, function (error, response, body) { callback(error, adapterStatus(response), body) }) } }, unicode: function (str) { return unescape(str.replace(/\\u/gi, "%u")) }, decodeurl: function (str) { return decodeURIComponent(str) }, json2str: function (obj) { return JSON.stringify(obj) }, str2json: function (str) { return JSON.parse(str) }, setkeyval: function (value, key) { if (isQuanX) { $prefs.setValueForKey(value, key) } if (isLoon) { $persistentStore.write(value, key) } }, getkeyval: function (key) { if (isQuanX) { return $prefs.valueForKey(key) } if (isLoon) { return $persistentStore.read(key) } } }; function adapterStatus(response) { if (response) { if (response.status) { response["statusCode"] = response.status } else { if (response.statusCode) { response["status"] = response.statusCode } } } return response } return obj };
