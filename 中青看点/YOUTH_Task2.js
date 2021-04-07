const $ = new API("中青看点任务");
var cookies = require('./YOUTH_Cookie.js');

!(async () => {

    for (let index = 0; index < cookies.length; index++) {
        console.log('\r\n*********开始执行第' + (index + 1) + '个账号******\r\n');
        var cookie = cookies[index];

        var url = 'https://kd.youth.cn:443/WebApi/NewTaskIos/sendTwentyScore?action=read_article_video_reward_five&' + cookie;
        var headers = {
            "Accept-Encoding": "gzip, deflate, br",
            "Connection": "keep-alive",
            "Content-Type": "",
            "Accept": "*\/*",
            "Host": "kd.youth.cn",
            "User-Agent": "Mozilla\/5.0 (iPhone; CPU iPhone OS 14_1 like Mac OS X) AppleWebKit\/605.1.15 (KHTML, like Gecko) Mobile\/15E148",
            "Accept-Language": "zh-cn",
            "X-Requested-With": "XMLHttpRequest"
        };
        var body = ``;

        var myRequest = {
            url: url,
            headers: headers,
            body: body
        };

        //阅读5篇新闻奖励
        $.http.get(myRequest).then(response => {
            console.log('【阅读5篇新闻奖励】:' + unescape(response.body.replace(/\\/g, "%")));
        })

        await $.wait(1000);

        //阅读20篇新闻奖励
        myRequest.url = myRequest.url.replace('read_article_video_reward_five', 'watch_article_reward');
        $.http.get(myRequest).then(response => {
            console.log('【阅读20篇新闻奖励】:' + unescape(response.body.replace(/\\/g, "%")));
        })

        await $.wait(1000);

        //看20个视频奖励
        myRequest.url = myRequest.url.replace('watch_article_reward', 'watch_video_reward');
        $.http.get(myRequest).then(response => {
            console.log('【看20个视频奖励】:' + unescape(response.body.replace(/\\/g, "%")));
        })

        await $.wait(1000);

        //看5次福利视频
        await watch5Videos(cookie);

        await $.wait(1000);

        //看5次福利视频奖励
        myRequest.url = myRequest.url.replace('watch_video_reward', 'new_fresh_five_video_reward');
        $.http.get(myRequest).then(response => {
            console.log('【看5次福利视频奖励】:' + unescape(response.body.replace(/\\/g, "%")));
        })

        await $.wait(1000);

        //签到
        myRequest.url = 'https://kd.youth.cn/WebApi/NewTaskIos/sign?is_install_tb=false&request_time=1617725041' + cookie;
        $.http.get(myRequest).then(response => {
            console.log('【每日签到】:' + unescape(response.body.replace(/\\/g, "%")));
        })

        await $.wait(1000);

        //打卡赚钱
        myRequest.url = 'https://kd.youth.cn/WebApi/PunchCard/doCard?' + cookie;
        myRequest.headers.Referer = "https://kd.youth.cn/h5/20190603cardactive/?" + cookie;
        $.http.post(myRequest).then(response => {
            console.log('【打卡赚钱】:' + unescape(response.body.replace(/\\/g, "%")));
        })

        await $.wait(1000);

        //打卡赚钱报名
        myRequest.url = 'https://kd.youth.cn:443/WebApi/PunchCard/signUp?' + cookie;
        myRequest.headers.Referer = "https://kd.youth.cn/h5/20190603cardactive/?" + cookie;
        $.http.post(myRequest).then(response => {
            console.log('【打卡赚钱报名】:' + unescape(response.body.replace(/\\/g, "%")));
        })

        await $.wait(1000);
    }


})().catch((e) => {
    console.log('', `❌失败! 原因: ${e}!`, '');
}).finally(() => {
    $.done();
})

//看5次福利视频
async function watch5Videos(cookie) {
    return new Promise(async resolve => {
        var myRequest2 = {
            url: 'https://kd.youth.cn/WebApi/NewTaskIos/recordNum?action=new_fresh_five_video_reward&' + cookie,
            headers: {
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive",
                "Content-Type": "",
                "Accept": "*\/*",
                "Host": "kd.youth.cn",
                "User-Agent": "Mozilla\/5.0 (iPhone; CPU iPhone OS 14_1 like Mac OS X) AppleWebKit\/605.1.15 (KHTML, like Gecko) Mobile\/15E148",
                "Referer": "https:\/\/kd.youth.cn\/h5\/20190301taskcenter\/ios\/index.html?" + cookie,
                "Accept-Language": "zh-cn",
                "X-Requested-With": "XMLHttpRequest"
            }
        };

        for (let index = 0; index < 5; index++) {
            $.http.get(myRequest2).then(response => {
                console.log('【开始看第' + (index + 1) + '个福利视频】:' + unescape(response.body.replace(/\\/g, "%")));
            })
            await $.wait(1000);

        }
        resolve();
    })
}

