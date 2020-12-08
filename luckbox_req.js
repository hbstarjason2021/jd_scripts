console.log("🍎req脚本开始!");
var headers = $request.headers;
headers["response-format"] = "json";
console.log("🍎response-format:" + headers["response-format"]);
$done({ headers: headers });
console.log("🍎执行完成!!!!");