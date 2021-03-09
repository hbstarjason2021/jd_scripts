// JavaScript source code
var $tool = new tool();
var html = '<!DOCTYPE html><html lang="en"xmlns="http://www.w3.org/1999/xhtml"><head><meta charset="utf-8"/><title></title><script src="https://ajax.aspnetcdn.com/ajax/jquery/jquery-1.10.2.min.js"></script></head><body>测试:<input id="txtkey"type="text"/><input id="btn"type="button"value="测试"/></body></html>$("#btn").click(function(){var keyval=$("#txtkey").val();var a=$prefs.valueForKey("dyheadlist");console.log(a)})';


//$tool.get({ url: "https://gitee.com/passerby-b/javascript/raw/master/test/HTTP_backend.html" }, function (e, r, d) {
    //$done(d);
//});
try{
 var str= $prefs.valueForKey('dyurl');
 $done(str);
}
catch(e){
 $done('xxxx');
}

//https://aweme.snssdk.com/luckycat/aweme/v1/task/done/read?version_code=13.2.0&js_sdk_version=1.77.0.2&tma_jssdk_version=1.77.0.2&app_name=douyin_lite&app_version=13.2.0&vid=D5CDCDAF-3054-45CC-9A3F-61D1693EDB16&device_id=3412537364194270&channel=App%20Store&mcc_mnc=&aid=2329&screen_width=750&openudid=ec026eb292ac938589a4bdb9aaec472157636907&cdid=FA3F2C04-E4AB-4540-AB94-FA4F4CAD7637&os_api=18&ac=WIFI&os_version=14.3&client_niu_ready=0&device_platform=iphone&build_number=132004&iid=1635726574762254&device_type=iPhone9,1&idfa=CEECB1D1-015B-47AF-932F-F54311655A6B


function tool() { var isLoon = typeof $httpClient != "undefined"; var isQuanX = typeof $task != "undefined"; var obj = { notify: function (title, subtitle, message, option) { var option_obj = {}; if (isQuanX) { if (!!option) { if (typeof option == "string") option_obj["open-url"] = option; if (!!option.url) option_obj["open-url"] = option.url; if (!!option.img) option_obj["media-url"] = option.img; $notify(title, subtitle, message, option_obj) } else { $notify(title, subtitle, message) } } if (isLoon) { if (!!option) { if (typeof option == "string") option_obj["openUrl"] = option; if (!!option.url) option_obj["openUrl"] = option.url; if (!!option.img) option_obj["mediaUrl"] = option.img; $notification.post(title, subtitle, message, option_obj) } else { $notification.post(title, subtitle, message) } } }, get: function (options, callback) { if (isQuanX) { if (typeof options == "string") options = { url: options }; options["method"] = "GET"; $task.fetch(options).then(function (response) { callback(null, adapterStatus(response), response.body) }, function (reason) { callback(reason.error, null, null) }) } if (isLoon) { $httpClient.get(options, function (error, response, body) { callback(error, adapterStatus(response), body) }) } }, post: function (options, callback) { if (isQuanX) { if (typeof options == "string") options = { url: options }; options["method"] = "POST"; $task.fetch(options).then(function (response) { callback(null, adapterStatus(response), response.body) }, function (reason) { callback(reason.error, null, null) }) } if (isLoon) { $httpClient.post(options, function (error, response, body) { callback(error, adapterStatus(response), body) }) } }, unicode: function (str) { return unescape(str.replace(/\\u/gi, '%u')) }, decodeurl: function (str) { return decodeURIComponent(str) }, json2str: function (obj) { return JSON.stringify(obj) }, str2json: function (str) { return JSON.parse(str) }, setdata: function (value, key) { if (isQuanX) { $prefs.setValueForKey(value, key) } if (isLoon) { $persistentStore.write(value, key) } }, getdata: function (key) { if (isQuanX) { $prefs.valueForKey(key) } if (isLoon) { $persistentStore.read(key) } }, log: function (msg) { return console.log("📕" + msg) } }; function adapterStatus(response) { if (response) { if (response.status) { response["statusCode"] = response.status } else if (response.statusCode) { response["status"] = response.statusCode } } return response } return obj };


