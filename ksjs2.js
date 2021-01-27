
var $tool = tool();

try {

    console.log("\n🍎快手极速刷视频脚本开始!\n");

    var url = "http://apissl.gifshow.com/rest/nebula/feed/hot?c=a&apptype=2&did=00E22B7F-16F2-4B5A-8B20-A640366C2C94&kpn=NEBULA&keyconfig_state=1&deviceBit=0&cold=true&sw=1242&kpf=IPHONE&sys=ios14.1&sh=2688&kcv=1246&extId=0c3a6b0cfe9f3c6dd9635b95c31950cb&browseType=3&net=%E4%B8%AD%E5%9B%BD%E8%81%94%E9%80%9A_5&darkMode=false&ver=9.0&mod=iPhone11%2C6&ud=1693210678&isp=CUCC&cold_launch_time_ms=1611652365325&vague=0&appver=9.0.30.560";
    var headers = {
        "Cookie": "appver=9.0.30.560; c=a; client_key=63b2bdd7; countryCode=cn; did=00E22B7F-16F2-4B5A-8B20-A640366C2C94; egid=DFPBE776E06915E260042BF1A5030782131EE36C54E68EE55F68A47E37C1F1DC; gid=DFPBE776E06915E260042BF1A5030782131EE36C54E68EE55F68A47E37C1F1DC; kpf=IPHONE; kpn=NEBULA; kuaishou.api_st=Cg9rdWFpc2hvdS5hcGkuc3QSsAHo3R4wTXI-IDan_hOWXKSbxIsdu-iEFmubACjHfGlTlUDrppJPWXFF6GWsrsvDnKPBGNieynpp3lDRfZBEN3YLoLflnNaKTHztyVEcE0UI7wzkjzYgzrPu0tYTMrl6bwMojyYmOwbCEaHyRz2Qvi7Gg_7_JZG7j6P-n7TfDuq0daGnpg7OzLLb1i6bIPBIUDIyA01MB15rKmi0T8h0sY5GwM6_K1Gj51mSJuTG8nYxCRoST0L-mU7dTea6BfqLSFmBumSbIiCNJ7baMjaaCl6MxpLltOarQt9662MVs_tLgMqCYgZ5GCgFMAE; kuaishou.h5_st=Cg5rdWFpc2hvdS5oNS5zdBKgAZ0UbRhSoWQG7sQhR0DQA5tRqt5ot_niGXHF6vi8L-DflIFSiP2y0LRH0nLgNEcwg1juNWNhAR_awCpqa3_e5gqDmE3umU5yRddvGhqwYgkc33ghUmZqAQXlylI9HrjUVcHM8e-u99bsWmFJtAWAQA39RKD8cDLN157O-mlU7udYxrqFfkA3mQdT0zaavUK_GkXGJXkPn2Hl79Xuy3ym2pAaEvawlwd7NjDrfWCq1CR0LOvKaSIg4YKL9UgG2r5TZwnmV3jL5HF_cxmA8Vep_IvJIyKiCD8oBTAB; kuaishou.sixin.login_st=ChdrdWFpc2hvdS5zaXhpbi5sb2dpbi5zdBKgAU3UCb9xh79DhxZVXnIsVCSYGyHzyyiVuA5LgeqOQdZ0FCbZnBSvXYrudTbEg1T7dgVUk7jRJQXPffX4S4-2tuvbAxSKW_VSohHqwfg2QKbj09WE8r29b11r-Heo8Bsf9NF1tsVMeQd1_5FulFXC5TZpV0HM77s71c4-daJGocMM865yTTmB4P5wu1K6HG3-WenA2NGLH6AJYt-yxp4FhjwaEqX_RFYqBE1kredwAzTIg-2CUSIgiQetp8jRLcuAu573zJKOa_dGHQYpbAk5iRKfMdZ3rxwoBTAB; language=zh-Hans-CN%3Bq%3D1%2C%2520en-CN%3Bq%3D0.9; lat=0.000000; lon=0.000000; mod=iPhone11%2C6; net=WIFI; sys=iOS_14.1; token=Cg9rdWFpc2hvdS5hcGkuc3QSsAHo3R4wTXI-IDan_hOWXKSbxIsdu-iEFmubACjHfGlTlUDrppJPWXFF6GWsrsvDnKPBGNieynpp3lDRfZBEN3YLoLflnNaKTHztyVEcE0UI7wzkjzYgzrPu0tYTMrl6bwMojyYmOwbCEaHyRz2Qvi7Gg_7_JZG7j6P-n7TfDuq0daGnpg7OzLLb1i6bIPBIUDIyA01MB15rKmi0T8h0sY5GwM6_K1Gj51mSJuTG8nYxCRoST0L-mU7dTea6BfqLSFmBumSbIiCNJ7baMjaaCl6MxpLltOarQt9662MVs_tLgMqCYgZ5GCgFMAE; userId=1693210678; ver=9.0",
        "X-REQUESTID": "161165236540702678",
        "Connection": "close",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json",
        "Host": "apissl.gifshow.com",
        "User-Agent": "kwai-ios",
        "Accept-Language": "zh-Hans-CN;q=1, en-CN;q=0.9",
        "Accept-Encoding": "gzip, deflate"
    };
    var body = '__NS_sig3=b9a8e6eb3c4c87cef5f1f2f3080ad86ce534e58bece0eef8&__NStokensig=8fd7af06b7dcf986a1afc3a9192b2981f8f34ca0a5e64bb7ef22afc6acfbe4fc&autoRefresh=true&client_key=63b2bdd7&coldStart=true&count=20&country_code=cn&cs=false&global_id=DFPBE776E06915E260042BF1A5030782131EE36C54E68EE55F68A47E37C1F1DC&id=1&kuaishou.api_st=Cg9rdWFpc2hvdS5hcGkuc3QSsAHo3R4wTXI-IDan_hOWXKSbxIsdu-iEFmubACjHfGlTlUDrppJPWXFF6GWsrsvDnKPBGNieynpp3lDRfZBEN3YLoLflnNaKTHztyVEcE0UI7wzkjzYgzrPu0tYTMrl6bwMojyYmOwbCEaHyRz2Qvi7Gg_7_JZG7j6P-n7TfDuq0daGnpg7OzLLb1i6bIPBIUDIyA01MB15rKmi0T8h0sY5GwM6_K1Gj51mSJuTG8nYxCRoST0L-mU7dTea6BfqLSFmBumSbIiCNJ7baMjaaCl6MxpLltOarQt9662MVs_tLgMqCYgZ5GCgFMAE&language=zh-Hans-CN%3Bq%3D1%2C%20en-CN%3Bq%3D0.9&needInterestTag=0&newUserRefreshTimes=-1&page=1&power_mode=0&pv=false&realtimePlayStats=&recoReportContext=%7B%22adClientInfo%22%3A%7B%22deviceStatDiskfree%22%3A45395%2C%22unexposedAds%22%3A%22%5B%5D%22%2C%22playedDurationInterval%22%3A%5B%5B0%2C0%2C0%2C0%2C0%2C0%2C0%5D%2C%5B0%2C0%2C0%2C0%2C0%2C0%2C0%5D%2C%5B0%2C0%2C0%2C0%2C0%2C0%2C0%5D%5D%7D%7D&refreshTimes=0&seid=3CDD3D57-9E3D-4DA7-9806-51E689137FBB&sig=8387ac06c3e87de7a9e156c3250a2adc&source=1&type=7';
    var myRequest = {
        url: url,
        headers: headers,
        body: body
    };
    $tool.post(myRequest, function (e, r, d) {
        try {

            //console.log(d);
            //$done();

            var obj = JSON.parse(d);

            for (var i = 0; i < obj.feeds.length; i++) {

                var vurl = obj.feeds[i]['cover_thumbnail_urls'][0].url;
                var vurl2 = obj.feeds[i]['cover_thumbnail_urls'][1].url;
                //console.log("\n"+vurl);

                delete headers.Host;
                var head = {
                    "Accept": "image/*,*/*;q=0.8",
                    "Accept-Encoding": "gzip, deflate",
                    "Accept-Language": "zh-cn",
                    "Connection": "close",
                    "User-Agent": "com_kwai_nebula/9.0.30 (iPhone; iOS 14.1; Scale/3.00)"
                };
                setTimeout(function () {

                    $tool.get({ url: vurl, headers: head }, function (e2, r2, d2) {
                        console.log("\n🍎" + r2.statusCode);
                        //$done();
                    })

                    $tool.get({ url: vurl2, headers: head }, function (e2, r2, d2) {
                        console.log("\n🍎🍎" + r2.statusCode);
                        //$done();
                    })

                }, 1000 * (i + 1));

                setTimeout(function () {
                    $done();
                }, 1000 * obj.feeds.length);

            }


        } catch (e) {
            $done();
        }
    })


} catch (e) {
    console.log("\n❌错误:" + e + "\n");
    $done();
}

