//京东到家果园任务脚本,支持qx,loon,shadowrocket,surge,nodejs
//用抓包抓 https://daojia.jd.com/html/index.html 页面cookie填写到下面,暂时不知cookie有效期
//抓多账号直接清除浏览器缓存再登录新账号,千万别点退出登录,否则cookie失效
//8,11,16整点各运行一次

const $ = new API("djgy");
let cookies = [];//多账号cookie用,分开
let thiscookie = '', deviceid = '';
!(async () => {
    if (cookies.length == 0) {
        //console.log($.read('jddj_cookies'));
        console.log($.read('#jddj_cookies'));
        cookies = JSON.parse($.read('jddj_cookies'));
    }

    for (let i = 0; i < cookies.length; i++) {
        console.log(`\n★★★★★开始执行第${i + 1}个账号,共${cookies.length}个账号★★★★★`);
        thiscookie = cookies[i];
        if (!thiscookie.trim()) continue;

        var jsonlist = {};
        var params = thiscookie.split(';');
        params.forEach(item => {
            jsonlist[item.split('=')[0].trim()] = item.split('=')[1].trim();
        });
        deviceid = jsonlist.deviceid_pdj_jd;

        let tslist = await taskList();

        await dailySign();
        await $.wait(1000);

        await continuitySign();
        await $.wait(1000);

        await signGetWater();
        await $.wait(1000);

        await timeGetWater();
        await $.wait(1000);

        await _10sGetWater();
        await $.wait(1000);

        await view10sTask(tslist);
        await $.wait(1000);

        await gcGetWater();
        await $.wait(1000);

        await water();
        await $.wait(1000);

        _5timesGetWater();
        await $.wait(1000);

        _10timesGetWater();
        await $.wait(1000);

        await treeInfo();
        await $.wait(1000);

    }

})().catch((e) => {
    console.log('', `❌失败! 原因: ${e}!`, '');
}).finally(() => {
    $.done();
})

//任务列表
async function taskList() {
    return new Promise(async resolve => {
        try {
            let option = urlTask('https://daojia.jd.com/client?_jdrandom=' + Math.round(new Date()) + '&functionId=task%2Flist&isNeedDealError=true&body=%7B%22modelId%22%3A%22M10007%22%2C%22plateCode%22%3A1%7D&channel=ios&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' + deviceid + '&deviceToken=' + deviceid + '&deviceId=' + deviceid, '');

            $.http.get(option).then(response => {
                var data = JSON.parse(response.body);
                resolve(data);
            })

        } catch (error) {
            console.log('\n【浇水】:' + error);
            resolve({});
        }

    })
}

//浇水
async function water() {
    return new Promise(async resolve => {
        try {
            let option = urlTask('https://daojia.jd.com/client?_jdrandom=' + Math.round(new Date()), 'functionId=fruit%2Fwatering&isNeedDealError=true&method=POST&body=%7B%22waterTime%22%3A1%7D&channel=ios&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' + deviceid + '&deviceToken=' + deviceid + '&deviceId=' + deviceid + '');

            let waterStatus = 1, waterCount = 0;
            do {
                waterCount++;
                console.log(`\n**********开始执行第${waterCount}次浇水**********`);

                $.http.post(option).then(response => {
                    var data = JSON.parse(response.body);
                    console.log('\n【浇水】:' + response.body);
                    waterStatus = data.code;
                })
                await $.wait(1000);
            } while (waterStatus == 0);
            resolve();

        } catch (error) {
            console.log('\n【浇水】:' + error);
            resolve();
        }

    })

}

//果园每日签到
async function dailySign() {
    return new Promise(async resolve => {
        try {
            let option = urlTask('https://daojia.jd.com/client?_jdrandom=' + Math.round(new Date()) + '&functionId=task%2Ffinished&isNeedDealError=true&body=%7B%22modelId%22%3A%22M10007%22%2C%22taskId%22%3A%2223eee25fa676300%22%2C%22taskType%22%3A901%2C%22plateCode%22%3A1%2C%22subNode%22%3Anull%7D&channel=ios&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' + deviceid + Math.round(new Date()) + '&deviceToken=' + deviceid + '&deviceId=' + deviceid + '', ``);
            await $.http.get(option).then(response => {
                console.log('\n【果园每日签到领水滴】:' + response.body);
                resolve();
            })
        } catch (error) {
            console.log('\n【果园每日签到领水滴】:' + error);
            resolve();
        }

    })
}

