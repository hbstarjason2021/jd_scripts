
try {
    if (typeof $request != "undefined") {
        if ($request.url.indexOf("youhui.95516.com/newsign/public/app/index.html") > -1) {
            var Cookie = $request.headers["Cookie"];
            $prefs.setValueForKey(Cookie, "UniCookie");
            $notify("云闪付签到!", "获得Cookie", Cookie);
        }
    }
    else {
        var url = 'https://youhui.95516.com/newsign/api/daily_sign_in';
        var method = 'POST';
        var headers = {
            'Accept': 'application/json, text/plain, */*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Origin': 'https://youhui.95516.com',
            'Cookie': $prefs.valueForKey("UniCookie"),
            'Connection': 'keep-alive',
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148/sa-sdk-ios  (com.unionpay.chsp) (cordova 4.5.4) (updebug 0) (version 807) (UnionPay/1.0 CloudPay) (clientVersion 137) (language zh_CN)',
            'Referer': 'https://youhui.95516.com/newsign/public/app/index.html',
            'Accept-Language': 'zh-cn'
        };
        var body = '';

        var myRequest = {
            url: url,
            method: method,
            headers: headers,
            body: body
        };

        $task.fetch(myRequest).then(function (response) {
            var obj = JSON.parse(response.body);
            if (!!obj.signedIn) {
                if (obj.signedIn == true) {
                    var days = 0;
                    for (var item in obj.days) {
                        if (obj.days[item] == 1) {
                            days++;
                        }
                    }
                    $notify("云闪付签到成功!", "开始时间:" + obj.startedAt, "已连续签到:" + days + "天!");
                }
            }
            else {
                $notify("云闪付签到失败!", response.body, response.body);
            }
            console.log(response.statusCode + "\n\n" + response.body);
        }, function (reason) {
            $notify("云闪付签到失败!", reason.error, reason.error);
            console.log(reason.error);
        });
    }

} catch (e) {
    console.log(e);
    $notify("云闪付签到错误!", e, e);
}
$done();

