
//重写添加成功后刷视频,等红包进度圈满后就会提示获取header成功,多获取几个header,最好获取五十个以上,多多益善
//获取多个header成功后再定时循环执行脚本任务,间隔时间最好在30s以上,每天稳定在10000音符左右
//且刷且珍惜,刷的别太嚣张,说不定过几天就封了
//如果需要在服务器上用nodejs运行则需要用boxjs把缓dyheadlist导出放到相同路径文件下下dyjs.json文件里

// [mitm]
// hostname = *.snssdk.com

//==========================Quantumultx=========================
// [task_local]
// */30 * * * * * https://gitee.com/passerby-b/javascript/raw/master/dyjs.js, tag=抖音极速版刷音符, enabled=true

// [rewrite_local]
// snssdk.com/luckycat/aweme/v1/task/done/read? url script-request-header https://gitee.com/passerby-b/javascript/raw/master/dyjs.js

// =========================Loon=============================
// [Script]
// snssdk.com/luckycat/aweme/v1/task/done/read? script-path=https://gitee.com/passerby-b/javascript/raw/master/dyjs.js, requires-body=true, timeout=10, tag=抖音极速版刷音符
// cron "*/30 * * * * *" script-path=https://gitee.com/passerby-b/javascript/raw/master/dyjs.js,tag=抖音极速版刷音符

var isShowCionDetail = false;//显示收益详情

const $ = API("dyjs");
!(async () => {
    if (typeof $request != "undefined") {
        console.log("\r\n抖音极速获取headers脚本开始!\r\n");
        var headers = $request.headers;
        var headlist = $.read("dyheadlist");
        $.write($request.url, "dyurl");
        if (!!headers) {
            if (!!headlist) {
                var list = JSON.parse(headlist);
                list.push(headers)
            } else {
                var list = [];
                list.push(headers)
            }
            $.notify("获取headers成功", "个数:" + list.length, "");
            $.write(JSON.stringify(list), "dyheadlist");
            console.log("" + JSON.stringify(list))
        }
        $.done();

    } else {
        console.log("\r\n*************【" + $.name + "】抖音极速刷视频脚本开始!************\r\n");
        var headlist = $.read("dyheadlist");
        var thishead = $.read("thishead");
        if (!!headlist && headlist != '[]') {
            var index = 0;
            var list = JSON.parse(headlist);
            if (!!thishead) {
                var isHas = false;
                for (var i = 0; i < list.length; i++) {
                    if (JSON.stringify(list[i]) == thishead) {
                        isHas = true;
                        if (list.length - 1 == i) {
                            $.write(JSON.stringify(list[0]), "thishead")
                        } else {
                            $.write(JSON.stringify(list[i + 1]), "thishead");
                            index = i + 1
                        }
                        break
                    }
                }
                if (!isHas) {
                    $.write(JSON.stringify(list[0]), "thishead");
                }
            } else {
                $.write(JSON.stringify(list[0]), "thishead");
            }
            console.log("\r\n【" + $.name + "】开始刷第" + index + "个headers,共" + list.length + "个headers\r\n");
            var myRequest = {
                url: $.read("dyurl"),
                headers: JSON.parse($.read("thishead")),
                body: '{\n  "in_sp_time" : 0,\n  "task_key" : "read"\n}'
            };
            delete myRequest.headers['Accept-Encoding'];
            await $.http.post(myRequest).then(async response => {
                var d = response.body;
                //console.log(d);
                if (d.indexOf("成功") > -1) {
                    var dataobj = JSON.parse(d);
                    console.log("\r\n【" + $.name + "】获得" + dataobj.data['score_amount'] + "个音符!\r\n")
                } else if (d.indexOf("10009") > -1) {
                    if (index == list.length - 1) {
                        $.write(JSON.stringify(list[0]), "thishead");
                    } else {
                        $.write(JSON.stringify(list[index + 1]), "thishead");
                    }
                    //list.splice(index, 1);

                    //$.write(JSON.stringify(list), "dyheadlist");

                    console.log("\r\n【" + $.name + "】删除此条header,还剩" + list.length + "个\r\n");
                } else {
                    console.log("\r\n【" + $.name + "】" + d + "\n");
                }
            })

            if (isShowCionDetail) {
                var headers2 = {
                    //'Accept-Encoding': 'gzip, deflate, br',
                    'x-Tt-Token': myRequest.headers['x-Tt-Token'],
                    'Host': 'api3-normal-lite-act-hl.amemv.com',
                    'passport-sdk-version': '5.12.1',
                    'Connection': 'keep-alive',
                    'X-SS-STUB': 'FB9613E49BC1669D908E1516EBF9F7B5',
                    'X-Tyhon': 'AyAC7z3/L9Ez3jPVGvh04SbbC9Rt6iT1ZvcxWRw=',
                    'User-Agent': 'AwemeLite 13.2.0 rv:132004 (iPhone; iOS 14.1; zh_CN) Cronet',
                    'Content-Type': 'application/json; encoding=utf-8',
                    'Accept-Language': 'en-us',
                    'Accept': 'application/json',
                    'sdk-version': '2',
                    'X-SS-DP': '2329'
                };
                var myRequest2 = {
                    url: 'https://aweme-hl.snssdk.com/luckycat/aweme/v1/task/page?' + $.read("dyurl").split('?')[1],
                    headers: headers2
                }
                await $.http.get(myRequest2).then(response2 => {
                    var d = JSON.parse(response2.body);
                    console.log("\r\n总音符:" + d.data.income_data.amount1 + "个!");
                    console.log("\r\n现金收益:" + Number(d.data.income_data.amount2) / 100 + "元!");
                    console.log("\r\n累计收益" + Number(d.data.income_data.amount2_total) / 100 + "元!\r\n");
                })
            }
        } else {
            $.notify("请先刷视频获取headers", "多多益善", "");
        }
    }

})().catch((e) => {
    console.log('', `❌失败! 原因: ${e}!`, '');
}).finally(() => {
    $.done();
})

