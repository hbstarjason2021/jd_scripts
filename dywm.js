
//重写匹配地址:core-c-hl.amemv.com/aweme/v1/aweme/post
//QuanX重写配置:core-c-hl.amemv.com/aweme/v1/aweme/post url script-response-body https://gitee.com/passerby-b/javascript/raw/master/dywm.js
//MITM:*.amemv.com
//需要到作者的作品列表里找到那个视频再下载

console.log("🍎抖音去水印脚本开始!");
var body = $response.body;
try {
    if ($request.url.indexOf("core-c-hl.amemv.com/aweme/v1/aweme/post") > -1 && !!body) {
        var obj = JSON.parse(body);
        for (var i = 0; i < obj.aweme_list.length; i++) {
            var play_addr = obj.aweme_list[i].video.play_addr.url_list;
            obj.aweme_list[i].video.download_addr.url_list = play_addr;
            console.log("🍎播放地址:" + play_addr);
        }
        $done({ body: JSON.stringify(obj) });
    }
    else {
        $done({});
    }
} catch (e) {
    console.log("🍎try错误:" + e);
    $done({});
}
console.log("执行完成!!!!");