function tool() { var isLoon = typeof $httpClient != "undefined"; var isQuanX = typeof $task != "undefined"; var obj = { notify: function (title, subtitle, message, option) { var option_obj = {}; if (isQuanX) { if (!!option) { if (typeof option == "string") { option_obj["open-url"] = option } if (!!option.url) { option_obj["open-url"] = option.url } if (!!option.img) { option_obj["media-url"] = option.img } $notify(title, subtitle, message, option_obj) } else { $notify(title, subtitle, message) } } if (isLoon) { if (!!option) { if (typeof option == "string") { option_obj["openUrl"] = option } if (!!option.url) { option_obj["openUrl"] = option.url } if (!!option.img) { option_obj["mediaUrl"] = option.img } $notification.post(title, subtitle, message, option_obj) } else { $notification.post(title, subtitle, message) } } }, get: function (options, callback) { if (isQuanX) { if (typeof options == "string") { options = { url: options } } options["method"] = "GET"; $task.fetch(options).then(function (response) { callback(null, adapterStatus(response), response.body) }, function (reason) { callback(reason.error, null, null) }) } if (isLoon) { $httpClient.get(options, function (error, response, body) { callback(error, adapterStatus(response), body) }) } }, post: function (options, callback) { if (isQuanX) { if (typeof options == "string") { options = { url: options } } options["method"] = "POST"; $task.fetch(options).then(function (response) { callback(null, adapterStatus(response), response.body) }, function (reason) { callback(reason.error, null, null) }) } if (isLoon) { $httpClient.post(options, function (error, response, body) { callback(error, adapterStatus(response), body) }) } }, unicode: function (str) { return unescape(str.replace(/\\u/gi, "%u")) }, decodeurl: function (str) { return decodeURIComponent(str) }, json2str: function (obj) { return JSON.stringify(obj) }, str2json: function (str) { return JSON.parse(str) }, setkeyval: function (value, key) { if (isQuanX) { $prefs.setValueForKey(value, key) } if (isLoon) { $persistentStore.write(value, key) } }, getkeyval: function (key) { if (isQuanX) { return $prefs.valueForKey(key) } if (isLoon) { return $persistentStore.read(key) } }, wait: function (time) { return new Promise(function (resolve) { setTimeout(function () { console.log("🕒等待" + time + "毫秒"); resolve(true) }, time) }) } }; function adapterStatus(response) { if (response) { if (response.status) { response["statusCode"] = response.status } else { if (response.statusCode) { response["status"] = response.statusCode } } } return response } return obj };