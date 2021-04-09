

var CookieJDs = ['',''];//多账号cookiet填写

const $ = new API();
if ($.env.isNode) CookieJDs = require('./jdCookie.js').CookieJDs;
!(async () => {

    for (let i = 0; i < CookieJDs.length; i++) {
        let nickname = await getUserInfo(CookieJDs[i]);
        await wait4Delivery(CookieJDs[i], nickname);
    }
})()
    .catch((e) => {
        $.info('', `❌ ${$.name}, 失败! 原因: ${e}!`, '');
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '');
    })
    .finally(() => {
        $.done();
    })

async function wait4Delivery(cookie, nickname) {
    return new Promise(resolve => {
        let options = {
            url: 'https://api.m.jd.com/client.action?functionId=wait4Delivery',
            headers: {
                "Cookie": cookie,
                "Accept": "*/*",
                "Connection": "keep-alive",
                "Content-Type": "application/x-www-form-urlencoded",
                //"Accept-Encoding":"gzip, deflate, br",
                "Host": "api.m.jd.com",
                "User-Agent": "JD4iPhone/167588 (iPhone; iOS 14.1; Scale/3.00)",
                "Content-Length": "967",
                "Accept-Language": "zh-Hans-CN;q=1, en-CN;q=0.9"
            },
            body: 'area=17_1381_3079_50776&body=%7B%22newUiSwitch%22%3A%221%22%2C%22deis%22%3A%22dy%22%2C%22dateTimeIndex%22%3A%22%22%2C%22pass%22%3A%22%22%2C%22pagesize%22%3A%2210%22%2C%22page%22%3A%221%22%7D&build=167588&client=apple&clientVersion=9.4.4&d_brand=apple&d_model=iPhone11%2C6&eid=eidI3A740111RTI2MjAyRTAtNjMxOC00Rg%3D%3DS383seL61Kq8IRd1wsJ1jmQZxCvjQ5jy5C5qG/7luhyvqmrkir%2Bbs0zK4OE/%2Bg56nSlNx7xkOsxELNC0&isBackground=N&joycious=4&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=5589835845d694f665675375218de18b46c6ad27&osVersion=14.1&partner=apple&rfs=0000&scope=11&screen=1242%2A2688&sign=22c3d8257cd8288918a87ba884cafecd&st=1616552354789&sv=122&uts=0f31TVRjBSsqndu4/jgUPz6uymy50MQJ6xzM6leehkg71dvzbpcFqnebbSIoQiz7xSbHdrfU18tKx2lDWPoffND6lgAMChL0pTTY2qkk12qHruzKZFF1Q2F8FwHpYHwH1PEfDcfHQfMXW898hk9U%2B2aZ3TQTdLgCmeAsiIt5ai4qXPr3A5BEtbqwVEfhmI5SiPmJg9ZLCauvS5tZHwqECA%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D&wifiBssid=3d6e696f46a52bb20ed0de232f820824'
        };

        $.http.post(options).then(response => {
            try {
                //console.log(response.body);
                var data = JSON.parse(response.body);
                for (let index = 0; index < data.orderList.length; index++) {
                    const element = data.orderList[index];
                    var str = nickname + ':★ ' + element.orderMsg.wareInfoList[0].wname + '★ -->>' + element.message + '\r\n';
                    console.log(str);
                }
                resolve();
            } catch (error) {
                console.log(error);
                resolve();
            }
        })
    })

}

async function getUserInfo(cookie) {
    return new Promise(resolve => {
        let options = {
            url: `https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2`,
            headers: {
                "Accept": "application/json,text/plain, */*",
                "Content-Type": "application/x-www-form-urlencoded",
                //"Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "zh-cn",
                "Connection": "keep-alive",
                "Cookie": cookie,
                "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1"
            }
        }
        $.http.get(options).then(function (response) {
            //console.log(response.body);
            var data = JSON.parse(response.body);
            try {
                if (data['retcode'] === 0) {
                    resolve(data.base.nickname);
                }
                else {
                    var arr = cookie.replace(/ /g, '').split(';');
                    var theRequest = new Object();
                    for (var i = 0; i < arr.length; i++) {
                        var kye = arr[i].split("=")[0];
                        var value = arr[i].split("=")[1];
                        theRequest[kye] = value;
                    }
                    resolve(theRequest['pt_pin']);
                }

            } catch (error) {
                resolve();
            }
        })
    })

}

