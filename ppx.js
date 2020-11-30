//ib-hl.snssdk.com/bds/feed/stream

console.log("🍎皮皮虾去水印脚本开始!");
var body = $response.body;
try {
    if (!!body) {
        console.log("🍎🍎" + body + "🍎🍎🍎");
        var obj = JSON.parse(body);
        for (var i = 0; i < obj.data.data.length; i++) {
            if (!!obj.data.data[i].item && !!obj.data.data[i].item.video) {
                obj.data.data[i].item.video.video_download.url_list = obj.data.data[i].item.video.video_high.url_list;
                console.log("🍎" + JSON.stringify(obj.data.data[i].item.video.video_high.url_list));
                console.log("🍎🍎" + JSON.stringify(obj.data.data[i].item.video.video_download.url_list));
            }
            else if (!!obj.data.data[i].item && !!obj.data.data[i].item.comments) {
                for (var n = 0; n < obj.data.data[i].item.comments.length; n++) {
                    obj.data.data[i].item.comments[n].item.video.video_download.url_list = obj.data.data[i].item.comments[n].item.video.video_high.url_list;
                    console.log("🍎" + JSON.stringify(obj.data.data[i].item.comments[n].item.video.video_download.url_list));
                    console.log("🍎🍎" + JSON.stringify(obj.data.data[i].item.comments[n].item.video.video_high.url_list));
                }
            }
            else if (!!obj.data.data[i].block_info && !!obj.data.data[i].block_info.cell_list) {
                for (var n = 0; n < obj.data.data[i].block_info.cell_list.length; n++) {
                    if (!!obj.data.data[i].block_info.cell_list[n].item && !!obj.data.data[i].block_info.cell_list[n].item.video) {
                        obj.data.data[i].block_info.cell_list[n].item.video.video_download.url_list = obj.data.data[i].block_info.cell_list[n].item.video.video_high.url_list;
                        console.log("🍎" + JSON.stringify(obj.data.data[i].block_info.cell_list[n].item.video.video_high.url_list));
                        console.log("🍎🍎" + JSON.stringify(obj.data.data[i].block_info.cell_list[n].item.video.video_download.url_list));
                    }
                }
            }
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


