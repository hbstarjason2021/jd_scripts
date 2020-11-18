

var $tool = tool();
console.log("🍎闯越顶岗实习签到脚本开始!");
try {
    
    if (typeof $request != "undefined") {
        if ($request.url.indexOf("youhui.95516.com/newsign/public/app/index.html") > -1) {
            var Cookie = $request.headers["Cookie"];
            if (!!Cookie) {
                $tool.setkeyval(Cookie, "cydg");
                $tool.notify("闯越顶岗实习!", "获得Cookie", Cookie);
            }
        }
    }
    else {
        var url = 'http://119.23.212.32/m/s/Log/SaveWriteLog';
        var method = 'POST';
        var headers = {
            'Connection': 'keep-alive',
            'Content-Length': '292',
            'Accept': '*/*',
            'Origin': 'https://hl.cydgsx.com',
            'X-Requested-With': 'XMLHttpRequest',
            'Sec-Fetch-Dest': 'empty',
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148/sa-sdk-ios',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-Mode': 'cors',
            'Referer': 'https://hl.cydgsx.com/m/s/Log/wLog',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
            'Cookie': 'ASP.NET_SessionId=asdasd; jxnApp=0; giveCard_10269=asdasdasd; loginUserName=dasdasdasd; LoginTimeCooikeName=8ee100zxcdb2c3afd71eax4501ec36b1;'
        };
        var body = 'InternStateId=4&interContent=%E5%AE%9E%E4%B9%A0%E7%AD%BE%E5%88%B0&logImg=&posAddress=%E5%8C%97%E4%BA%AC%E5%B8%82%E6%9C%9D%E9%98%B3%E5%8C%BA&posLong=114.21&posLati=30.254&locationType=1&ArticleId=0';

        var myRequest = {
            url: url,
            method: method,
            headers: headers,
            body: body
        };
        console.log(JSON.stringify(myRequest));

        $tool.post(myRequest, function (e, r, d) {
            console.log(e);
            console.log(r);
            console.log(d);
            if (d.indexOf("请重新登录") >-1 ) {
                $tool.notify("闯越顶岗实习!", "签到失败!", "请重新获取Cookie!");
            }
            else if (true) {
                $tool.notify("闯越顶岗实习!", "签到成功!", "");
            }
        })
        
    }

} catch (e) {
    console.log(e);
    $tool.notify("🍎闯越顶岗实习签到错误!", e, e);
}
console.log("🍎闯越顶岗实习签到脚本结束!");


function tool() { var a = typeof $httpClient != "undefined"; var b = typeof $task != "undefined"; var c = { notify: function (i, f, h, g) { var e = {}; if (b) { if (!!g) { if (typeof g == "string") { e["open-url"] = g } if (!!g.url) { e["open-url"] = g.url } if (!!g.img) { e["media-url"] = g.img } $notify(i, f, h, e) } else { $notify(i, f, h) } } if (a) { if (!!g) { if (typeof g == "string") { e["openUrl"] = g } if (!!g.url) { e["openUrl"] = g.url } if (!!g.img) { e["mediaUrl"] = g.img } $notification.post(i, f, h, e) } else { $notification.post(i, f, h) } } }, get: function (e, f) { if (b) { if (typeof e == "string") { e = { url: e } } e["method"] = "GET"; $task.fetch(e).then(function (g) { f(null, d(g), g.body) }, function (g) { f(g.error, null, null) }) } if (a) { $httpClient.get(e, function (i, h, g) { f(i, d(h), g) }) } }, post: function (e, f) { if (b) { if (typeof e == "string") { e = { url: e } } e["method"] = "POST"; $task.fetch(e).then(function (g) { f(null, d(g), g.body) }, function (g) { f(g.error, null, null) }) } if (a) { $httpClient.post(e, function (i, h, g) { f(i, d(h), g) }) } }, unicode: function (e) { return unescape(e.replace(/\\u/gi, "%u")) }, decodeurl: function (e) { return decodeURIComponent(e) }, json2str: function (e) { return JSON.stringify(e) }, str2json: function (e) { return JSON.parse(e) }, setkeyval: function (f, e) { if (b) { $prefs.setValueForKey(f, e) } if (a) { $persistentStore.write(f, e) } }, getkeyval: function (e) { if (b) { return $prefs.valueForKey(e) } if (a) { return $persistentStore.read(e) } } }; function d(e) { if (e) { if (e.status) { e["statusCode"] = e.status } else { if (e.statusCode) { e["status"] = e.statusCode } } } return e } return c };

$done({});
