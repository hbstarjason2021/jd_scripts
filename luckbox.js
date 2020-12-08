console.log("🍎脚本开始!");
var url = $request.url;
var headers = $request.headers;
try {

    $notification.post('获取到红包列表!', '开始执行自动抢红包!', "")
    headers["response-formart"] = "json";
    var params = {
        url: url,
        headers: headers
    };
    var respdata = "";
    $httpClient.get(params, function (error, response, data) {
        console.log("🍎" + data);
        respdata = data;
    });

    var room_id = url.split("room_id=")[1];

    function forPost() {
        setTimeout(function () {

            console.log("🍎循环请求执行");

            var list = JSON.parse(respdata).data;
            if (list.length > 0) {

                var params2 = {
                    url: "https://webcast3-normal-c-hl.amemv.com/webcast/luckybox/rush/?version_code=12.1.0&pass-region=0&js_sdk_version=1.73.0.65&tma_jssdk_version=1.73.0.65&pass-route=0&app_name=aweme&app_version=12.1.0&vid=89C92D9E-E9ED-4CE3-BC06-E8A569C4F7C9&webcast_sdk_version=1620&device_id=58019842405&channel=App%20Store&mcc_mnc=46002&language=zh-Hans-CN&aid=1128&effect_sdk_version=7.2.0&screen_width=414&openudid=d2406de73fcb79bfafa6d4f66d88b2f7572ccc4f&cdid=75D47001-A2E3-43F2-A19D-A129079906BE&os_api=18&webcast_language=zh&ac=WIFI&os_version=13.6&webcast_locale=zh-Hans_CN&build_number=121013&device_platform=iphone&device_type=iPhone%20XS%20Max&is_vcd=1&iid=2497687840631863&idfa=B481C950-8580-480C-A4D9-D033DA3A4585",
                    headers: headers,
                    body: "box_id=" + list[0].box_id + "&box_type=1&delay_time=" + list[0].delay_time + "&room_id=" + room_id + "&send_time=" + list[0].send_time
                };

                console.log("🍎请求体****************************************");
                console.log("🍎请求体:" + JSON.stringify(params2.body));
                console.log("🍎请求体****************************************");

                $httpClient.post(params2, function (error, response, data) {
                    console.log("🍎" + data);
                    var obj = JSON.parse(data);
                    if (!!obj.data.gift_name && obj.data.gift_name != undefined && obj.data.gift_name != "undefined") {
                        $notification.post('获取礼物!', obj.data.gift_name, data);
                        console.log("🍎获取礼物:" + obj.data.gift_name);
                    }
                    else {
                        forPost();
                    }
                });
            }

        }, 100);
    }

    forPost();


} catch (e) {
    console.log("🍎try错误:" + e);
}

$done({});
console.log("🍎执行完成!!!!");