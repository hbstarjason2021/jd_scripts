
var $tool = tool();

try {
    if (typeof $request != "undefined") {
        console.log("\n🍎快手极速获取url脚本开始!\n");

        var url = $request;
        var urllist = $tool.getkeyval("ksurllist");
        //console.log("\n🍎🍎🍎🍎🍎" + JSON.stringify($request));
        if (!!url && !!url.headers['User-Agent'] && (url.headers['User-Agent'].indexOf("kwai") > -1 || url.headers['User-Agent'].indexOf("快手") > -1)) {
            if (!!urllist) {
                var list = JSON.parse(urllist);
                list.push(url);
            }
            else {
                var list = [];
                list.push(url);
            }
            if (typeof url.headers['Cookie'] != "undefined" && !!url.headers['Cookie'] && url.url.indexOf("clientEvent/sync") > -1) {
                $tool.setkeyval(JSON.stringify(url.headers['Cookie']), "kscookie");
                $tool.notify("获取Cookie成功", "", "");
            }
            $tool.notify("获取url成功", "个数:" + list.length, "");
            $tool.setkeyval(JSON.stringify(list), "ksurllist");
            //console.log("✳️" + JSON.stringify(list));
        }
        $done();
    }
    else {
        console.log("\n🍎快手极速刷视频脚本开始!\n");
        var urllist = $tool.getkeyval("ksurllist");
        var thisurl = $tool.getkeyval("ksthisurl");

        if (!!urllist) {
            var list = JSON.parse(urllist);
            var index = 0;
            if (!!thisurl) {
                for (var i = 0; i < list.length; i++) {
                    if (i == thisurl) {
                        if (list.length - 1 == i) {
                            $tool.setkeyval("0", "ksthisurl");
                        }
                        else {
                            $tool.setkeyval((i + 1).toString(), "ksthisurl");
                            index = i + 1;
                        }
                        break;
                    }
                }
            }
            else {
                $tool.setkeyval("0", "ksthisurl");
            }
            console.log("\n☢️第" + (index + 1) + "个url!\n");

            //var request = $tool.getkeyval("ksthisurl");
            //request = JSON.parse(request);
            //var myRequest = {
            //    url: request.url,
            //    headers: request.headers
            //};
            var myRequest = list[index];
            //request.headers['X-REQUESTID'] = Math.round(new Date()) + "25926";

            $tool.get(myRequest, function (e, r, d) {
                //console.log("✳️" + JSON.stringify(r.headers) + r.statusCode);
                if (r.statusCode == "200") {
                    console.log("\n♥️请求成功!\n");

                    try {
                        myRequest.url = "https://nebula.kuaishou.com/rest/n/nebula/activity/earn/overview?addressBookAccessStatus=false";
                        myRequest.headers['Host'] = "nebula.kuaishou.com";
                        myRequest.headers['Cookie'] = $tool.getkeyval("kscookie");

                        $tool.get(myRequest, function (e2, r2, d2) {
                            d2 = JSON.parse(d2);
                            console.log("\n🎁总现金:" + d2.data.totalCash + "\n");
                            console.log("\n🎁总金币:" + d2.data.totalCoin + "\n");
                            //console.log("♥️总金币:" + d2);
                            $done();
                        })
                    } catch (e) {
                        console.log("\n❌错误:" + e + "\n");
                        $done();
                    }
                    //$done();
                }
                else {
                    console.log("\n🚫" + "请求失败!\n");
                    $done();
                }

            })
        }
        else {
            $tool.notify("请先刷视频获取url", "多多益善", "");
            $done();
        }
    }
} catch (e) {
    console.log("\n❌错误:" + e + "\n");
    $done();
}

function tool() { var isLoon = typeof $httpClient != "undefined"; var isQuanX = typeof $task != "undefined"; var obj = { notify: function (title, subtitle, message, option) { var option_obj = {}; if (isQuanX) { if (!!option) { if (typeof option == "string") { option_obj["open-url"] = option } if (!!option.url) { option_obj["open-url"] = option.url } if (!!option.img) { option_obj["media-url"] = option.img } $notify(title, subtitle, message, option_obj) } else { $notify(title, subtitle, message) } } if (isLoon) { if (!!option) { if (typeof option == "string") { option_obj["openUrl"] = option } if (!!option.url) { option_obj["openUrl"] = option.url } if (!!option.img) { option_obj["mediaUrl"] = option.img } $notification.post(title, subtitle, message, option_obj) } else { $notification.post(title, subtitle, message) } } }, get: function (options, callback) { if (isQuanX) { if (typeof options == "string") { options = { url: options } } options["method"] = "GET"; $task.fetch(options).then(function (response) { callback(null, adapterStatus(response), response.body) }, function (reason) { callback(reason.error, null, null) }) } if (isLoon) { $httpClient.get(options, function (error, response, body) { callback(error, adapterStatus(response), body) }) } }, post: function (options, callback) { if (isQuanX) { if (typeof options == "string") { options = { url: options } } options["method"] = "POST"; $task.fetch(options).then(function (response) { callback(null, adapterStatus(response), response.body) }, function (reason) { callback(reason.error, null, null) }) } if (isLoon) { $httpClient.post(options, function (error, response, body) { callback(error, adapterStatus(response), body) }) } }, unicode: function (str) { return unescape(str.replace(/\\u/gi, "%u")) }, decodeurl: function (str) { return decodeURIComponent(str) }, json2str: function (obj) { return JSON.stringify(obj) }, str2json: function (str) { return JSON.parse(str) }, setkeyval: function (value, key) { if (isQuanX) { $prefs.setValueForKey(value, key) } if (isLoon) { $persistentStore.write(value, key) } }, getkeyval: function (key) { if (isQuanX) { return $prefs.valueForKey(key) } if (isLoon) { return $persistentStore.read(key) } }, wait: function (time) { return new Promise(function (resolve) { setTimeout(function () { console.log("🕒等待" + time + "毫秒"); resolve(true) }, time) }) } }; function adapterStatus(response) { if (response) { if (response.status) { response["statusCode"] = response.status } else { if (response.statusCode) { response["status"] = response.statusCode } } } return response } return obj };