//联通每日签到领取1G流量,支持nodejs,quantumultx,loon,surge,shadowrocket,jsbox

const $ = API("联通领1G");

var cookie = '';//cookie填写此处
var headers = {
    "Origin": "https:\/\/img.client.10010.com",
    "Cookie": cookie,
    "Connection": "keep-alive",
    "Content-Type": "application\/x-www-form-urlencoded",
    "Accept": "application\/json, text\/plain, *\/*",
    "Host": "act.10010.com",
    "User-Agent": "Mozilla\/5.0 (iPhone; CPU iPhone OS 14_1 like Mac OS X) AppleWebKit\/605.1.15 (KHTML, like Gecko) Mobile\/15E148 unicom{version:iphone_c@8.0200}{systemVersion:dis}{yw_code:}",
    "Referer": "https:\/\/img.client.10010.com\/SigininApp\/index.html",
    "Accept-Language": "zh-cn"
}

var myDate = new Date();
var month = (myDate.getMonth() + 1) < 10 ? '0' + (myDate.getMonth() + 1) : (myDate.getMonth() + 1);
var date = myDate.getFullYear() + '-' + month + '-' + myDate.getDate() + ' ' + myDate.getHours() + ':' + myDate.getMinutes() + ':' + myDate.getSeconds();
let mobileNum = '13412345678';
!(async () => {
    let aaa = await finishVideo();
    console.log('视频:' + aaa + '\r\n');
    if (aaa.indexOf('没有登录') > -1) {
        if (!$.env.isNode) $.notify('cookie失效', JSON.parse(aaa).msg, '');
        $.done();
        return 0;
    }

    await $.wait(1000);
    let bbb = await daySign();
    console.log('签到:' + bbb + '\r\n');

    await $.wait(1000);
    let ccc = await getPrize();
    console.log('领流量:' + ccc + '\r\n');

    if (!$.env.isNode) $.notify('联通签到领取流量', JSON.parse(ccc).data.returnStr, '');

    await $.wait(1000);
    await mygiftbag();

})()
    .catch((e) => {
        $.log('', `❌失败! 原因: ${e}!`, '');
    })
    .finally(() => {
        $.done();
    })

//视频结束
async function finishVideo() {
    var option = {
        url: 'https://act.10010.com/SigninApp/doTask/finishVideo',
        headers: headers
    };
    return new Promise((resolve) => {
        $.http.post(option).then(response => {
            resolve(response.body);
        })
    })
}

//每日签到    
async function daySign() {
    var option = {
        url: 'https://act.10010.com/SigninApp/signin/daySign',
        headers: headers
    };
    return new Promise((resolve) => {
        $.http.post(option).then(response => {
            resolve(response.body);
        })
    })
}

//领流量
async function getPrize() {
    var option = {
        url: 'https://act.10010.com/SigninApp/doTask/getPrize',
        headers: headers
    };
    return new Promise((resolve) => {
        $.http.post(option).then(response => {
            resolve(response.body);
        })
    })
}

