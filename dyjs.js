
var $tool = tool();

try {
    if (typeof $request != "undefined") {
        console.log("🍎抖音极速获取headers脚本开始!");
        var headers = $request.headers;
        var headlist = $tool.getkeyval("dyheadlist");
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
            console.log("🍎" + JSON.stringify(list));
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
                        console.log("🍎第" + (i + 1) + "个headers!");
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

            var url = 'https://aweme-hl.snssdk.com/luckycat/aweme/v1/task/done/read?version_code=13.2.0&js_sdk_version=1.77.0.2&tma_jssdk_version=1.77.0.2&app_name=douyin_lite&app_version=13.2.0&vid=EC47716C-499A-468E-939B-E88153DE5BDA&device_id=58019842405&channel=App%20Store&mcc_mnc=46001&aid=2329&screen_width=1242&openudid=51dde9612de490a2a6e3f7f01f1b1c08ff159384&cdid=2E5FBF3D-B629-432C-86A2-A786BB4F6696&os_api=18&ac=WIFI&os_version=14.1&client_niu_ready=0&device_platform=iphone&build_number=132004&iid=1231106148139966&device_type=iPhone11,6&idfa=00000000-0000-0000-0000-000000000000';

const body = `{
  "in_sp_time" : 0,
  "task_key" : "read"
}`;
console.log('{\n  "in_sp_time" : 0,\n  "task_key" : "read"\n}');

            var myRequest = {
                url: url,
                headers: JSON.parse($tool.getkeyval("thishead")),
                body: body
            };

            $tool.post(myRequest, function (e, r, d) {
                console.log("🍎" + d);
                $done();
            })
        }
        else {
            $tool.notify("请先刷视频获取headers", "多多益善", "");
            $done();
        }
    }
} catch (e) {
    console.log("🍎错误:" + e);
    $done();
}

//loon/quanx通用方法
function tool() {
    var isLoon = typeof $httpClient != "undefined";
    var isQuanX = typeof $task != "undefined";

    var obj = {
        //通知
        notify: function (title, subtitle, message, option) {
            var option_obj = {};
            if (isQuanX) {
                if (!!option) {
                    if (typeof option == "string") option_obj["open-url"] = option;
                    if (!!option.url) option_obj["open-url"] = option.url;
                    if (!!option.img) option_obj["media-url"] = option.img;
                    $notify(title, subtitle, message, option_obj);
                }
                else {
                    $notify(title, subtitle, message);
                }
            }
            if (isLoon) {
                if (!!option) {
                    if (typeof option == "string") option_obj["openUrl"] = option;
                    if (!!option.url) option_obj["openUrl"] = option.url;
                    if (!!option.img) option_obj["mediaUrl"] = option.img;
                    $notification.post(title, subtitle, message, option_obj);
                }
                else {
                    $notification.post(title, subtitle, message);
                }
            }
        },
        //get请求
        get: function (options, callback) {
            if (isQuanX) {
                if (typeof options == "string") options = { url: options }
                options["method"] = "GET"
                $task.fetch(options).then(function (response) {
                    callback(null, adapterStatus(response), response.body);
                }, function (reason) {
                    callback(reason.error, null, null);
                });
            }
            if (isLoon) {
                $httpClient.get(options, function (error, response, body) {
                    callback(error, adapterStatus(response), body);
                })
            }
        },
        //post请求
        post: function (options, callback) {
            if (isQuanX) {
                if (typeof options == "string") options = { url: options }
                options["method"] = "POST"
                $task.fetch(options).then(function (response) {
                    callback(null, adapterStatus(response), response.body);
                }, function (reason) {
                    callback(reason.error, null, null);
                });
            }
            if (isLoon) {
                $httpClient.post(options, function (error, response, body) {
                    callback(error, adapterStatus(response), body);
                })
            }
        },
        //Unicode解码
        unicode: function (str) {
            return unescape(str.replace(/\\u/gi, '%u'));
        },
        //url解码
        decodeurl: function (str) {
            return decodeURIComponent(str);
        },
        //对象转字符串
        json2str: function (obj) {
            return JSON.stringify(obj);
        },
        //字符串转对象
        str2json: function (str) {
            return JSON.parse(str);
        },
        //数据持久化写入
        setkeyval: function (value, key) {
            if (isQuanX) {
                $prefs.setValueForKey(value, key);
            }
            if (isLoon) {
                $persistentStore.write(value, key);
            }
        },
        //数据持久化读取
        getkeyval: function (key) {
            if (isQuanX) {
                return $prefs.valueForKey(key);
            }
            if (isLoon) {
                return $persistentStore.read(key);
            }
        }

    };

    function adapterStatus(response) {
        if (response) {
            if (response.status) {
                response["statusCode"] = response.status;
            } else if (response.statusCode) {
                response["status"] = response.statusCode;
            }
        }
        return response;
    }

    return obj;

};
