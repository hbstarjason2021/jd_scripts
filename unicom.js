
const $ = API("unicom", true);

var cookie = 'https://act.10010.com/SigninApp/signin/daySign';
var headers = {
    "Origin": "https:\/\/img.client.10010.com",
    "Cookie": "channel=GGPD; city=071|710; cw_mutual=7064d003eb3c8934e769e430ecf3d64a91246651671794c1a45e99ee80d5d0dbc3fe4956af2ade259ce451f7cefd55f722cad68c1cce783b594fe6d766c69f65; devicedId=D8FB8E44-B5C9-42D5-8C27-6272AB130495; ecs_acc=hY\/mgGen0aGxbHQLLSwHabIzhUXvAeISC2U9b9YXLwg98vJxLRM73lR9pQKGh\/2g926xyIrl3K1cirSPswPB4EWWaGdwYEAf5vP4XrLj4Kl1mZs9j15KOCI2W6N5RmWPXmpBed2RBDKI2sVFsOAVbF9++Bbxyo7GZkMuk9MKkZk=; ecs_token=eyJkYXRhIjoiNWVjMzc1MzNjZDhiYmJhZTEwYWQ1NDMzYjIyNDJkODc1YThhMjBiZmJjYWIwZDNhOTI4NTNkYTcwODBmZGRlYjVjNDY2MjRiYjE3NzU4ODAxZDQxMWMzNjAzYjY4NzNiNjU1NDc4ZTUzMjgwZjQzMjllNmY3YjNiNzU3YTk0ZjQ0ZmJiMzcyMmViMWQyMTFjN2MzYTc4NDc3OTk4MWZhYjhlNThhNTQxNmJiYTBmZTIwMTI5MjM0NDBmYzM1NDY1IiwidmVyc2lvbiI6IjAwIn0=; jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIxNzYwNzExMjg4NyIsInBybyI6IjA3MSIsImNpdHkiOiI3MTAiLCJpZCI6ImY2NTM1YjNiMjhmM2QxNTM3ZTA0N2JiMjJmYTk4ZWU5In0.TageOG22ykM8wDH_xjztez-hVqkbhMHVJZxQSBDjIas; SigninApp=405034ebd63240e35e36c1ba7f058d2645c0e0ed; route=6d9186e36a8fb76ad1842faabac61309; req_mobile=17607112887; req_serial=; req_wheel=ssss; clientid=71|710; WT_FPC=id=2d58673c1b3a48f7eab1598081970728:lv=1608985369717:ss=1608985211198; UID=sUV6LKFSQ08YArnj5R6SGNjkmv2DPUOk",
    "Connection": "keep-alive",
    "Content-Type": "application\/x-www-form-urlencoded",
    "Accept": "application\/json, text\/plain, *\/*",
    "Host": "act.10010.com",
    "User-Agent": "Mozilla\/5.0 (iPhone; CPU iPhone OS 14_1 like Mac OS X) AppleWebKit\/605.1.15 (KHTML, like Gecko) Mobile\/15E148 unicom{version:iphone_c@8.0200}{systemVersion:dis}{yw_code:}",
    "Referer": "https:\/\/img.client.10010.com\/SigininApp\/index.html",
    "Accept-Language": "zh-cn",
    //"Accept-Encoding": "gzip, deflate, br"
}


!(async () => {
    var aaa = await daySign();
    console.log(aaa);
    await $.wait(2000);
    var bbb = await finishVideo();
    console.log(bbb);
    await $.wait(2000);
    var ccc = await getPrize();
    console.log(ccc);

    if (!$.env.isNode) {
        $.notify('联通签到领取流量', JSON.parse(ccc).data.returnStr, '');
        $done();
    }

})()
    .catch((e) => {
        $.log('', `❌失败! 原因: ${e}!`, '')
    })
    .finally(() => {
        $.done();
    })

//每日签到    
async function daySign() {
    var option = {
        method: 'post',
        url: 'https://act.10010.com/SigninApp/signin/daySign',
        headers: headers
    };
    return new Promise(function (resolve) {
        $.http.post(option).then(response => {
            resolve(response.body);
        })
    })
}

//视频结束
async function finishVideo() {
    var option = {
        method: 'post',
        url: 'https://act.10010.com/SigninApp/doTask/finishVideo',
        headers: headers
    };
    return new Promise(function (resolve) {
        $.http.post(option).then(response => {
            resolve(response.body);
        })
    })
}

//领流量
async function getPrize() {
    var option = {
        method: 'post',
        url: 'https://act.10010.com/SigninApp/doTask/getPrize',
        headers: headers
    };
    return new Promise(function (resolve) {
        $.http.post(option).then(response => {
            resolve(response.body);
        })
    })
}

