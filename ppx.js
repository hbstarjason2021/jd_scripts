
//ib-hl.snssdk.com/bds/feed/stream

console.log("🍎抖音去水印脚本开始!");
var body = $response.body;
try {
    if ($request.url.indexOf("ib-hl.snssdk.com/bds/feed/stream") > -1 && !!body) {
        console.log("🍎" + body);
        var obj = JSON.parse(body);
        for (var i = 0; i < obj.data.data.length; i++) {
            obj.data.data[i].item.video.video_download.url_list = obj.data.data[i].item.video.video_high.url_list;
            console.log("🍎" + obj.data.data[i].item.video.video_download.url_list[0]);
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


