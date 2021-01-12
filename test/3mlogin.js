
console.log("🍎dylike脚本开始!");
var $ = tool();

try {
    var headers = {
        "cache-control": "no-cache",
        "upgrade-insecure-requests": "1",
        "origin": "http://119.79.233.250:8001",
        "user-agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "referer": "http://119.79.233.250:8001/seeyon/main.do",
        "accept-encoding": "gzip, deflate",
        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-US;q=0.7",
        "content-type": "application/x-www-form-urlencoded",
        "postman-token": "67e0e10b-1fab-efd1-554f-1269c46e557f"
    };
    var myRequest = {
        url: 'http://3m.ibugos.ml:8001/seeyon/main.do?method=login',
        headers: headers,
        body: 'authorization=&login.timezone=GMT%2B8%3A00&province=%E6%B9%96%E5%8C%97%E7%9C%81&city=%E6%AD%A6%E6%B1%89%E5%B8%82&rectangle=114.0169501%2C30.36460893%3B114.6261227%2C30.77017755&login_username=13469990579&trustdo_type=&login_password=U2FsdGVkX1%2BQIXoGNpjL1Z4QosPBSk3wMcqS674xs2k%3D&login_validatePwdStrength=1&random=&fontSize=12&screenWidth=1920&screenHeight=1080'
    };

    $.post(myRequest, function (e, r, d) {
        console.log(e);
        console.log(r);
        console.log(d);
        $done();
    })
} catch (e) {
    console.log("🍎Try错误:" + e);
    $.notify('Try错误!', 'Try错误:', e, { img: img });
}

$done();
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
        },
        //等待
        wait: function (time) {
            return new Promise(function (resolve) {
                setTimeout(function () {
                    console.log("🕒等待" + time + "毫秒");
                    resolve(true);
                }, time);
            });
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