//连续签到
async function continuitySign() {
    return new Promise(async resolve => {
        try {
            let option = urlTask('https://daojia.jd.com/client?_jdrandom=' + Math.round(new Date()) + '&functionId=task%2Ffinished&isNeedDealError=true&body=%7B%22modelId%22%3A%22M10007%22%2C%22taskId%22%3A%2223dd5f3d1ae4dc5%22%2C%22taskType%22%3A901%2C%22plateCode%22%3A1%2C%22subNode%22%3Anull%7D&channel=ios&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' + deviceid + Math.round(new Date()) + '&deviceToken=' + deviceid + '&deviceId=' + deviceid + '', ``);
            await $.http.get(option).then(response => {
                console.log('\n【果园连续签到领水滴】:' + response.body);
                resolve();
            })
        } catch (error) {
            console.log('\n【果园连续签到领水滴】:' + error);
            resolve();
        }

    })
}

//到家签到浏览10s领水滴
async function signGetWater() {
    return new Promise(async resolve => {
        try {
            let option = urlTask('https://daojia.jd.com/client?_jdrandom=' + Math.round(new Date()) + '&functionId=signin%2FuserSigninNew&isNeedDealError=true&body=%7B%22channel%22%3A%22daojiaguoyuan%22%2C%22cityId%22%3A1381%2C%22longitude%22%3A114.32204%2C%22latitude%22%3A30.470556%2C%22ifCic%22%3A0%7D&channel=ios&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' + deviceid + '&deviceToken=' + deviceid + '&deviceId=' + deviceid, ``);
            await $.http.get(option).then(response => {
                console.log('\n【到家签到】:' + response.body);
            })

            console.log('\n【到家签到】:开始浏览商品10s...');
            for (let t = 0; t < 10; t++) {
                await $.wait(1000);
                console.log('计时:' + (t + 1) + '秒...');
            }

            option = urlTask('https://daojia.jd.com/client?_jdrandom=' + Math.round(new Date()) + '&functionId=task%2Ffinished&isNeedDealError=true&body=%7B%22modelId%22%3A%22M10007%22%2C%22taskId%22%3A%2223dec596e901e11%22%2C%22taskType%22%3A901%2C%22plateCode%22%3A1%2C%22subNode%22%3Anull%7D&channel=ios&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' + deviceid + Math.round(new Date()) + '&deviceToken=' + deviceid + '&deviceId=' + deviceid + '', ``);
            await $.http.get(option).then(response => {
                console.log('\n【到家签到开始浏览10s结束】:' + response.body);
            })

            option = urlTask('https://daojia.jd.com/client?_jdrandom=' + Math.round(new Date()) + '&functionId=task%2FsendPrize&isNeedDealError=true&body=%7B%22modelId%22%3A%22M10007%22%2C%22taskId%22%3A%2223dec596e901e11%22%2C%22taskType%22%3A901%2C%22plateCode%22%3A1%2C%22subNode%22%3Anull%7D&channel=ios&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' + deviceid + Math.round(new Date()) + '&deviceToken=' + deviceid + '&deviceId=' + deviceid + '', ``);
            await $.http.get(option).then(response => {
                console.log('\n【到家签到领水滴】:' + response.body);
                resolve();
            })
        } catch (error) {
            console.log('\n【到家签到领水滴】:' + error);
            resolve();
        }

    })

}

//定时领水滴
async function timeGetWater() {
    return new Promise(async resolve => {
        try {
            let option = urlTask('https://daojia.jd.com/client?_jdrandom=' + Math.round(new Date()) + '&functionId=task%2Ffinished&isNeedDealError=true&body=%7B%22modelId%22%3A%22M10007%22%2C%22taskId%22%3A%2223deb230555aefd%22%2C%22taskType%22%3A1102%2C%22plateCode%22%3A1%2C%22subNode%22%3Anull%7D&channel=ios&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' + deviceid + Math.round(new Date()) + '&deviceToken=' + deviceid + '&deviceId=' + deviceid + '', ``);
            await $.http.get(option).then(response => {
                console.log('\n【定时领水滴】:' + response.body);
                resolve();
            })
        } catch (error) {
            console.log('\n【定时领水滴】:' + error);
            resolve();
        }

    })
}

