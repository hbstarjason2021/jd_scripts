
//重写添加成功后刷视频,等红包进度圈满后就会提示获取header成功,多获取几个header,最好获取五十个以上,多多益善
//获取多个header成功后再定时循环执行脚本任务,间隔时间最好在30s以上,每天稳定在10000音符左右
//且刷且珍惜,刷的别太嚣张,说不定过几天就封了

// [mitm]
// hostname = *.snssdk.com

//==========================Quantumultx=========================
// [task_local]
// */30 * * * * * https://gitee.com/passerby-b/javascript/raw/master/dyjs.js, tag=小火山极速版刷音符, enabled=true

// [rewrite_local]
// snssdk.com/luckycat/aweme/v1/task/done/read? url script-request-header https://gitee.com/passerby-b/javascript/raw/master/dyjs.js

// =========================Loon=============================
// [Script]
// snssdk.com/luckycat/aweme/v1/task/done/read? script-path=https://gitee.com/passerby-b/javascript/raw/master/dyjs.js, requires-body=true, timeout=10, tag=小火山极速版刷音符
// cron "*/30 * * * * *" script-path=https://gitee.com/passerby-b/javascript/raw/master/dyjs.js,tag=小火山极速版刷音符

var isShowCionDetail = false;//显示收益详情

var $tool = tool();
try {
    if (typeof $request != "undefined") {
        console.log("🍓🍓🍓🍓小火山极速获取headers脚本开始!");
        var headers = $request.headers;
        var headlist = $tool.getkeyval("xhsheadlist");
        $tool.setkeyval($request.url, "xhsurl");
        if (!!headers) {
            if (!!headlist) {
                var list = JSON.parse(headlist);
                list.push(headers)
            } else {
                var list = [];
                list.push(headers)
            }
            $tool.notify("小火山获取headers成功", "个数:" + list.length, "");
            $tool.setkeyval(JSON.stringify(list), "xhsheadlist");
            console.log("✳️" + JSON.stringify(list))
        }
        $done()
    } else {
        console.log("\n🍓🍓🍓🍓🍓🍓小火山极速刷视频脚本开始!\n");
        var headlist = $tool.getkeyval("xhsheadlist");
        var xhsthishead = $tool.getkeyval("xhsthishead");
        if (!!headlist) {
            var index = 0;
            var list = JSON.parse(headlist);
            if (!!xhsthishead) {
                var isexist = false;
                for (var i = 0; i < list.length; i++) {
                    if (JSON.stringify(list[i]) == xhsthishead) {
                        isexist = true;
                        if (list.length - 1 == i) {
                            $tool.setkeyval(JSON.stringify(list[0]), "xhsthishead");
                        } else {
                            $tool.setkeyval(JSON.stringify(list[i + 1]), "xhsthishead");
                            index = i + 1
                        }
                        break
                    }
                }
                if (!isexist) {
                    $tool.setkeyval(JSON.stringify(list[0]), "xhsthishead");
                }
            } else {
                $tool.setkeyval(JSON.stringify(list[0]), "xhsthishead");
            }
            console.log("\n🥩开始刷第" + (index + 1) + "个headers,共" + list.length + "个headers\n");
            console.log("xxxxx" + JSON.parse($tool.getkeyval("xhsthishead"))['tt-request-time']);
            var urlreplace = "https://ib-hl.snssdk.com/luckycat/hotsoon/v1/task/done/daily_read_30m?" + $tool.getkeyval("xhsurl").split('?')[1];
            var myRequest = {
                url: 'https://ib-hl.snssdk.com/luckycat/hotsoon/v1/task/done/daily_read_30m?version_code=7.6.4&app_name=live_stream_lite&vid=EC47716C-499A-468E-939B-E88153DE5BDA&device_id=58019842405&new_nav=0&channel=App%20Store&aid=1350&screen_width=1242&client_request_id=8df648afed849eb6e5276a5e608f25a5&openudid=34cb85857d1f88e6de60249e44497d9c38b3ba2e&live_sdk_version=7.6.4&update_version_code=7642&os_api=18&ws_status=CONNECTED&ac=WIFI&mccmnc=46002&os_version=14.1&client_version_code=764&device_platform=iphone&iid=3536445627444782&device_type=iPhone11,6&idfa=00000000-0000-0000-0000-000000000000',
                headers: JSON.parse($tool.getkeyval("xhsthishead")),
                //body: '{\n  "in_sp_time" : 0,\n  "task_key" : "read"\n}'
            };
            $tool.post(myRequest, function (e, r, d) {
                if (d.indexOf("成功") > -1) {
                    var dataobj = JSON.parse(d);
                    console.log("\n♥️获得🍒" + dataobj.data['amount'] + "🍒个金币!\n");
                    $done();
                }
                    //else if (d.indexOf("10009") > -1) {
                    //    if (index == list.length - 1) {
                    //        $tool.setkeyval(JSON.stringify(list[0]), "xhsthishead")
                    //    } else {
                    //        $tool.setkeyval(JSON.stringify(list[index + 1]), "xhsthishead")
                    //    }
                    //    list.splice(index, 1);
                    //    $tool.setkeyval(JSON.stringify(list), "xhsheadlist");
                    //    console.log("\n❌删除此条header,还剩" + list.length + "个\n")
                    //}
                else {
                    console.log("\n♨️" + d + "\n");
                    $done();
                }

            })
        }
        else if (headlist == "[]") {
            $tool.notify("请先刷视频获取headers", "多多益善", "");
            $done();
        }
        else {
            $tool.notify("请先刷视频获取headers", "多多益善", "");
            $done();
        }
    }
} catch (e) {
    console.log("❌错误:" + e);
    $done()
}
function tool() {
    var isLoon = typeof $httpClient != "undefined";
    var isQuanX = typeof $task != "undefined";
    var obj = {
        notify: function (title, subtitle, message, option) {
            var option_obj = {};
            if (isQuanX) {
                if (!!option) {
                    if (typeof option == "string") {
                        option_obj["open-url"] = option
                    }
                    if (!!option.url) {
                        option_obj["open-url"] = option.url
                    }
                    if (!!option.img) {
                        option_obj["media-url"] = option.img
                    }
                    $notify(title, subtitle, message, option_obj)
                } else {
                    $notify(title, subtitle, message)
                }
            }
            if (isLoon) {
                if (!!option) {
                    if (typeof option == "string") {
                        option_obj["openUrl"] = option
                    }
                    if (!!option.url) {
                        option_obj["openUrl"] = option.url
                    }
                    if (!!option.img) {
                        option_obj["mediaUrl"] = option.img
                    }
                    $notification.post(title, subtitle, message, option_obj)
                } else {
                    $notification.post(title, subtitle, message)
                }
            }
        },
        get: function (options, callback) {
            if (isQuanX) {
                if (typeof options == "string") {
                    options = {
                        url: options
                    }
                }
                options["method"] = "GET";
                $task.fetch(options).then(function (response) {
                    callback(null, adapterStatus(response), response.body)
                },
                function (reason) {
                    callback(reason.error, null, null)
                })
            }
            if (isLoon) {
                $httpClient.get(options,
                function (error, response, body) {
                    callback(error, adapterStatus(response), body)
                })
            }
        },
        post: function (options, callback) {
            if (isQuanX) {
                if (typeof options == "string") {
                    options = {
                        url: options
                    }
                }
                options["method"] = "POST";
                $task.fetch(options).then(function (response) {
                    callback(null, adapterStatus(response), response.body)
                },
                function (reason) {
                    callback(reason.error, null, null)
                })
            }
            if (isLoon) {
                $httpClient.post(options,
                function (error, response, body) {
                    callback(error, adapterStatus(response), body)
                })
            }
        },
        unicode: function (str) {
            return unescape(str.replace(/\\u/gi, "%u"))
        },
        decodeurl: function (str) {
            return decodeURIComponent(str)
        },
        json2str: function (obj) {
            return JSON.stringify(obj)
        },
        str2json: function (str) {
            return JSON.parse(str)
        },
        setkeyval: function (value, key) {
            if (isQuanX) {
                $prefs.setValueForKey(value, key)
            }
            if (isLoon) {
                $persistentStore.write(value, key)
            }
        },
        getkeyval: function (key) {
            if (isQuanX) {
                return $prefs.valueForKey(key)
            }
            if (isLoon) {
                return $persistentStore.read(key)
            }
        }
    };
    function adapterStatus(response) {
        if (response) {
            if (response.status) {
                response["statusCode"] = response.status
            } else {
                if (response.statusCode) {
                    response["status"] = response.statusCode
                }
            }
        }
        return response
    }
    return obj
};


