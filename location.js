/**
自动定位脚本
@author: Peng-YM
更新地址：https://raw.githubusercontent.com/Peng-YM/QuanX/master/Tools/Location/locate.js
(1). Quantumult X
[MITM]
hostname=weather-data.apple.com, api.weather.com
[rewrite_local]
https:\/\/((weather-data\.apple)|(api.weather))\.com url script-request-header https://gitee.com/passerby-b/javascript/raw/master/location.js

(2). Loon
[MITM]
hostname=weather-data.apple.com, api.weather.com
[Script]
http-request https:\/\/((weather-data\.apple)|(api.weather))\.com script-path=https://gitee.com/passerby-b/javascript/raw/master/location.js, require-body=false

(3). Surge
[MITM]
hostname=weather-data.apple.com, api.weather.com
[Script]
type=http-request, pattern=https:\/\/((weather-data\.apple)|(api.weather))\.com, script-path=https://gitee.com/passerby-b/javascript/raw/master/location.js, require-body=false

即可定时获取当前位置，注意需要安装自带的天气应用。此重写不要禁用。
在脚本中即可通过 "latitude" 和 ”longitude" 这两个字段引用当前的经纬度了。
*/
$tool=tool();
const url = $request.url;
const res =
    url.match(/weather\/.*?\/(.*)\/(.*)\?/) ||
    url.match(/geocode\/([0-9.]*)\/([0-9.]*)\//) ||
    url.match(/geocode=([0-9.]*),([0-9.]*)/);
const latitude = res[1];
const longitude = res[2];
console.log(`当前位置：纬度${latitude}，经度${longitude}`);

$tool.setkeyval(latitude, "latitude");
$tool.setkeyval(longitude, "longitude");
$tool.notify('经纬度',latitude+','+longitude,'');

$done({});

function tool(){var isLoon=typeof $httpClient!="undefined";var isQuanX=typeof $task!="undefined";var obj={notify:function(title,subtitle,message,option){var option_obj={};if(isQuanX){if(!!option){if(typeof option=="string"){option_obj["open-url"]=option}if(!!option.url){option_obj["open-url"]=option.url}if(!!option.img){option_obj["media-url"]=option.img}$notify(title,subtitle,message,option_obj)}else{$notify(title,subtitle,message)}}if(isLoon){if(!!option){if(typeof option=="string"){option_obj["openUrl"]=option}if(!!option.url){option_obj["openUrl"]=option.url}if(!!option.img){option_obj["mediaUrl"]=option.img}$notification.post(title,subtitle,message,option_obj)}else{$notification.post(title,subtitle,message)}}},get:function(options,callback){if(isQuanX){if(typeof options=="string"){options={url:options}}options["method"]="GET";$task.fetch(options).then(function(response){callback(null,adapterStatus(response),response.body)},function(reason){callback(reason.error,null,null)})}if(isLoon){$httpClient.get(options,function(error,response,body){callback(error,adapterStatus(response),body)})}},post:function(options,callback){if(isQuanX){if(typeof options=="string"){options={url:options}}options["method"]="POST";$task.fetch(options).then(function(response){callback(null,adapterStatus(response),response.body)},function(reason){callback(reason.error,null,null)})}if(isLoon){$httpClient.post(options,function(error,response,body){callback(error,adapterStatus(response),body)})}},unicode:function(str){return unescape(str.replace(/\\u/gi,"%u"))},decodeurl:function(str){return decodeURIComponent(str)},json2str:function(obj){return JSON.stringify(obj)},str2json:function(str){return JSON.parse(str)},setkeyval:function(value,key){if(isQuanX){$prefs.setValueForKey(value,key)}if(isLoon){$persistentStore.write(value,key)}},getkeyval:function(key){if(isQuanX){return $prefs.valueForKey(key)}if(isLoon){return $persistentStore.read(key)}}};function adapterStatus(response){if(response){if(response.status){response["statusCode"]=response.status}else{if(response.statusCode){response["status"]=response.statusCode}}}return response}return obj};