//秒杀商品浏览10s
async function _10sGetWater() {
    return new Promise(async resolve => {
        try {
            let option = urlTask('https://daojia.jd.com/client?_jdrandom=' + Math.round(new Date()) + '&functionId=task%2Freceived&isNeedDealError=true&body=%7B%22modelId%22%3A%22M10007%22%2C%22taskId%22%3A%2223df26089e7f180%22%2C%22taskType%22%3A901%2C%22plateCode%22%3A1%2C%22subNode%22%3Anull%7D&channel=ios&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' + deviceid + Math.round(new Date()) + '&deviceToken=' + deviceid + '&deviceId=' + deviceid + '', ``);
            await $.http.get(option).then(response => {
                console.log('\n【开始逛十秒.....】:' + response.body);
            })

            for (let t = 0; t < 10; t++) {
                await $.wait(1000);
                console.log('计时:' + (t + 1) + '秒...');
            }

            option = urlTask('https://daojia.jd.com/client?_jdrandom=' + Math.round(new Date()) + '&functionId=task%2Ffinished&isNeedDealError=true&body=%7B%22modelId%22%3A%22M10007%22%2C%22taskId%22%3A%2223df26089e7f180%22%2C%22taskType%22%3A901%2C%22plateCode%22%3A1%2C%22subNode%22%3Anull%7D&channel=ios&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' + deviceid + Math.round(new Date()) + '&deviceToken=' + deviceid + '&deviceId=' + deviceid + '', ``);
            await $.http.get(option).then(response => {
                console.log('\n【逛十秒结束】:' + response.body);
            })

            option = urlTask('https://daojia.jd.com/client?_jdrandom=' + Math.round(new Date()) + '&functionId=task%2FsendPrize&isNeedDealError=true&body=%7B%22modelId%22%3A%22M10007%22%2C%22taskId%22%3A%2223df26089e7f180%22%2C%22taskType%22%3A901%2C%22plateCode%22%3A1%2C%22subNode%22%3Anull%7D&channel=ios&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' + deviceid + Math.round(new Date()) + '&deviceToken=' + deviceid + '&deviceId=' + deviceid + '', ``);
            await $.http.get(option).then(response => {
                console.log('\n【逛十秒钟领水滴】:' + response.body);
                resolve();
            })
        } catch (error) {
            console.log('\n【逛十秒钟领水滴】:' + error);
            resolve();
        }

    })
}

//通用浏览10s任务
async function view10sTask(tslist) {
    return new Promise(async resolve => {
        try {
            for (let index = 0; index < tslist.result.taskInfoList.length; index++) {
                const item = tslist.result.taskInfoList[index];
                if (item.taskType == '307') {
                    //领取任务
                    let option = urlTask('https://daojia.jd.com/client?_jdrandom=' + Math.round(new Date()) + '&functionId=task%2Freceived&isNeedDealError=true&body=%7B%22modelId%22%3A%22M10007%22%2C%22taskId%22%3A%22' + item.taskId + '%22%2C%22taskType%22%3A901%2C%22plateCode%22%3A1%2C%22subNode%22%3Anull%7D&channel=ios&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' + deviceid + Math.round(new Date()) + '&deviceToken=' + deviceid + '&deviceId=' + deviceid + '', ``);
                    await $.http.get(option).then(response => {
                        console.log('\n【' + item.taskName + '开始逛十秒.....】:' + response.body);
                    })

                    for (let t = 0; t < 10; t++) {
                        await $.wait(1000);
                        console.log('计时:' + (t + 1) + '秒...');
                    }

                    //结束任务
                    option = urlTask('https://daojia.jd.com/client?_jdrandom=' + Math.round(new Date()) + '&functionId=task%2Ffinished&isNeedDealError=true&body=%7B%22modelId%22%3A%22M10007%22%2C%22taskId%22%3A%22' + item.taskId + '%22%2C%22taskType%22%3A901%2C%22plateCode%22%3A1%2C%22subNode%22%3Anull%7D&channel=ios&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' + deviceid + Math.round(new Date()) + '&deviceToken=' + deviceid + '&deviceId=' + deviceid + '', ``);
                    await $.http.get(option).then(response => {
                        console.log('\n【' + item.taskName + '逛十秒结束】:' + response.body);
                    })

                    //领取奖励
                    option = urlTask('https://daojia.jd.com/client?_jdrandom=' + Math.round(new Date()) + '&functionId=task%2FsendPrize&isNeedDealError=true&body=%7B%22modelId%22%3A%22M10007%22%2C%22taskId%22%3A%22' + item.taskId + '%22%2C%22taskType%22%3A901%2C%22plateCode%22%3A1%2C%22subNode%22%3Anull%7D&channel=ios&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' + deviceid + Math.round(new Date()) + '&deviceToken=' + deviceid + '&deviceId=' + deviceid + '', ``);
                    await $.http.get(option).then(response => {
                        console.log('\n【' + item.taskName + '逛十秒钟领水滴】:' + response.body);
                    })

                }
            }
            resolve();
        } catch (error) {
            console.log('\n【逛十秒钟领水滴】:' + error);
            resolve();
        }

    })
}

