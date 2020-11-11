
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

function tool(){var a=typeof $httpClient!="undefined";var b=typeof $task!="undefined";var c={notify:function(i,f,h,g){var e={};if(b){if(!!g){if(typeof g=="string"){e["open-url"]=g}if(!!g.url){e["open-url"]=g.url}if(!!g.img){e["media-url"]=g.img}$notify(i,f,h,e)}else{$notify(i,f,h)}}if(a){if(!!g){if(typeof g=="string"){e["openUrl"]=g}if(!!g.url){e["openUrl"]=g.url}if(!!g.img){e["mediaUrl"]=g.img}$notification.post(i,f,h,e)}else{$notification.post(i,f,h)}}},get:function(e,f){if(b){if(typeof e=="string"){e={url:e}}e["method"]="GET";$task.fetch(e).then(function(g){f(null,d(g),g.body)},function(g){f(g.error,null,null)})}if(a){$httpClient.get(e,function(i,h,g){f(i,d(h),g)})}},post:function(e,f){if(b){if(typeof e=="string"){e={url:e}}e["method"]="POST";$task.fetch(e).then(function(g){f(null,d(g),g.body)},function(g){f(g.error,null,null)})}if(a){$httpClient.post(e,function(i,h,g){f(i,d(h),g)})}},unicode:function(e){return unescape(e.replace(/\\u/gi,"%u"))},decodeurl:function(e){return decodeURIComponent(e)},json2str:function(e){return JSON.stringify(e)},str2json:function(e){return JSON.parse(e)},setkeyval:function(f,e){if(b){$prefs.setValueForKey(f,e)}if(a){$persistentStore.write(f,e)}},getkeyval:function(e){if(b){return $prefs.valueForKey(e)}if(a){return $persistentStore.read(e)}}};function d(e){if(e){if(e.status){e["statusCode"]=e.status}else{if(e.statusCode){e["status"]=e.statusCode}}}return e}return c};