/*********************************** API *************************************/
function ENV() { const e = "undefined" != typeof $task, t = "undefined" != typeof $loon, s = "undefined" != typeof $httpClient && !t, i = "function" == typeof require && "undefined" != typeof $jsbox; return { isQX: e, isLoon: t, isSurge: s, isNode: "function" == typeof require && !i, isJSBox: i, isRequest: "undefined" != typeof $request, isScriptable: "undefined" != typeof importModule } } function HTTP(e = { baseURL: "" }) { const { isQX: t, isLoon: s, isSurge: i, isScriptable: n, isNode: o } = ENV(), r = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/; const u = {}; return ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS", "PATCH"].forEach(l => u[l.toLowerCase()] = (u => (function (u, l) { l = "string" == typeof l ? { url: l } : l; const h = e.baseURL; h && !r.test(l.url || "") && (l.url = h ? h + l.url : l.url); const a = (l = { ...e, ...l }).timeout, c = { onRequest: () => { }, onResponse: e => e, onTimeout: () => { }, ...l.events }; let f, d; if (c.onRequest(u, l), t) f = $task.fetch({ method: u, ...l }); else if (s || i || o) f = new Promise((e, t) => { (o ? require("request") : $httpClient)[u.toLowerCase()](l, (s, i, n) => { s ? t(s) : e({ statusCode: i.status || i.statusCode, headers: i.headers, body: n }) }) }); else if (n) { const e = new Request(l.url); e.method = u, e.headers = l.headers, e.body = l.body, f = new Promise((t, s) => { e.loadString().then(s => { t({ statusCode: e.response.statusCode, headers: e.response.headers, body: s }) }).catch(e => s(e)) }) } const p = a ? new Promise((e, t) => { d = setTimeout(() => (c.onTimeout(), t(`${u} URL: ${l.url} exceeds the timeout ${a} ms`)), a) }) : null; return (p ? Promise.race([p, f]).then(e => (clearTimeout(d), e)) : f).then(e => c.onResponse(e)) })(l, u))), u } function API(e = "untitled", t = !1) { const { isQX: s, isLoon: i, isSurge: n, isNode: o, isJSBox: r, isScriptable: u } = ENV(); return new class { constructor(e, t) { this.name = e, this.debug = t, this.http = HTTP(), this.env = ENV(), this.node = (() => { if (o) { return { fs: require("fs") } } return null })(), this.initCache(); Promise.prototype.delay = function (e) { return this.then(function (t) { return ((e, t) => new Promise(function (s) { setTimeout(s.bind(null, t), e) }))(e, t) }) } } initCache() { if (s && (this.cache = JSON.parse($prefs.valueForKey(this.name) || "{}")), (i || n) && (this.cache = JSON.parse($persistentStore.read(this.name) || "{}")), o) { let e = "root.json"; this.node.fs.existsSync(e) || this.node.fs.writeFileSync(e, JSON.stringify({}), { flag: "wx" }, e => console.log(e)), this.root = {}, e = `${this.name}.json`, this.node.fs.existsSync(e) ? this.cache = JSON.parse(this.node.fs.readFileSync(`${this.name}.json`)) : (this.node.fs.writeFileSync(e, JSON.stringify({}), { flag: "wx" }, e => console.log(e)), this.cache = {}) } } persistCache() { const e = JSON.stringify(this.cache, null, 2); s && $prefs.setValueForKey(e, this.name), (i || n) && $persistentStore.write(e, this.name), o && (this.node.fs.writeFileSync(`${this.name}.json`, e, { flag: "w" }, e => console.log(e)), this.node.fs.writeFileSync("root.json", JSON.stringify(this.root, null, 2), { flag: "w" }, e => console.log(e))) } write(e, t) { if (this.log(`SET ${t}`), -1 !== t.indexOf("#")) { if (t = t.substr(1), n || i) return $persistentStore.write(e, t); if (s) return $prefs.setValueForKey(e, t); o && (this.root[t] = e) } else this.cache[t] = e; this.persistCache() } read(e) { return this.log(`READ ${e}`), -1 === e.indexOf("#") ? this.cache[e] : (e = e.substr(1), n || i ? $persistentStore.read(e) : s ? $prefs.valueForKey(e) : o ? this.root[e] : void 0) } delete(e) { if (this.log(`DELETE ${e}`), -1 !== e.indexOf("#")) { if (e = e.substr(1), n || i) return $persistentStore.write(null, e); if (s) return $prefs.removeValueForKey(e); o && delete this.root[e] } else delete this.cache[e]; this.persistCache() } notify(e, t = "", l = "", h = {}) { const a = h["open-url"], c = h["media-url"]; if (s && $notify(e, t, l, h), n && $notification.post(e, t, l + `${c ? "\n多媒体:" + c : ""}`, { url: a }), i) { let s = {}; a && (s.openUrl = a), c && (s.mediaUrl = c), "{}" === JSON.stringify(s) ? $notification.post(e, t, l) : $notification.post(e, t, l, s) } if (o || u) { const s = l + (a ? `\n点击跳转: ${a}` : "") + (c ? `\n多媒体: ${c}` : ""); if (r) { require("push").schedule({ title: e, body: (t ? t + "\n" : "") + s }) } else console.log(`${e}\n${t}\n${s}\n\n`) } } log(e) { this.debug && console.log(`[${this.name}] LOG: ${this.stringify(e)}`) } info(e) { console.log(`[${this.name}] INFO: ${this.stringify(e)}`) } error(e) { console.log(`[${this.name}] ERROR: ${this.stringify(e)}`) } wait(e) { return new Promise(t => setTimeout(t, e)) } done(e = {}) { console.log('done!'); s || i || n ? $done(e) : o && !r && "undefined" != typeof $context && ($context.headers = e.headers, $context.statusCode = e.statusCode, $context.body = e.body) } stringify(e) { if ("string" == typeof e || e instanceof String) return e; try { return JSON.stringify(e, null, 2) } catch (e) { return "[object Object]" } } }(e, t) }
/*****************************************************************************/


