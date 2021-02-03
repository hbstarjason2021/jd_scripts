
console.log("天气脚本开始!");
var $tool = tool();

var bodyFilter = "return body.substring(0,400);";
var params = {
    url: "https://tianqi.moji.com/weather/china/hubei/wuhan",
    opts: { 'filter': bodyFilter }
};
$tool.get(params, function (e, r, d) {
    if (!!d) {
        var index = d.indexOf('description') + 22;
        var index2 = d.indexOf("keywords") - 13;

        var msg = d.substring(index, index2).replace(/ /g, "");
        console.log(msg);

        var icon = "https://h5tq.moji.com/tianqi/assets/images/weather/w0.png";
        if (msg.indexOf("多云") > -1) icon = "https://h5tq.moji.com/tianqi/assets/images/weather/w1.png";
        if (msg.indexOf("阴") > -1) icon = "https://h5tq.moji.com/tianqi/assets/images/weather/w2.png";
        if (msg.indexOf("雨") > -1) icon = "https://h5tq.moji.com/tianqi/assets/images/weather/w8.png";
        if (msg.indexOf("阵雨") > -1) icon = "https://h5tq.moji.com/tianqi/assets/images/weather/w3.png";
        if (msg.indexOf("雷") > -1) icon = "https://h5tq.moji.com/tianqi/assets/images/weather/w4.png";
        if (msg.indexOf("雨夹雪") > -1) icon = "https://h5tq.moji.com/tianqi/assets/images/weather/w6.png";
        if (msg.indexOf("小雨") > -1) icon = "https://h5tq.moji.com/tianqi/assets/images/weather/w7.png";
        if (msg.indexOf("中雨") > -1) icon = "https://h5tq.moji.com/tianqi/assets/images/weather/w8.png";
        if (msg.indexOf("大雨") > -1) icon = "https://h5tq.moji.com/tianqi/assets/images/weather/w9.png";
        if (msg.indexOf("暴雨") > -1) icon = "https://h5tq.moji.com/tianqi/assets/images/weather/w10.png";
        if (msg.indexOf("雪") > -1) icon = "https://h5tq.moji.com/tianqi/assets/images/weather/w15.png";
        if (msg.indexOf("小雪") > -1) icon = "https://h5tq.moji.com/tianqi/assets/images/weather/w14.png";
        if (msg.indexOf("中雪") > -1) icon = "https://h5tq.moji.com/tianqi/assets/images/weather/w15.png";
        if (msg.indexOf("大雪") > -1) icon = "https://h5tq.moji.com/tianqi/assets/images/weather/w16.png";
        if (msg.indexOf("暴雪") > -1) icon = "https://h5tq.moji.com/tianqi/assets/images/weather/w17.png";

        msg = msg.split('。');
        if (msg.length > 0) {
            $tool.notify(msg[0], msg[1], msg[2], { "url": "http://tianqi.moji.com/weather/china/hubei/wuhan", "img": "https://h5tq.moji.com/tianqi/assets/images/weather/w1.png" });
            $done();
        }
        else {
            $tool.notify("错误", "错误", d.substring(index, index2).replace(/ /g, ""));
            $done();
        }
    }
    else {
        $tool.notify("返回空", "错误", d);
        $done();
    }

});

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