//打开惊喜工厂领水滴
async function gcGetWater() {
    return new Promise(async resolve => {
        try {
            //先打开再领
            let option = urlTask('https://daojia.jd.com/client?_jdrandom=' + Math.round(new Date()) + '&functionId=task%2Ffinished&isNeedDealError=true&body=%7B%22modelId%22%3A%22M10007%22%2C%22taskId%22%3A%2223e48fe307c9f37%22%2C%22taskType%22%3A901%2C%22plateCode%22%3A1%2C%22subNode%22%3Anull%7D&channel=ios&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' + deviceid + Math.round(new Date()) + '&deviceToken=' + deviceid + '&deviceId=' + deviceid + '', ``);
            await $.http.get(option).then(response => {
                console.log('\n【打开惊喜工厂】:' + response.body);
            })

            await $.wait(2000);

            option = urlTask('https://daojia.jd.com/client?_jdrandom=' + Math.round(new Date()) + '&functionId=task%2FsendPrize&isNeedDealError=true&body=%7B%22modelId%22%3A%22M10007%22%2C%22taskId%22%3A%2223e48fe307c9f37%22%2C%22taskType%22%3A901%2C%22plateCode%22%3A1%2C%22subNode%22%3Anull%7D&channel=ios&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' + deviceid + Math.round(new Date()) + '&deviceToken=' + deviceid + '&deviceId=' + deviceid + '', ``);
            await $.http.get(option).then(response => {
                console.log('\n【打开惊喜工厂领水滴】:' + response.body);
                resolve();
            })
        } catch (error) {
            console.log('\n【打开惊喜工厂领水滴】:' + error);
            resolve();
        }

    })
}

//浇水五次领水滴
async function _5timesGetWater() {
    return new Promise(async resolve => {
        try {
            let option = urlTask('https://daojia.jd.com/client?_jdrandom=' + Math.round(new Date()) + '&functionId=task%2FsendPrize&isNeedDealError=true&body=%7B%22modelId%22%3A%22M10007%22%2C%22taskId%22%3A%2223eee302d05e132%22%2C%22taskType%22%3A901%2C%22plateCode%22%3A1%2C%22subNode%22%3Anull%7D&channel=ios&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' + deviceid + Math.round(new Date()) + '&deviceToken=' + deviceid + '&deviceId=' + deviceid + '', ``);
            await $.http.get(option).then(response => {
                console.log('\n【浇水五次领水滴】:' + response.body);
                resolve();
            })
        } catch (error) {
            console.log('\n【浇水五次领水滴】:' + error);
            resolve();
        }

    })
}

