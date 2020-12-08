console.log("🍎rsp脚本开始!");
var url = $request.url;
var headers = $request.headers;
var respbody = $response.body;
try {
    //var room_id = url.split("room_id=")[1];

    //console.log("🍎红包列表:" + respbody);
    if (!!data) {
        var list = JSON.parse(respbody);
        for (var i = 0; i < list.data.length; i++) {
            console.log("🍎红包ID:" + list.data[i].box_id);
        }
    }

} catch (e) {
    console.log("🍎try错误:" + e);
}

$done({});
console.log("🍎执行完成!!!!");