/*********************************** API *************************************/
function ENV() { const e = "undefined" != typeof $task, t = "undefined" != typeof $loon, s = "undefined" != typeof $httpClient && !t, i = "function" == typeof require && "undefined" != typeof $jsbox; return { isQX: e, isLoon: t, isSurge: s, isNode: "function" == typeof require && !i, isJSBox: i, isRequest: "undefined" != typeof $request, isScriptable: "undefined" != typeof importModule } } function HTTP(e = { baseURL: "" }) { const { isQX: t, isLoon: s, isSurge: i, isScriptable: n, isNode: o } = ENV(), r = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/; const u = {}; return ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS", "PATCH"].forEach(l => u[l.toLowerCase()] = (u => (function (u, l) { l = "string" == typeof l ? { url: l } : l; const h = e.baseURL; h && !r.test(l.url || "") && (l.url = h ? h + l.url : l.url); const a = (l = { ...e, ...l }).timeout, c = { onRequest: () => { }, onResponse: e => e, onTimeout: () => { }, ...l.events }; let f, d; if (c.onRequest(u, l), t) f = $task.fetch({ method: u, ...l }); else if (s || i || o) f = new Promise((e, t) => { (o ? require("request") : $httpClient)[u.toLowerCase()](l, (s, i, n) => { s ? t(s) : e({ statusCode: i.status || i.statusCode, headers: i.headers, body: n }) }) }); else if (n) { const e = new Request(l.url); e.method = u, e.headers = l.headers, e.body = l.body, f = new Promise((t, s) => { e.loadString().then(s => { t({ statusCode: e.response.statusCode, headers: e.response.headers, body: s }) }).catch(e => s(e)) }) } const p = a ? new Promise((e, t) => { d = setTimeout(() => (c.onTimeout(), t(`${u} URL: ${l.url} exceeds the timeout ${a} ms`)), a) }) : null; return (p ? Promise.race([p, f]).then(e => (clearTimeout(d), e)) : f).then(e => c.onResponse(e)) })(l, u))), u } function API(e = "untitled", t = !1) { const { isQX: s, isLoon: i, isSurge: n, isNode: o, isJSBox: r, isScriptable: u } = ENV(); return new class { constructor(e, t) { this.name = e, this.debug = t, this.http = HTTP(), this.env = ENV(), this.node = (() => { if (o) { return { fs: require("fs") } } return null })(), this.initCache(); Promise.prototype.delay = function (e) { return this.then(function (t) { return ((e, t) => new Promise(function (s) { setTimeout(s.bind(null, t), e) }))(e, t) }) } } initCache() { if (s && (this.cache = JSON.parse($prefs.valueForKey(this.name) || "{}")), (i || n) && (this.cache = JSON.parse($persistentStore.read(this.name) || "{}")), o) { let e = "root.json"; this.node.fs.existsSync(e) || this.node.fs.writeFileSync(e, JSON.stringify({}), { flag: "wx" }, e => console.log(e)), this.root = {}, e = `${this.name}.json`, this.node.fs.existsSync(e) ? this.cache = JSON.parse(this.node.fs.readFileSync(`${this.name}.json`)) : (this.node.fs.writeFileSync(e, JSON.stringify({}), { flag: "wx" }, e => console.log(e)), this.cache = {}) } } persistCache() { const e = JSON.stringify(this.cache, null, 2); s && $prefs.setValueForKey(e, this.name), (i || n) && $persistentStore.write(e, this.name), o && (this.node.fs.writeFileSync(`${this.name}.json`, e, { flag: "w" }, e => console.log(e)), this.node.fs.writeFileSync("root.json", JSON.stringify(this.root, null, 2), { flag: "w" }, e => console.log(e))) } write(e, t) { if (this.log(`SET ${t}`), -1 !== t.indexOf("#")) { if (t = t.substr(1), n || i) return $persistentStore.write(e, t); if (s) return $prefs.setValueForKey(e, t); o && (this.root[t] = e) } else this.cache[t] = e; this.persistCache() } read(e) { return this.log(`READ ${e}`), -1 === e.indexOf("#") ? this.cache[e] : (e = e.substr(1), n || i ? $persistentStore.read(e) : s ? $prefs.valueForKey(e) : o ? this.root[e] : void 0) } delete(e) { if (this.log(`DELETE ${e}`), -1 !== e.indexOf("#")) { if (e = e.substr(1), n || i) return $persistentStore.write(null, e); if (s) return $prefs.removeValueForKey(e); o && delete this.root[e] } else delete this.cache[e]; this.persistCache() } notify(e, t = "", l = "", h = {}) { const a = h["open-url"], c = h["media-url"]; if (s && $notify(e, t, l, h), n && $notification.post(e, t, l + `${c ? "\n多媒体:" + c : ""}`, { url: a }), i) { let s = {}; a && (s.openUrl = a), c && (s.mediaUrl = c), "{}" === JSON.stringify(s) ? $notification.post(e, t, l) : $notification.post(e, t, l, s) } if (o || u) { const s = l + (a ? `\n点击跳转: ${a}` : "") + (c ? `\n多媒体: ${c}` : ""); if (r) { require("push").schedule({ title: e, body: (t ? t + "\n" : "") + s }) } else console.log(`${e}\n${t}\n${s}\n\n`) } } log(e) { this.debug && console.log(`[${this.name}] LOG: ${this.stringify(e)}`) } info(e) { console.log(`[${this.name}] INFO: ${this.stringify(e)}`) } error(e) { console.log(`[${this.name}] ERROR: ${this.stringify(e)}`) } wait(e) { return new Promise(t => setTimeout(t, e)) } done(e = {}) { s || i || n ? $done(e) : o && !r && "undefined" != typeof $context && ($context.headers = e.headers, $context.statusCode = e.statusCode, $context.body = e.body) } stringify(e) { if ("string" == typeof e || e instanceof String) return e; try { return JSON.stringify(e, null, 2) } catch (e) { return "[object Object]" } } }(e, t) }
/*****************************************************************************/