//查询流量礼包
async function mygiftbag() {
    return new Promise(resolve => {
        try {
            var option = {
                url: 'https://m.client.10010.com:443/myPrizeForActivity/mygiftbag.htm',
                headers: {
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                    "Origin": "https://m.client.10010.com",
                    //"Accept-Encoding": "gzip, deflate, br",
                    "Cookie": headers['Cookie'],
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Host": "m.client.10010.com",
                    "Connection": "keep-alive",
                    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 unicom{version:iphone_c@8.0200}{systemVersion:dis}{yw_code:}",
                    "Referer": "https://m.client.10010.com/myPrizeForActivity/querywinninglist.htm?version=iphone_c@8.0200&amp;desmobile=17607112887&amp;yw_code=&amp;time=1615863151",
                    "Content-Length": "142",
                    "Accept-Language": "zh-cn"
                },
                body: 'typeScreenCondition=2&category=FFLOWPACKET&pageSign=1&CALLBACKURL=https%3A%2F%2Fm.client.10010.com%2FmyPrizeForActivity%2Fquerywinninglist.htm'
            };

            $.http.post(option).then(async response => {
                var data = response.body;

                //******解析HTML信息***********
                var s = data.indexOf('id="prizeRecord"');
                var e = data.indexOf('class="tanceng"');
                data = data.substring(s + 100, e);
                data = data.replace(/\t/g, " ").replace(/\r/g, " ").replace(/\n/g, " ").replace(/<!--(\s|\w+)*-->/g, ' ');

                var giftlist = [];
                var list = data.split('<a href="javascript:void(0)"');
                for (let index = 0; index < list.length; index++) {
                    const element = list[index];
                    if (element.indexOf('<p class="activeBt">待激活＞＞</p>') > -1) {
                        var s2 = element.indexOf('toDetailPage(') + 13;
                        var e2 = element.indexOf(',\'' + mobileNum + '\'');

                        var str2 = element.substring(s2, e2);
                        if (!!str2.replace(/ /g, '')) {
                            var s3 = element.indexOf('&nbsp;-&nbsp;') + 13;
                            var e3 = s3 + 19;
                            var str3 = element.substring(s3, e3);
                            var o = '' + str2.replace(/'/g, '') + ',' + str3;
                            giftlist.push(o);
                        }
                    }
                }
                //******解析HTML信息***********

                //console.log(retlist);
                for (let index = 0; index < Object.keys(giftlist).length; index++) {
                    const gift = giftlist[index];
                    console.log('待激活礼包:' + gift);
                    var thisgift = gift.split(',');
                    if (thisgift[2].split(' ')[0] == myDate.getFullYear() + '-' + month + '-' + myDate.getDate()) {
                        console.log('开始激活:' + thisgift[2] + " 到期的礼包");
                        await activegift(thisgift[0], thisgift[1]);
                        //await activegift(1111, 2222);
                        break;
                    }
                }
                resolve();
            })
        } catch (error) {
            resolve(error);
        }

    })
}

//激活当天过期的流量礼包
async function activegift(code, recordid) {
    return new Promise(resolve => {
        try {
            var option = {
                url: 'https://m.client.10010.com/myPrizeForActivity/myPrize/activationFlowPackages.htm',
                headers: {
                    //"Accept-Encoding":"gzip, deflate, br",
                    "Origin": "https://m.client.10010.com",
                    "Connection": "keep-alive",
                    "Cookie": headers['Cookie'],
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "Host": "m.client.10010.com",
                    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 unicom{version:iphone_c@8.0200}{systemVersion:dis}{yw_code:}",
                    "Referer": "https://m.client.10010.com/myPrizeForActivity/queryPrizeDetails.htm",
                    "Accept-Language": "zh-cn",
                    "X-Requested-With": "XMLHttpRequest",
                    "Accept": "application/json, text/javascript, */*; q=0.01"
                },
                body: 'activeCode=' + code + '&prizeRecordID=' + recordid + '&activeName=%E5%81%9A%E4%BB%BB%E5%8A%A1%E9%A2%86%E5%A5%96%E5%93%81'
            };

            $.http.post(option).then(response => {
                console.log(response.body);
                $.notify('联通', '激活流量礼包', response.body);
                resolve(response.body);
            })
        } catch (error) {
            resolve();
        }

    })
}

/*********************************** API *************************************/
function ENV() { const e = "undefined" != typeof $task, t = "undefined" != typeof $loon, s = "undefined" != typeof $httpClient && !t, i = "function" == typeof require && "undefined" != typeof $jsbox; return { isQX: e, isLoon: t, isSurge: s, isNode: "function" == typeof require && !i, isJSBox: i, isRequest: "undefined" != typeof $request, isScriptable: "undefined" != typeof importModule } } function HTTP(e = { baseURL: "" }) { const { isQX: t, isLoon: s, isSurge: i, isScriptable: n, isNode: o } = ENV(), r = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/; const u = {}; return ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS", "PATCH"].forEach(l => u[l.toLowerCase()] = (u => (function (u, l) { l = "string" == typeof l ? { url: l } : l; const h = e.baseURL; h && !r.test(l.url || "") && (l.url = h ? h + l.url : l.url); const a = (l = { ...e, ...l }).timeout, c = { onRequest: () => { }, onResponse: e => e, onTimeout: () => { }, ...l.events }; let f, d; if (c.onRequest(u, l), t) f = $task.fetch({ method: u, ...l }); else if (s || i || o) f = new Promise((e, t) => { (o ? require("request") : $httpClient)[u.toLowerCase()](l, (s, i, n) => { s ? t(s) : e({ statusCode: i.status || i.statusCode, headers: i.headers, body: n }) }) }); else if (n) { const e = new Request(l.url); e.method = u, e.headers = l.headers, e.body = l.body, f = new Promise((t, s) => { e.loadString().then(s => { t({ statusCode: e.response.statusCode, headers: e.response.headers, body: s }) }).catch(e => s(e)) }) } const p = a ? new Promise((e, t) => { d = setTimeout(() => (c.onTimeout(), t(`${u} URL: ${l.url} exceeds the timeout ${a} ms`)), a) }) : null; return (p ? Promise.race([p, f]).then(e => (clearTimeout(d), e)) : f).then(e => c.onResponse(e)) })(l, u))), u } function API(e = "untitled", t = !1) { const { isQX: s, isLoon: i, isSurge: n, isNode: o, isJSBox: r, isScriptable: u } = ENV(); return new class { constructor(e, t) { this.name = e, this.debug = t, this.http = HTTP(), this.env = ENV(), this.node = (() => { if (o) { return { fs: require("fs") } } return null })(), this.initCache(); Promise.prototype.delay = function (e) { return this.then(function (t) { return ((e, t) => new Promise(function (s) { setTimeout(s.bind(null, t), e) }))(e, t) }) } } initCache() { if (s && (this.cache = JSON.parse($prefs.valueForKey(this.name) || "{}")), (i || n) && (this.cache = JSON.parse($persistentStore.read(this.name) || "{}")), o) { let e = "root.json"; this.node.fs.existsSync(e) || this.node.fs.writeFileSync(e, JSON.stringify({}), { flag: "wx" }, e => console.log(e)), this.root = {}, e = `${this.name}.json`, this.node.fs.existsSync(e) ? this.cache = JSON.parse(this.node.fs.readFileSync(`${this.name}.json`)) : (this.node.fs.writeFileSync(e, JSON.stringify({}), { flag: "wx" }, e => console.log(e)), this.cache = {}) } } persistCache() { const e = JSON.stringify(this.cache, null, 2); s && $prefs.setValueForKey(e, this.name), (i || n) && $persistentStore.write(e, this.name), o && (this.node.fs.writeFileSync(`${this.name}.json`, e, { flag: "w" }, e => console.log(e)), this.node.fs.writeFileSync("root.json", JSON.stringify(this.root, null, 2), { flag: "w" }, e => console.log(e))) } write(e, t) { if (this.log(`SET ${t}`), -1 !== t.indexOf("#")) { if (t = t.substr(1), n || i) return $persistentStore.write(e, t); if (s) return $prefs.setValueForKey(e, t); o && (this.root[t] = e) } else this.cache[t] = e; this.persistCache() } read(e) { return this.log(`READ ${e}`), -1 === e.indexOf("#") ? this.cache[e] : (e = e.substr(1), n || i ? $persistentStore.read(e) : s ? $prefs.valueForKey(e) : o ? this.root[e] : void 0) } delete(e) { if (this.log(`DELETE ${e}`), -1 !== e.indexOf("#")) { if (e = e.substr(1), n || i) return $persistentStore.write(null, e); if (s) return $prefs.removeValueForKey(e); o && delete this.root[e] } else delete this.cache[e]; this.persistCache() } notify(e, t = "", l = "", h = {}) { const a = h["open-url"], c = h["media-url"]; if (s && $notify(e, t, l, h), n && $notification.post(e, t, l + `${c ? "\n多媒体:" + c : ""}`, { url: a }), i) { let s = {}; a && (s.openUrl = a), c && (s.mediaUrl = c), "{}" === JSON.stringify(s) ? $notification.post(e, t, l) : $notification.post(e, t, l, s) } if (o || u) { const s = l + (a ? `\n点击跳转: ${a}` : "") + (c ? `\n多媒体: ${c}` : ""); if (r) { require("push").schedule({ title: e, body: (t ? t + "\n" : "") + s }) } else console.log(`${e}\n${t}\n${s}\n\n`) } } log(e) { this.debug && console.log(`[${this.name}] LOG: ${this.stringify(e)}`) } info(e) { console.log(`[${this.name}] INFO: ${this.stringify(e)}`) } error(e) { console.log(`[${this.name}] ERROR: ${this.stringify(e)}`) } wait(e) { return new Promise(t => setTimeout(t, e)) } done(e = {}) { s || i || n ? $done(e) : o && !r && "undefined" != typeof $context && ($context.headers = e.headers, $context.statusCode = e.statusCode, $context.body = e.body) } stringify(e) { if ("string" == typeof e || e instanceof String) return e; try { return JSON.stringify(e, null, 2) } catch (e) { return "[object Object]" } } }(e, t) }
/*****************************************************************************/