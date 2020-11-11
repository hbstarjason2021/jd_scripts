
//重写匹配地址:api3-core-c-hl.amemv.com/aweme/v1/aweme/post
//MITM:*.amemv.com

console.log("🍎抖音去水印脚本开始!");
var body = $response.body;
var $tool = tool();
try {
    if ($request.url.indexOf("api3-core-c-hl.amemv.com/aweme/v1/aweme/post") > -1 && !!body) {
        var obj = $tool.str2json(body);
        for (var i = 0; i < obj.aweme_list.length; i++) {
            obj.aweme_list[i].video_control.allow_download = true;
            obj.aweme_list[i].video_control.share_type = 1;
            obj.aweme_list[i].video_control.prevent_download_type = 0;
            obj.aweme_list[i].status.self_see = false;
            obj.aweme_list[i].status.reviewed = 1;
            obj.aweme_list[i].status.is_private = false;
            obj.aweme_list[i].status.dont_share_status = -1;
            obj.aweme_list[i].status.download_status = 0;
            obj.aweme_list[i].status.allow_share = true;
            obj.aweme_list[i].status.private_status = 0;

            var play_addr = obj.aweme_list[i].video.play_addr.url_list;
            obj.aweme_list[i].video.download_addr.url_list = play_addr;
            if (obj.aweme_list[i].video.download_suffix_logo_addr) {
                obj.aweme_list[i].video.download_suffix_logo_addr.url_list = play_addr;
            }
            console.log("🍎播放地址:" + play_addr);
        }
        $done({ body: $tool.json2str(obj) });
    }
    else {
        $done({});
    }
} catch (e) {
    console.log("🍎try错误:" + e);
    $tool.notify('try错误!', 'try错误:', e);
    $done({});
}
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