/*********************************** API *************************************/
function ENV() { const e = "undefined" != typeof $task, t = "undefined" != typeof $loon, s = "undefined" != typeof $httpClient && !t, i = "function" == typeof require && "undefined" != typeof $jsbox; return { isQX: e, isLoon: t, isSurge: s, isNode: "function" == typeof require && !i, isJSBox: i, isRequest: "undefined" != typeof $request, isScriptable: "undefined" != typeof importModule } } function HTTP(e = { baseURL: "" }) { const { isQX: t, isLoon: s, isSurge: i, isScriptable: n, isNode: o } = ENV(), r = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/; const u = {}; return ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS", "PATCH"].forEach(l => u[l.toLowerCase()] = (u => (function (u, l) { l = "string" == typeof l ? { url: l } : l; const h = e.baseURL; h && !r.test(l.url || "") && (l.url = h ? h + l.url : l.url); const a = (l = { ...e, ...l }).timeout, c = { onRequest: () => { }, onResponse: e => e, onTimeout: () => { }, ...l.events }; let f, d; if (c.onRequest(u, l), t) f = $task.fetch({ method: u, ...l }); else if (s || i || o) f = new Promise((e, t) => { (o ? require("request") : $httpClient)[u.toLowerCase()](l, (s, i, n) => { s ? t(s) : e({ statusCode: i.status || i.statusCode, headers: i.headers, body: n }) }) }); else if (n) { const e = new Request(l.url); e.method = u, e.headers = l.headers, e.body = l.body, f = new Promise((t, s) => { e.loadString().then(s => { t({ statusCode: e.response.statusCode, headers: e.response.headers, body: s }) }).catch(e => s(e)) }) } const p = a ? new Promise((e, t) => { d = setTimeout(() => (c.onTimeout(), t(`${u} URL: ${l.url} exceeds the timeout ${a} ms`)), a) }) : null; return (p ? Promise.race([p, f]).then(e => (clearTimeout(d), e)) : f).then(e => c.onResponse(e)) })(l, u))), u } function API(e = "untitled", t = !1) { const { isQX: s, isLoon: i, isSurge: n, isNode: o, isJSBox: r, isScriptable: u } = ENV(); return new class { constructor(e, t) { this.name = e, this.debug = t, this.http = HTTP(), this.env = ENV(), this.node = (() => { if (o) { return { fs: require("fs") } } return null })(), this.initCache(); Promise.prototype.delay = function (e) { return this.then(function (t) { return ((e, t) => new Promise(function (s) { setTimeout(s.bind(null, t), e) }))(e, t) }) } } initCache() { if (s && (this.cache = JSON.parse($prefs.valueForKey(this.name) || "{}")), (i || n) && (this.cache = JSON.parse($persistentStore.read(this.name) || "{}")), o) { let e = "root.json"; this.node.fs.existsSync(e) || this.node.fs.writeFileSync(e, JSON.stringify({}), { flag: "wx" }, e => console.log(e)), this.root = {}, e = `${this.name}.json`, this.node.fs.existsSync(e) ? this.cache = JSON.parse(this.node.fs.readFileSync(`${this.name}.json`)) : (this.node.fs.writeFileSync(e, JSON.stringify({}), { flag: "wx" }, e => console.log(e)), this.cache = {}) } } persistCache() { const e = JSON.stringify(this.cache, null, 2); s && $prefs.setValueForKey(e, this.name), (i || n) && $persistentStore.write(e, this.name), o && (this.node.fs.writeFileSync(`${this.name}.json`, e, { flag: "w" }, e => console.log(e)), this.node.fs.writeFileSync("root.json", JSON.stringify(this.root, null, 2), { flag: "w" }, e => console.log(e))) } write(e, t) { if (this.log(`SET ${t}`), -1 !== t.indexOf("#")) { if (t = t.substr(1), n || i) return $persistentStore.write(e, t); if (s) return $prefs.setValueForKey(e, t); o && (this.root[t] = e) } else this.cache[t] = e; this.persistCache() } read(e) { return this.log(`READ ${e}`), -1 === e.indexOf("#") ? this.cache[e] : (e = e.substr(1), n || i ? $persistentStore.read(e) : s ? $prefs.valueForKey(e) : o ? this.root[e] : void 0) } delete(e) { if (this.log(`DELETE ${e}`), -1 !== e.indexOf("#")) { if (e = e.substr(1), n || i) return $persistentStore.write(null, e); if (s) return $prefs.removeValueForKey(e); o && delete this.root[e] } else delete this.cache[e]; this.persistCache() } notify(e, t = "", l = "", h = {}) { const a = h["open-url"], c = h["media-url"]; if (s && $notify(e, t, l, h), n && $notification.post(e, t, l + `${c ? "\n多媒体:" + c : ""}`, { url: a }), i) { let s = {}; a && (s.openUrl = a), c && (s.mediaUrl = c), "{}" === JSON.stringify(s) ? $notification.post(e, t, l) : $notification.post(e, t, l, s) } if (o || u) { const s = l + (a ? `\n点击跳转: ${a}` : "") + (c ? `\n多媒体: ${c}` : ""); if (r) { require("push").schedule({ title: e, body: (t ? t + "\n" : "") + s }) } else console.log(`${e}\n${t}\n${s}\n\n`) } } log(e) { this.debug && console.log(`[${this.name}] LOG: ${this.stringify(e)}`) } info(e) { console.log(`[${this.name}] INFO: ${this.stringify(e)}`) } error(e) { console.log(`[${this.name}] ERROR: ${this.stringify(e)}`) } wait(e) { return new Promise(t => setTimeout(t, e)) } done(e = {}) { s || i || n ? $done(e) : o && !r && "undefined" != typeof $context && ($context.headers = e.headers, $context.statusCode = e.statusCode, $context.body = e.body) } stringify(e) { if ("string" == typeof e || e instanceof String) return e; try { return JSON.stringify(e, null, 2) } catch (e) { return "[object Object]" } } }(e, t) }
/*****************************************************************************/