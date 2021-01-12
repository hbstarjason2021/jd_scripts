var $tool = tool();

try {
    if (typeof $request != "undefined") {
        console.log("🍎抖音极速获取headers脚本开始!");
        var headers = $request.headers;
        var headlist = $tool.getkeyval("dyheadlist");
        $tool.setkeyval($request.url, "dyurl");
        if (!!headers) {
            if (!!headlist) {
                var list = JSON.parse(headlist);
                list.push(headers);
            }
            else {
                var list = [];
                list.push(headers);
            }
            $tool.notify("获取headers成功", "个数:" + list.length, "");
            $tool.setkeyval(JSON.stringify(list), "dyheadlist");
            console.log("✳️" + JSON.stringify(list));
        }
        $done();
    }
    else {
        console.log("🍎抖音极速刷视频脚本开始!");
        var headlist = $tool.getkeyval("dyheadlist");
        var thishead = $tool.getkeyval("thishead");
        if (!!headlist) {
            var list = JSON.parse(headlist);
            if (!!thishead) {
                for (var i = 0; i < list.length; i++) {
                    if (JSON.stringify(list[i]) == thishead) {
                        console.log("☢️第" + (i + 1) + "个headers!");
                        if (list.length - 1 == i) {
                            $tool.setkeyval(JSON.stringify(list[0]), "thishead");
                        }
                        else {
                            $tool.setkeyval(JSON.stringify(list[i + 1]), "thishead");
                        }
                        break;
                    }
                }
            }
            else {
                $tool.setkeyval(JSON.stringify(list[0]), "thishead");
            }
            var headers = JSON.parse($tool.getkeyval("thishead"));
            headers['X-Khronos'] = Math.round(new Date() / 1000);
            headers['tt-request-time'] = Math.round(new Date());
            var myRequest = {
                url: $tool.getkeyval("dyurl"),
                headers: JSON.parse($tool.getkeyval("thishead")),
                body: '{\n  "in_sp_time" : 0,\n  "task_key" : "read"\n}'
            };

            $tool.post(myRequest, function (e, r, d) {
                console.log("✳️" + d);
                $done();
            })
        }
        else {
            $tool.notify("请先刷视频获取headers", "多多益善", "");
            $done();
        }
    }
} catch (e) {
    console.log("❌错误:" + e);
    $done();
}

function tool() { var isLoon = typeof $httpClient != "undefined"; var isQuanX = typeof $task != "undefined"; var obj = { notify: function (title, subtitle, message, option) { var option_obj = {}; if (isQuanX) { if (!!option) { if (typeof option == "string") { option_obj["open-url"] = option } if (!!option.url) { option_obj["open-url"] = option.url } if (!!option.img) { option_obj["media-url"] = option.img } $notify(title, subtitle, message, option_obj) } else { $notify(title, subtitle, message) } } if (isLoon) { if (!!option) { if (typeof option == "string") { option_obj["openUrl"] = option } if (!!option.url) { option_obj["openUrl"] = option.url } if (!!option.img) { option_obj["mediaUrl"] = option.img } $notification.post(title, subtitle, message, option_obj) } else { $notification.post(title, subtitle, message) } } }, get: function (options, callback) { if (isQuanX) { if (typeof options == "string") { options = { url: options } } options["method"] = "GET"; $task.fetch(options).then(function (response) { callback(null, adapterStatus(response), response.body) }, function (reason) { callback(reason.error, null, null) }) } if (isLoon) { $httpClient.get(options, function (error, response, body) { callback(error, adapterStatus(response), body) }) } }, post: function (options, callback) { if (isQuanX) { if (typeof options == "string") { options = { url: options } } options["method"] = "POST"; $task.fetch(options).then(function (response) { callback(null, adapterStatus(response), response.body) }, function (reason) { callback(reason.error, null, null) }) } if (isLoon) { $httpClient.post(options, function (error, response, body) { callback(error, adapterStatus(response), body) }) } }, unicode: function (str) { return unescape(str.replace(/\\u/gi, "%u")) }, decodeurl: function (str) { return decodeURIComponent(str) }, json2str: function (obj) { return JSON.stringify(obj) }, str2json: function (str) { return JSON.parse(str) }, setkeyval: function (value, key) { if (isQuanX) { $prefs.setValueForKey(value, key) } if (isLoon) { $persistentStore.write(value, key) } }, getkeyval: function (key) { if (isQuanX) { return $prefs.valueForKey(key) } if (isLoon) { return $persistentStore.read(key) } } }; function adapterStatus(response) { if (response) { if (response.status) { response["statusCode"] = response.status } else { if (response.statusCode) { response["status"] = response.statusCode } } } return response } return obj };

