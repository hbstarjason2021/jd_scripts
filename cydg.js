

var $tool = tool();
console.log("🍎闯越顶岗实习签到脚本开始!" + getCurrentDate());
try {
    
    if (typeof $request != "undefined") {
        if ($request.url.indexOf("nfjs.cydgsx.com/m/s/") > -1) {
            var Cookie = $request.headers["Cookie"];
            if (!!Cookie) {
                $tool.setkeyval(Cookie, "cydg");
                $tool.notify("闯越顶岗实习!", "获得Cookie", Cookie);
            }
        }
        $done({});
    }
    else {
        
        var url = 'https://nfjs.cydgsx.com/m/s/Log/SaveWriteLog';
        var headers = {
            //"X-Requested-With":"XMLHttpRequest",
        //"Connection":"keep-alive",
        //"Accept-Encoding":"gzip, deflate, br",
        //"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
        //"Origin":"https://nfjs.cydgsx.com",
        //"User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 14_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
        Cookie:".ASPXAUTH=CC3ECB2C5D9BC09D6D149D610777954AE577B23BB5F92E5B815D104B18ECB4663CA4150D3424E45A07ACBF4AD23B4A30B2A6B02DE3D64F3E5D18028F1332615A82A23883F519BD08E959872DD32134E37FEA7DEB4AAD1A977C757CBE5816E7EF0DF31F92D91D2A8CA48482DC5E76256B78B7B1D67BCE472DF24B8362669A72368A8D02779A7866FB10A7F598FBD78187; ASP.NET_SessionId=yb20vjyuiecb0g5r2te4aviu; LoginTimeCooikeName=6d1d198c82719b54ee5a77621c7f7d6e; LoginUser_Id=891885322AFDC20D&amp;logintype=2&amp;RoleOId=106&amp;UserName=1828021&amp;Name=%e9%bb%84%e5%a4%a7%e6%99%ba&amp;unGuid=01f0fa64873748b3a207c956b98272c5; giveCard_3275=%7b%22id%22%3a0%2c%22isnew%22%3a0%2c%22title%22%3a%22%22%7d; jxnApp=0; loginUserName=1828021",
        
        //"Referer":"https://nfjs.cydgsx.com/m/s/Log/wLog",
        //"Accept-Language":"zh-cn",
        //"Accept":"*/*",
        //"Content-Length":"266"
        };
        var body = 'InternStateId=1&interContent=&logImg=&posAddress=%E4%B8%AD%E5%9B%BD%E5%B9%BF%E4%B8%9C%E7%9C%81%E5%B9%BF%E5%B7%9E%E5%B8%82%E5%A4%A9%E6%B2%B3%E5%8C%BA%E5%87%8C%E5%A1%98%E6%96%B0%E6%9D%91%E5%A4%A7%E8%A1%97&posLong=113.385556&posLati=23.172220&locationType=1&ArticleId=0';

        var myRequest = {
            url: url,
            headers: headers,
            body: body
        };
        //console.log(JSON.stringify(myRequest));

        $tool.post(myRequest, function (e, r, d) {
            console.log(e);
            //console.log(r);
            console.log(d);
            if (d.indexOf("请重新登录") >-1 ) {
                $tool.notify("闯越顶岗实习!", "签到失败!", "请重新获取Cookie!");
            }
            else {
                try {
                    var obj = JSON.parse(d);
                   
                    if (obj.state == 1) {
                        $tool.notify("闯越顶岗实习!", "签到成功!", "");
                    }
                    else {
                        $tool.notify("闯越顶岗实习!", "重复签到!", "");
                    }
                } catch (e) {
                    $tool.notify("闯越顶岗实习签到错误!", "请查看日志", e);
                }
                
            }
        })
        
    }

} catch (e) {
    console.log("🍎" + e);
    $tool.notify("闯越顶岗实习签到错误!", "请查看日志", e);
}
console.log("🍎闯越顶岗实习签到脚本结束!");


function tool() { var a = typeof $httpClient != "undefined"; var b = typeof $task != "undefined"; var c = { notify: function (i, f, h, g) { var e = {}; if (b) { if (!!g) { if (typeof g == "string") { e["open-url"] = g } if (!!g.url) { e["open-url"] = g.url } if (!!g.img) { e["media-url"] = g.img } $notify(i, f, h, e) } else { $notify(i, f, h) } } if (a) { if (!!g) { if (typeof g == "string") { e["openUrl"] = g } if (!!g.url) { e["openUrl"] = g.url } if (!!g.img) { e["mediaUrl"] = g.img } $notification.post(i, f, h, e) } else { $notification.post(i, f, h) } } }, get: function (e, f) { if (b) { if (typeof e == "string") { e = { url: e } } e["method"] = "GET"; $task.fetch(e).then(function (g) { f(null, d(g), g.body) }, function (g) { f(g.error, null, null) }) } if (a) { $httpClient.get(e, function (i, h, g) { f(i, d(h), g) }) } }, post: function (e, f) { if (b) { if (typeof e == "string") { e = { url: e } } e["method"] = "POST"; $task.fetch(e).then(function (g) { f(null, d(g), g.body) }, function (g) { f(g.error, null, null) }) } if (a) { $httpClient.post(e, function (i, h, g) { f(i, d(h), g) }) } }, unicode: function (e) { return unescape(e.replace(/\\u/gi, "%u")) }, decodeurl: function (e) { return decodeURIComponent(e) }, json2str: function (e) { return JSON.stringify(e) }, str2json: function (e) { return JSON.parse(e) }, setkeyval: function (f, e) { if (b) { $prefs.setValueForKey(f, e) } if (a) { $persistentStore.write(f, e) } }, getkeyval: function (e) { if (b) { return $prefs.valueForKey(e) } if (a) { return $persistentStore.read(e) } } }; function d(e) { if (e) { if (e.status) { e["statusCode"] = e.status } else { if (e.statusCode) { e["status"] = e.statusCode } } } return e } return c }; function getCurrentDate() { var myDate = new Date(); var year = myDate.getFullYear(); var month = myDate.getMonth() + 1; var day = myDate.getDate(); var days = myDate.getDay(); switch (days) { case 1: days = '星期一'; break; case 2: days = '星期二'; break; case 3: days = '星期三'; break; case 4: days = '星期四'; break; case 5: days = '星期五'; break; case 6: days = '星期六'; break; case 0: days = '星期日'; break } var str = year + "年" + month + "月" + day + "日  " + days; return str }