//浇水十次领水滴
async function _10timesGetWater() {
    return new Promise(async resolve => {
        try {
            let option = urlTask('https://daojia.jd.com/client?_jdrandom=' + Math.round(new Date()) + '&functionId=task%2FsendPrize&isNeedDealError=true&body=%7B%22modelId%22%3A%22M10007%22%2C%22taskId%22%3A%2223ded2577aa9fbf%22%2C%22taskType%22%3A901%2C%22plateCode%22%3A1%2C%22subNode%22%3Anull%7D&channel=ios&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' + deviceid + Math.round(new Date()) + '&deviceToken=' + deviceid + '&deviceId=' + deviceid + '', ``);
            await $.http.get(option).then(async response => {
                let data = JSON.parse(response.body);
                console.log('\n【浇水十次领水滴】:' + response.body);
                if (data.code == 0) {
                    console.log('开始重新浇水.........');
                    await water();
                }
                resolve();
            })
        } catch (error) {
            console.log('\n【浇水十次领水滴】:' + error);
            resolve();
        }

    })
}

//当前果树详情
async function treeInfo() {
    return new Promise(async resolve => {
        try {
            let option = urlTask('https://daojia.jd.com:443/client?_jdrandom=' + Math.round(new Date()), 'functionId=fruit%2FinitFruit&isNeedDealError=true&method=POST&body=%7B%22cityId%22%3A1381%2C%22longitude%22%3A114.32204%2C%22latitude%22%3A30.470556%7D&lat=30.470556&lng=114.32204&lat_pos=30.470556&lng_pos=114.32204&city_id=1381&channel=ios&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' + deviceid + Math.round(new Date()) + '&deviceToken=' + deviceid + '&deviceId=' + deviceid);
            await $.http.post(option).then(async response => {
                let data = JSON.parse(response.body);
                if (data.code == 0) {
                    console.log('\n【果树信息】:' + data.result.activityInfoResponse.fruitName + ',还需浇水' + data.result.activityInfoResponse.curStageLeftProcess + '次' + data.result.activityInfoResponse.stageName + ',还剩' + data.result.userResponse.waterBalance + '滴水');
                }
                resolve();
            })
        } catch (error) {
            console.log('\n【果树信息】:' + error);
            resolve();
        }

    })
}


function urlTask(url, body) {
    let option = {
        url: url,
        headers: {
            'Host': 'daojia.jd.com',
            'Content-Type': 'application/x-www-form-urlencoded;',
            'Origin': 'https://daojia.jd.com',
            'Cookie': thiscookie,
            'Connection': 'keep-alive',
            'Accept': '*/*',
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148________appName=jdLocal&platform=iOS&commonParams={"sharePackageVersion":"2"}&djAppVersion=8.7.5&supportDJSHWK',
            'Accept-Language': 'zh-cn'
        },
        body: body
    };
    return option;
}

