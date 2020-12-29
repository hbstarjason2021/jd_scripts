
console.log("🍎签到脚本开始!");
var  $tool = tool();

async function init(){
  var  a=  await cf_sign();
  console.log(a);
    await feng_sign();
    await jd_sign();
    await cf_task();
    await nz_sign();
}

init();

// setTimeout(cf_sign, 500);

// setTimeout(feng_sign, 1500);

// setTimeout(jd_sign, 2500);

// setTimeout(cf_task, 3500);

// //setTimeout(unipay_sign, 4500);

// setTimeout(nz_sign, 5000);

console.log("🍎执行完成!!!!");
$done();

//京东金豆签到
async function jd_sign() {
    return new Promise(function(resolve){
        console.log("🍎京东签到金豆脚本开始!");

        var  Cookie = 'pin=717785320_m;wskey=AAJdrSW2AEB_x8gpN4YY67LMwreL46CJS6AsHwT6V1LuvajnGAaq4RYekVh4qeM9GAM7gfMDf-gsKiv5dwHnEdC_N_7X3GVr;whwswswws=hRTtb5W/D/vXUu2Kx9k7LpAVWIvlMgRPu8ZN+EAl3YMJTPQTSNRT/FC82Mb3kw31Gh1maJx/uu9DgU97mUoQkQA==;unionwsws={"jmafinger":"hRTtb5W\/D\/vXUu2Kx9k7LpAVWIvlMgRPu8ZN+EAl3YMJTPQTSNRT\/FC82Mb3kw31Gh1maJx\/uu9DgU97mUoQkQA==","devicefinger":"eidI3A740111RTI2MjAyRTAtNjMxOC00Rg==S383seL61Kq8IRd1wsJ1jmQZxCvjQ5jy5C5qG\/7luhyvqmrkir+bs0zK4OE\/+g56nSlNx7xkOsxELNC0"}';
    
        var  params = {
            url: "https://api.m.jd.com/client.action?functionId=signBeanIndex&appid=ld",
            headers: {
                Cookie: Cookie
            }
        }
        $tool.get(params, function (e, r, d) {
            console.log("京东签到***********************************");
            console.log("错误:" + e);
            console.log("返回:" + d);
            console.log("京东签到***********************************");
    
            var  d = d.replace(/"{/g, "{").replace(/}"/g, "}").replace(/\\/g, "");
            var  obj = JSON.parse(d);
    
            var  img = "https://is3-ssl.mzstatic.com/image/thumb/Purple114/v4/4b/ce/15/4bce15af-bf57-6e19-add1-121077da94c2/AppIcon-0-0-1x_U007emarketing-0-0-0-6-0-0-sRGB-85-220.png/230x0w.png";
    
            if (d.indexOf("签到成功") > -1 || d.indexOf("连签") > -1) {
                //var jdnum = d.substring((d.indexOf("beanCount") + 12), (d.indexOf("beanImgUrl") - 3));
                //$notification.post('京东签到成功!', '京东签到成功', "获得" + jdnum + "个金豆");
                $tool.notify('京东签到成功!', '京东签到成功', "获得" + obj.data.dailyAward.beanAward.beanCount + "个金豆", { img: img });
            }
            else if (d.indexOf("已签到") > -1) {
                //var jdnum = d.substring((d.indexOf("beanCount") + 12), (d.indexOf("beanImgUrl") - 3));
                //$notification.post('京东今天已签到!', '京东今天已签到', "获得" + jdnum + "个金豆");
                $tool.notify('京东今天已签到!', '京东今天已签到', "获得" + obj.data.dailyAward.beanAward.beanCount + "个金豆", { img: img });
            }
            else if (d.indexOf("用户未登录") > -1) {
                $tool.notify('京东用户未登录!', 'Cookie过期', d, { img: img });
            }
            else {
                $tool.notify('京东签到失败!', '京东签到失败', d, { img: img });
            }
            resolve(d);
        });

    })
    
}

//掌火签到

 function cf_sign() {
    return new Promise(async resolve => {
        var cfnz_token = $tool.getkeyval("cfnztoken");
        console.log("🍎掌火签到脚本开始!");

        var params = {
            url: "https://mwegame.qq.com/cfip/score_sign/doSign?serverName=%E6%B9%96%E5%8C%97%E7%94%B5%E4%BF%A1%E4%B8%80%E5%8C%BA&appid=1101817502&areaName=%E6%B9%96%E5%8C%97%E7%94%B5%E4%BF%A1&roleName=%E7%B5%95%E5%9C%B0%E9%9D%92%E9%BE%8D&gameName=%E7%A9%BF%E8%B6%8A%E7%81%AB%E7%BA%BF&nickname=%E3%80%80%E3%80%80&isMainRole=1&roleJob=%E5%85%83%E5%B8%85&areaId=85&roleId=717785320&gameId=10011&toUin=717785320&subGameId=10011&serverId=328&cGameId=1001&token=" + cfnz_token + "&uniqueRoleId=1760005752041800&acctype=qq&uin=717785320&roleLevel=100&userId=362446817&gift_id=9036",
            headers: {
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 GameHelper_1001/3.3.10814.2103030814"
            }
        }
        $tool.get(params, function (e, r, d) {
            d = unescape(d.replace(/\\u/gi, '%u'));

            console.log("掌火签到***********************************");
            console.log("错误:" + e);
            console.log("返回:" + d);
            console.log("掌火签到***********************************");

            var img = "https://is2-ssl.mzstatic.com/image/thumb/Purple124/v4/85/dd/01/85dd01be-e1dc-cb26-4d20-be75e44cb979/CFGroupAppIcon-0-0-1x_U007emarketing-0-0-4-0-0-85-220.png/230x0w.png";

            var obj = JSON.parse(d);
            if (d.indexOf("签到成功") > -1 || d.indexOf("经验") > -1) {
                $tool.notify('掌火签到成功!', obj.data.exp, d, { img: img });
            }
            else if (d.indexOf("已签到") > -1) {
                $tool.notify('掌火已签到!', obj.data.exp, d, { img: img });
            }
            else {
                $tool.notify('掌火签到失败!', '掌火签到失败', d, { img: img });
            }
            resolve(d);
        });
    });
}

//逆战签到
async function nz_sign() {
    var cfnz_token = $tool.getkeyval("cfnztoken");
    console.log("🍎逆战签到脚本开始!");

    var params = {
        url: "https://mwegame.qq.com/cfip/score_sign/doSign?uin=717785320&areaId=379&roleId=717785320&gameId=10012&serverName=%E7%94%B5%E4%BF%A1%E5%8C%BA&roleLevel=48&toUin=717785320&userId=362446817&token=" + cfnz_token + "&areaName=%E7%94%B5%E4%BF%A1%E5%8C%BA&roleName=%E7%BB%9D%E5%9C%B0%E8%8B%8D%E9%BE%99&isMainRole=1&nickname=%E3%80%80%E3%80%80&uniqueRoleId=183230734&serverId=1&roleJob=%E4%B8%8A%E5%B0%89%E4%B8%89%E7%BA%A7&gift_id=7283",
        headers: {
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 GameHelper_1001/3.3.10814.2103030814"
        }
    }
    $tool.get(params, function (e, r, d) {
        d = unescape(d.replace(/\\u/gi, '%u'));
        console.log("逆战签到***********************************");
        console.log("错误:" + e);
        console.log("返回:" + d);
        console.log("逆战签到***********************************");

        var img = "https://is5-ssl.mzstatic.com/image/thumb/Purple124/v4/95/54/28/955428db-76e1-ec28-b0ba-9733386f8537/NzAppIcon-1x_U007emarketing-0-3-85-220.png/230x0w.png";
        
        var obj = JSON.parse(d);
        if (d.indexOf('经验') > -1) {
            $tool.notify('逆战签到成功!', obj.data.exp, d, { img: img });
        }
        else {
            $tool.notify('逆战签到失败!', '逆战签到失败', d, { img: img });
        }
        Promise.resolve("ok");
    });
}

//威锋签到
async function feng_sign() {
    console.log("🍎威锋签到脚本开始!");

    var params = {
        url: "https://api.wfdata.club/v1/attendance/userSignIn",
        headers: {
            "X-Access-Token": $tool.getkeyval("weifengCookie"),
            "X-Request-Id": "WDQKt2+dxMxPlIA4Wz5yf9l2x4N3rKqe65uuHK/BejnFuQijHRjbLWEv0y78XWuFmSddurDmS8IbUVl49XMKyw=="
        }
    }
    $tool.post(params, function (e, r, d) {
        console.log("威锋签到***********************************");
        console.log("错误:" + e);
        console.log("返回:" + d);
        console.log("威锋签到***********************************");

        var img = "https://is2-ssl.mzstatic.com/image/thumb/Purple124/v4/1f/f6/69/1ff66978-acce-f026-1661-0d7eac3e96d7/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/230x0w.png";

        var obj = JSON.parse(d);
        if (d.indexOf("success") > -1) {
            $tool.notify('威锋签到成功!', "", d, { img: img });
        }
        else if (d.indexOf("不能重复签到") > -1) {
            $tool.notify('威锋已签到!', "不能重复签到", d, { img: img });
        }
        else {
            $tool.notify('威锋签到失败!', '威锋签到失败', d, { img: img });
        }
        Promise.resolve("ok");
    });
}

//云闪付签到
function unipay_sign() {
    console.log("🍎云闪付签到脚本开始!");
    var img = "https://is5-ssl.mzstatic.com/image/thumb/Purple114/v4/53/bc/b5/53bcb52a-6c33-67cc-0c70-faf4ffbdb71e/AppIcon-0-0-1x_U007emarketing-0-0-0-6-0-0-85-220.png/230x0w.png";
    var url = 'https://youhui.95516.com/newsign/api/daily_sign_in';
    var method = 'POST';
    var headers = {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Origin': 'https://youhui.95516.com',
        'Cookie': !!$tool.getkeyval("UniCookie") ? $tool.getkeyval("UniCookie") : "",
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

    $tool.post(myRequest, function (e, r, d) {
        console.log("🍎云闪付:" + d);
        var obj = JSON.parse(d);
        if (!!obj.signedIn) {
            if (obj.signedIn == true) {
                var days = 0;
                for (var item in obj.days) {
                    if (obj.days[item] == 1) {
                        days++;
                    }
                }
                $tool.notify("云闪付签到成功!", "首次签到时间:" + obj.startedAt, "已签到:" + days + "天!", { img: img });
            }
            else {
                $tool.notify("云闪付签到失败!", d, d, { img: img });
            }
        }
        else {
            $tool.notify("云闪付签到失败!", d, d, { img: img });
        }
    })
}

//cf玩一局游戏领积分
async function cf_task() {
    console.log("🍎掌火任务积分脚本开始!");

    var params = {
        url: "https://mwegame.qq.com/cfip/growth/ajax/getGameTaskScore",
        headers: {
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 GameHelper_1001/3.3.10814.2103030814",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "userId=362446817&openid=&appOpenid=&areaId=85&serverId=328&gameId=10011&cGameId=1001&subGameId=10011&roleId=717785320&uniqueRoleId=1760005752041800&token=" + cfnz_token + "&uin=717785320&toUin=717785320&nickname=%E3%80%80%E3%80%80&roleName=%E7%B5%95%E5%9C%B0%E9%9D%92%E9%BE%8D&areaName=%E6%B9%96%E5%8C%97%E7%94%B5%E4%BF%A1&serverName=%E6%B9%96%E5%8C%97%E7%94%B5%E4%BF%A1%E4%B8%80%E5%8C%BA&page=0&isother=0&env=prod&openId=&type=3"
    }
    $tool.post(params, function (e, r, d) {
        console.log("🍎掌火任务积分***********************************");
        console.log("🍎错误:" + e);
        console.log("🍎返回:" + d);
        console.log("🍎掌火任务积分***********************************");
        var img = "https://is2-ssl.mzstatic.com/image/thumb/Purple124/v4/85/dd/01/85dd01be-e1dc-cb26-4d20-be75e44cb979/CFGroupAppIcon-0-0-1x_U007emarketing-0-0-4-0-0-85-220.png/230x0w.png";
        $tool.notify('掌火领取任务积分!', d, d, { img: img });
        Promise.resolve("ok");
    });
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