/*********************************** API *************************************/
function ENV() { const e = "undefined" != typeof $task, t = "undefined" != typeof $loon, s = "undefined" != typeof $httpClient && !t, i = "function" == typeof require && "undefined" != typeof $jsbox; return { isQX: e, isLoon: t, isSurge: s, isNode: "function" == typeof require && !i, isJSBox: i, isRequest: "undefined" != typeof $request, isScriptable: "undefined" != typeof importModule } } function HTTP(e = { baseURL: "" }) { const { isQX: t, isLoon: s, isSurge: i, isScriptable: n, isNode: o } = ENV(), r = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/; const u = {}; return ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS", "PATCH"].forEach(l => u[l.toLowerCase()] = (u => (function (u, l) { l = "string" == typeof l ? { url: l } : l; const h = e.baseURL; h && !r.test(l.url || "") && (l.url = h ? h + l.url : l.url); const a = (l = { ...e, ...l }).timeout, c = { onRequest: () => { }, onResponse: e => e, onTimeout: () => { }, ...l.events }; let f, d; if (c.onRequest(u, l), t) f = $task.fetch({ method: u, ...l }); else if (s || i || o) f = new Promise((e, t) => { (o ? require("request") : $httpClient)[u.toLowerCase()](l, (s, i, n) => { s ? t(s) : e({ statusCode: i.status || i.statusCode, headers: i.headers, body: n }) }) }); else if (n) { const e = new Request(l.url); e.method = u, e.headers = l.headers, e.body = l.body, f = new Promise((t, s) => { e.loadString().then(s => { t({ statusCode: e.response.statusCode, headers: e.response.headers, body: s }) }).catch(e => s(e)) }) } const p = a ? new Promise((e, t) => { d = setTimeout(() => (c.onTimeout(), t(`${u} URL: ${l.url} exceeds the timeout ${a} ms`)), a) }) : null; return (p ? Promise.race([p, f]).then(e => (clearTimeout(d), e)) : f).then(e => c.onResponse(e)) })(l, u))), u } function API(e = "untitled", t = !1) { const { isQX: s, isLoon: i, isSurge: n, isNode: o, isJSBox: r, isScriptable: u } = ENV(); return new class { constructor(e, t) { this.name = e, this.debug = t, this.http = HTTP(), this.env = ENV(), this.node = (() => { if (o) { return { fs: require("fs") } } return null })(), this.initCache(); Promise.prototype.delay = function (e) { return this.then(function (t) { return ((e, t) => new Promise(function (s) { setTimeout(s.bind(null, t), e) }))(e, t) }) } } initCache() { if (s && (this.cache = JSON.parse($prefs.valueForKey(this.name) || "{}")), (i || n) && (this.cache = JSON.parse($persistentStore.read(this.name) || "{}")), o) { let e = "root.json"; this.node.fs.existsSync(e) || this.node.fs.writeFileSync(e, JSON.stringify({}), { flag: "wx" }, e => console.log(e)), this.root = {}, e = `${this.name}.json`, this.node.fs.existsSync(e) ? this.cache = JSON.parse(this.node.fs.readFileSync(`${this.name}.json`)) : (this.node.fs.writeFileSync(e, JSON.stringify({}), { flag: "wx" }, e => console.log(e)), this.cache = {}) } } persistCache() { const e = JSON.stringify(this.cache, null, 2); s && $prefs.setValueForKey(e, this.name), (i || n) && $persistentStore.write(e, this.name), o && (this.node.fs.writeFileSync(`${this.name}.json`, e, { flag: "w" }, e => console.log(e)), this.node.fs.writeFileSync("root.json", JSON.stringify(this.root, null, 2), { flag: "w" }, e => console.log(e))) } write(e, t) { if (this.log(`SET ${t}`), -1 !== t.indexOf("#")) { if (t = t.substr(1), n || i) return $persistentStore.write(e, t); if (s) return $prefs.setValueForKey(e, t); o && (this.root[t] = e) } else this.cache[t] = e; this.persistCache() } read(e) { return this.log(`READ ${e}`), -1 === e.indexOf("#") ? this.cache[e] : (e = e.substr(1), n || i ? $persistentStore.read(e) : s ? $prefs.valueForKey(e) : o ? this.root[e] : void 0) } delete(e) { if (this.log(`DELETE ${e}`), -1 !== e.indexOf("#")) { if (e = e.substr(1), n || i) return $persistentStore.write(null, e); if (s) return $prefs.removeValueForKey(e); o && delete this.root[e] } else delete this.cache[e]; this.persistCache() } notify(e, t = "", l = "", h = {}) { const a = h["open-url"], c = h["media-url"]; if (s && $notify(e, t, l, h), n && $notification.post(e, t, l + `${c ? "\n多媒体:" + c : ""}`, { url: a }), i) { let s = {}; a && (s.openUrl = a), c && (s.mediaUrl = c), "{}" === JSON.stringify(s) ? $notification.post(e, t, l) : $notification.post(e, t, l, s) } if (o || u) { const s = l + (a ? `\n点击跳转: ${a}` : "") + (c ? `\n多媒体: ${c}` : ""); if (r) { require("push").schedule({ title: e, body: (t ? t + "\n" : "") + s }) } else console.log(`${e}\n${t}\n${s}\n\n`) } } log(e) { this.debug && console.log(`[${this.name}] LOG: ${this.stringify(e)}`) } info(e) { console.log(`[${this.name}] INFO: ${this.stringify(e)}`) } error(e) { console.log(`[${this.name}] ERROR: ${this.stringify(e)}`) } wait(e) { return new Promise(t => setTimeout(t, e)) } done(e = {}) { console.log('done!'); s || i || n ? $done(e) : o && !r && "undefined" != typeof $context && ($context.headers = e.headers, $context.statusCode = e.statusCode, $context.body = e.body) } stringify(e) { if ("string" == typeof e || e instanceof String) return e; try { return JSON.stringify(e, null, 2) } catch (e) { return "[object Object]" } } }(e, t) }
/*****************************************************************************/