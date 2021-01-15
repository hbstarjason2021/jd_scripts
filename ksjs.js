
var $tool = tool();

try {
    if (typeof $request != "undefined") {
        console.log("🍎快手极速获取url脚本开始!");

        var url = $request;
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

        if (!!urllist) {
            var list = JSON.parse(urllist);

            if (!!thisurl) {
                if (thisurl.indexOf('"') > -1) thisurl = thisurl.replace(/"/g, '');
                for (var i = 0; i < list.length; i++) {
                    if (JSON.stringify(list[i]) == thisurl) {
                        console.log("☢️第" + (i + 1) + "个url!");
                        if (list.length - 1 == i) {
                            $tool.setkeyval(JSON.stringify(list[0]), "ksthisurl");
                        }
                        else {
                            $tool.setkeyval(JSON.stringify(list[i + 1]), "ksthisurl");
                        }
                        break;
                    }
                }
            }
            else {
                $tool.setkeyval(JSON.stringify(list[0]), "ksthisurl");
                console.log("☢️第0个url!");
            }

            var request = $tool.getkeyval("ksthisurl");
            request = JSON.parse(request);
            var myRequest = {
                url: request.url,
                headers: request.headers
            };
            console.log(JSON.stringify(request.headers));
            $tool.get(myRequest, function (e, r, d) {
                console.log("✳️" + JSON.stringify(r.headers) + r.statusCode);
                if (r.statusCode == "200") {
                    console.log("♥️请求成功!");

                    try {
                        console.log("xxxx" + myRequest.headers['Cookie'] + "\n\n");
                        myRequest.url = "https://nebula.kuaishou.com/rest/n/nebula/activity/earn/overview?addressBookAccessStatus=false";
                        myRequest.headers['Host'] = "nebula.kuaishou.com";
                        //myRequest.headers['Cookie'] = 'appver=9.0.10.460; c=a; client_key=63b2bdd7; countryCode=cn; egid=DFP6D65764A700DADA04BDBE97A2DC7717F36442AB9D425361438F7E880DBFEA; gid=DFP6D65764A700DADA04BDBE97A2DC7717F36442AB9D425361438F7E880DBFEA; kpf=IPHONE; kpn=NEBULA; kuaishou.api_st=Cg9rdWFpc2hvdS5hcGkuc3QSsAFDtgIRZCHQCP3GR0tIeus5O2ZnSMf0XLP1B-HN_yAbphzKrRMM7vUYvhkNd1GaFWgMAeeTORq36PoTr09fWGjRX4ncD2wcUsl3UE2IAClO4yqkyMzjN_Q8rqcjMHFdacyLuc4qnJUmJ1pOxxhWtQXwRVtvnDnCyTKMO7FmODueHXqSJjsoZr4kb2YdmfnK4pcH4vcMRnk8J7qmwGyniA_SGelqXk6Z88-CTl67tGE1LBoSAbBL62FCSBK90AGy_bo9cyIbIiAZAe2WRP8_wnaPMBtO--dKBglsuxRa-h1rLo1LJv7yfCgFMAE; kuaishou.h5_st=Cg5rdWFpc2hvdS5oNS5zdBKgAQWycgnOzuqeSQDvW4JnjASAzj9DEyYewqbT1qwdioX8c8Acn9mzwTsPZzz5YF_s1OgIiUxao5q8_FLBDdnc2r9CeokmBarsriJPHRPJsRmiWMDym8wQiXE2EjYcmrU9eQYx96v-LMPd6hf6pCtQofn2jjT2BHLwKmkVVbq70k_xBAsQYQYlutdB41DhLNTeFmw5qiw9gRXqL2wvIdYgVQUaEvphX81WaAWh_Ys27fjFOfHVkCIgKg9Px2SnrOLin423hVy3RdQu9kl0sOZBDTGHbGZH1Y4oBTAB; kuaishou.sixin.login_st=ChdrdWFpc2hvdS5zaXhpbi5sb2dpbi5zdBKgAdLvV-7ET_Fr_XtLRhNPmpBjSZBN07wJ5ca6er54naWDdiAzcQIAH1_AVRWNYQQDyw35d6U5r2JhppEZqMeiRFB9gWk4fB1iRxucE-yo5LkeRoHGy2-_w4CEO4qGje5qTV29QyDEFWVmjICOWxfQASsePZEvee7TP62wRStL6gxBoKys6KCmK2hWaccGNKWt2KzCeUPAKHfPQBAALmIBp48aEk8ZgyzV6kDTiIME3Bz8GqJ7ViIgZigAg7nJMzEqXwJF8is3cXje3UPwD7elnj5JXwDl6wgoBTAB; language=zh-Hans-CN%3Bq%3D1%2C%2520en-CN%3Bq%3D0.9; lat=0.000000; lon=0.000000; mod=iPhone11%2C6; net=WIFI; sys=iOS_14.1; token=Cg9rdWFpc2hvdS5hcGkuc3QSsAFDtgIRZCHQCP3GR0tIeus5O2ZnSMf0XLP1B-HN_yAbphzKrRMM7vUYvhkNd1GaFWgMAeeTORq36PoTr09fWGjRX4ncD2wcUsl3UE2IAClO4yqkyMzjN_Q8rqcjMHFdacyLuc4qnJUmJ1pOxxhWtQXwRVtvnDnCyTKMO7FmODueHXqSJjsoZr4kb2YdmfnK4pcH4vcMRnk8J7qmwGyniA_SGelqXk6Z88-CTl67tGE1LBoSAbBL62FCSBK90AGy_bo9cyIbIiAZAe2WRP8_wnaPMBtO--dKBglsuxRa-h1rLo1LJv7yfCgFMAE; userId=1693210678; ver=9.0; apptype=2; browseType=3; country_code=cn; cs=false; darkMode=false; foreign=0; ftt=K-T-T; global_id=DFP6D65764A700DADA04BDBE97A2DC7717F36442AB9D425361438F7E880DBFEA; isp=CUCC; os=14.1; power_mode=0; session_id=6A8CDF21-F9B2-4478-97C7-2496541AA286; sh=2688; sid=6A8CDF21-F9B2-4478-97C7-2496541AA286; sw=1242; ud=1693210678; weblogger_switch=; did=00E22B7F-16F2-4B5A-8B20-A640366C2C94'
                        
                        $tool.get(myRequest, function (e2, r2, d2) {
                            //d = JSON.parse(d);
                            //console.log("♥️总金币:" + d.data.totalCoin);
                            console.log("♥️总金币:" + d2);
                            $done();
                        })
                        //$done();
                    } catch (e) {
                        console.log("❌错误:" + e);
                        $done();
                    }
                }
                else {
                    console.log("🚫" + "请求失败!");
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
    console.log("❌错误:" + e);
    $done();
}

function tool() { var isLoon = typeof $httpClient != "undefined"; var isQuanX = typeof $task != "undefined"; var obj = { notify: function (title, subtitle, message, option) { var option_obj = {}; if (isQuanX) { if (!!option) { if (typeof option == "string") { option_obj["open-url"] = option } if (!!option.url) { option_obj["open-url"] = option.url } if (!!option.img) { option_obj["media-url"] = option.img } $notify(title, subtitle, message, option_obj) } else { $notify(title, subtitle, message) } } if (isLoon) { if (!!option) { if (typeof option == "string") { option_obj["openUrl"] = option } if (!!option.url) { option_obj["openUrl"] = option.url } if (!!option.img) { option_obj["mediaUrl"] = option.img } $notification.post(title, subtitle, message, option_obj) } else { $notification.post(title, subtitle, message) } } }, get: function (options, callback) { if (isQuanX) { if (typeof options == "string") { options = { url: options } } options["method"] = "GET"; $task.fetch(options).then(function (response) { callback(null, adapterStatus(response), response.body) }, function (reason) { callback(reason.error, null, null) }) } if (isLoon) { $httpClient.get(options, function (error, response, body) { callback(error, adapterStatus(response), body) }) } }, post: function (options, callback) { if (isQuanX) { if (typeof options == "string") { options = { url: options } } options["method"] = "POST"; $task.fetch(options).then(function (response) { callback(null, adapterStatus(response), response.body) }, function (reason) { callback(reason.error, null, null) }) } if (isLoon) { $httpClient.post(options, function (error, response, body) { callback(error, adapterStatus(response), body) }) } }, unicode: function (str) { return unescape(str.replace(/\\u/gi, "%u")) }, decodeurl: function (str) { return decodeURIComponent(str) }, json2str: function (obj) { return JSON.stringify(obj) }, str2json: function (str) { return JSON.parse(str) }, setkeyval: function (value, key) { if (isQuanX) { $prefs.setValueForKey(value, key) } if (isLoon) { $persistentStore.write(value, key) } }, getkeyval: function (key) { if (isQuanX) { return $prefs.valueForKey(key) } if (isLoon) { return $persistentStore.read(key) } }, wait: function (time) { return new Promise(function (resolve) { setTimeout(function () { console.log("🕒等待" + time + "毫秒"); resolve(true) }, time) }) } }; function adapterStatus(response) { if (response) { if (response.status) { response["statusCode"] = response.status } else { if (response.statusCode) { response["status"] = response.statusCode } } } return response } return obj };