/*********************************** API *************************************/
function ENV() { const e = "undefined" != typeof $task, t = "undefined" != typeof $loon, s = "undefined" != typeof $httpClient && !t, i = "function" == typeof require && "undefined" != typeof $jsbox; return { isQX: e, isLoon: t, isSurge: s, isNode: "function" == typeof require && !i, isJSBox: i, isRequest: "undefined" != typeof $request, isScriptable: "undefined" != typeof importModule } } function HTTP(e = { baseURL: "" }) { const { isQX: t, isLoon: s, isSurge: i, isScriptable: n, isNode: o } = ENV(), r = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/; const u = {}; return ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS", "PATCH"].forEach(l => u[l.toLowerCase()] = (u => (function (u, l) { l = "string" == typeof l ? { url: l } : l; const h = e.baseURL; h && !r.test(l.url || "") && (l.url = h ? h + l.url : l.url); const a = (l = { ...e, ...l }).timeout, c = { onRequest: () => { }, onResponse: e => e, onTimeout: () => { }, ...l.events }; let f, d; if (c.onRequest(u, l), t) f = $task.fetch({ method: u, ...l }); else if (s || i || o) f = new Promise((e, t) => { (o ? require("request") : $httpClient)[u.toLowerCase()](l, (s, i, n) => { s ? t(s) : e({ statusCode: i.status || i.statusCode, headers: i.headers, body: n }) }) }); else if (n) { const e = new Request(l.url); e.method = u, e.headers = l.headers, e.body = l.body, f = new Promise((t, s) => { e.loadString().then(s => { t({ statusCode: e.response.statusCode, headers: e.response.headers, body: s }) }).catch(e => s(e)) }) } const p = a ? new Promise((e, t) => { d = setTimeout(() => (c.onTimeout(), t(`${u} URL: ${l.url} exceeds the timeout ${a} ms`)), a) }) : null; return (p ? Promise.race([p, f]).then(e => (clearTimeout(d), e)) : f).then(e => c.onResponse(e)) })(l, u))), u } function API(e = "untitled", t = !1) { const { isQX: s, isLoon: i, isSurge: n, isNode: o, isJSBox: r, isScriptable: u } = ENV(); return new class { constructor(e, t) { this.name = e, this.debug = t, this.http = HTTP(), this.env = ENV(), this.node = (() => { if (o) { return { fs: require("fs") } } return null })(), this.initCache(); Promise.prototype.delay = function (e) { return this.then(function (t) { return ((e, t) => new Promise(function (s) { setTimeout(s.bind(null, t), e) }))(e, t) }) } } initCache() { if (s && (this.cache = JSON.parse($prefs.valueForKey(this.name) || "{}")), (i || n) && (this.cache = JSON.parse($persistentStore.read(this.name) || "{}")), o) { let e = "root.json"; this.node.fs.existsSync(e) || this.node.fs.writeFileSync(e, JSON.stringify({}), { flag: "wx" }, e => console.log(e)), this.root = {}, e = `${this.name}.json`, this.node.fs.existsSync(e) ? this.cache = JSON.parse(this.node.fs.readFileSync(`${this.name}.json`)) : (this.node.fs.writeFileSync(e, JSON.stringify({}), { flag: "wx" }, e => console.log(e)), this.cache = {}) } } persistCache() { const e = JSON.stringify(this.cache, null, 2); s && $prefs.setValueForKey(e, this.name), (i || n) && $persistentStore.write(e, this.name), o && (this.node.fs.writeFileSync(`${this.name}.json`, e, { flag: "w" }, e => console.log(e)), this.node.fs.writeFileSync("root.json", JSON.stringify(this.root, null, 2), { flag: "w" }, e => console.log(e))) } write(e, t) { if (this.log(`SET ${t}`), -1 !== t.indexOf("#")) { if (t = t.substr(1), n || i) return $persistentStore.write(e, t); if (s) return $prefs.setValueForKey(e, t); o && (this.root[t] = e) } else this.cache[t] = e; this.persistCache() } read(e) { return this.log(`READ ${e}`), -1 === e.indexOf("#") ? this.cache[e] : (e = e.substr(1), n || i ? $persistentStore.read(e) : s ? $prefs.valueForKey(e) : o ? this.root[e] : void 0) } delete(e) { if (this.log(`DELETE ${e}`), -1 !== e.indexOf("#")) { if (e = e.substr(1), n || i) return $persistentStore.write(null, e); if (s) return $prefs.removeValueForKey(e); o && delete this.root[e] } else delete this.cache[e]; this.persistCache() } notify(e, t = "", l = "", h = {}) { const a = h["open-url"], c = h["media-url"]; if (s && $notify(e, t, l, h), n && $notification.post(e, t, l + `${c ? "\n多媒体:" + c : ""}`, { url: a }), i) { let s = {}; a && (s.openUrl = a), c && (s.mediaUrl = c), "{}" === JSON.stringify(s) ? $notification.post(e, t, l) : $notification.post(e, t, l, s) } if (o || u) { const s = l + (a ? `\n点击跳转: ${a}` : "") + (c ? `\n多媒体: ${c}` : ""); if (r) { require("push").schedule({ title: e, body: (t ? t + "\n" : "") + s }) } else console.log(`${e}\n${t}\n${s}\n\n`) } } log(e) { this.debug && console.log(`[${this.name}] LOG: ${this.stringify(e)}`) } info(e) { console.log(`[${this.name}] INFO: ${this.stringify(e)}`) } error(e) { console.log(`[${this.name}] ERROR: ${this.stringify(e)}`) } wait(e) { return new Promise(t => setTimeout(t, e)) } done(e = {}) { console.log('done!'); s || i || n ? $done(e) : o && !r && "undefined" != typeof $context && ($context.headers = e.headers, $context.statusCode = e.statusCode, $context.body = e.body) } stringify(e) { if ("string" == typeof e || e instanceof String) return e; try { return JSON.stringify(e, null, 2) } catch (e) { return "[object Object]" } } }(e, t) }
/*****************************************************************************/