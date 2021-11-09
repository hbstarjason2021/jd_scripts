/*
cron "58 7,15,23 * * *" jd_joy_reward_Mod.js
 */
//Mod by ccwav，20211014
const config = require('./utils/config.js');
const jd_helpers = require('./utils/JDHelpers.js');
const jd_env = require('./utils/JDEnv.js');
const $ = jd_env.env('宠汪汪积分兑换有就换版');
const zooFaker = require('./utils/JDJRValidator_Pure');
const MD5 = require('crypto-js/md5');
// $.get = zooFaker.injectToRequest2($.get.bind($));
// $.post = zooFaker.injectToRequest2($.post.bind($));
let allMessage = '';
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const notify = $.isNode() ? require('./sendNotify') : '';
let jdNotify = false; //是否开启静默运行，默认false关闭(即:奖品兑换成功后会发出通知提示)
let Today = new Date();
let strDisable20 = 'false';

//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [],
  cookie = '';
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
  cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jd_helpers.jsonParse($.getdata('CookiesJD') || '[]').map((item) => item.cookie)].filter((item) => !!item);
}
const JD_API_HOST = 'https://jdjoy.jd.com';
Date.prototype.Format = function (fmt) {
  //author: meizz
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    S: this.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (var k in o) if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
  return fmt;
};
!(async () => {
  if (!cookiesArr[0]) {
    $.msg('【京东账号一】宠汪汪积分兑换奖品失败', '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {
      'open-url': 'https://bean.m.jd.com/bean/signIndex.action',
    });
  }
  for (let i = 0; i < cookiesArr.length; i++) {
    if (cookiesArr[i]) {
      $.cookie = cookie = cookiesArr[i];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = i + 1;
      $.isLogin = true;
      $.nickName = '' || $.UserName;

      await $.totalBean();
      console.log(`\n*****开始【京东账号${$.index}】${$.nickName || $.UserName}****\n`);
      if (!$.isLogin) {
        $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, {
          'open-url': 'https://bean.m.jd.com/bean/signIndex.action',
        });

        if ($.isNode()) {
          await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
        }
        continue;
      }

      if ($.isNode() && process.env.JOY_GET20WHEN16) {
        strDisable20 = process.env.JOY_GET20WHEN16;
        if (strDisable20 != 'false') {
          console.log('设置16点时段才抢20京豆....');
        }
      }

      // console.log(`本地时间与京东服务器时间差(毫秒)：${await get_diff_time()}`);
      $.validate = '';
      $.validate = await zooFaker.injectToRequest();
      console.log(`脚本开始请求时间 ${new Date().Format('yyyy-MM-dd hh:mm:ss | S')}`);
      await joyReward();
    }
  }
  if ($.isNode() && allMessage && $.ctrTemp) {
    await notify.sendNotify(`${$.name}`, `${allMessage}`);
  }
})()
  .catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '');
  })
  .finally(() => {
    $.done();
  });

async function joyReward() {
  try {
    let starttime = process.env.JOY_STARTTIME ? process.env.JOY_STARTTIME : 60;
    let nowtime = new Date().getSeconds();
    let sleeptime = 0;
    let rewardNum = '',
      saleInfoId = '',
      giftValue = '',
      extInfo = '',
      salePrice = 0;
    var llError = false;
    let giftSaleInfos = 'beanConfigs0';
    let time = new Date().getHours();
    if (time >= 0 && time < 8) {
      giftSaleInfos = 'beanConfigs0';
      if (time == 7 && new Date().getMinutes() > 50) {
        giftSaleInfos = 'beanConfigs8';
      }
    }
    if (time >= 8 && time < 16) {
      giftSaleInfos = 'beanConfigs8';
      if (time == 15 && new Date().getMinutes() > 50) {
        giftSaleInfos = 'beanConfigs16';
      }
    }
    if (time >= 16 && time < 24) {
      giftSaleInfos = 'beanConfigs16';
      if (time == 23 && new Date().getMinutes() > 50) {
        giftSaleInfos = 'beanConfigs0';
      }
    }

    if (new Date().getHours() >= 15 && new Date().getHours() < 23 && strDisable20 != 'false') {
      console.log('现在是15点后时段，执行先抢500京豆再抢20京豆...');
      strDisable20 = 'false';
    }

    console.log(`debug场次:${giftSaleInfos}\n`);

    for (let intTimes = 0; intTimes <= 50; intTimes++) {
      llError = false;
      await getExchangeRewards();
      if ($.getExchangeRewardsRes && $.getExchangeRewardsRes.success) {
        const data = $.getExchangeRewardsRes.data;
        try {
          for (let item of data[giftSaleInfos]) {
            if (item.giftType === 'jd_bean') {
              saleInfoId = item.id;
            }
          }
        } catch (e) {
          llError = true;
          console.log('东哥搞事情，不给京豆ID，等待5秒后重新获取...');
          await $.wait(5000);
        }
        if (llError) {
          continue;
        } else {
          console.log('成功获取场次信息...');
          break;
        }
      }
    }
    if (llError) {
      console.log('东哥说现在不给你兑换，死了这条心吧...');
      return;
    }

    if (new Date().getMinutes() == 58) {
      sleeptime = (60 - nowtime) * 1000;
      console.log(`请等待时间到达59分` + `等待时间 ${sleeptime / 1000}`);
      await $.wait(sleeptime);
    }

    if (new Date().getMinutes() == 59) {
      console.log(`脚本现在时间 ${new Date().Format('yyyy-MM-dd hh:mm:ss | S')}`);
      nowtime = new Date().getSeconds();
      if (nowtime < 59) {
        nowtime = new Date().getSeconds() + 1;
        sleeptime = (starttime - nowtime) * 1000;
        console.log(`等待时间 ${sleeptime / 1000}`);
        await $.wait(sleeptime);
      }
    }
    var llChange500 = true;
    var llSuccess = false;
    llError = false;
    for (let j = 0; j <= 14; j++) {
      if (llSuccess) {
        console.log(`兑换成功，跳出循环...\n`);
        break;
      }
      if (llError) {
        console.log(`兑换失败，跳出循环...\n`);
        break;
      }

      console.log(`\n正在尝试第` + (j + 1) + `次执行:${new Date().Format('yyyy-MM-dd hh:mm:ss | S')} \n`);
      const data = $.getExchangeRewardsRes.data;
      if (llChange500) {
        for (let item of data[giftSaleInfos]) {
          if (item.giftType === 'jd_bean') {
            saleInfoId = item.id;
            salePrice = item.salePrice;
            giftValue = item.giftValue;
            rewardNum = giftValue;
            if (salePrice && rewardNum == 500) {
              if (!saleInfoId) continue;
              console.log(`开始兑换${rewardNum}京豆,时间 ${new Date().Format('yyyy-MM-dd hh:mm:ss | S')}`);
              await exchange(saleInfoId, 'pet');
              console.log(`结束兑换API后时间 ${new Date().Format('yyyy-MM-dd hh:mm:ss | S')}`);
              if ($.exchangeRes && $.exchangeRes.success) {
                if ($.exchangeRes.errorCode === 'buy_success') {
                  console.log(`兑换${giftValue}成功,【消耗积分】${salePrice}个`);
                  llSuccess = true;
                  if ($.isNode() && process.env.JD_JOY_REWARD_NOTIFY) {
                    $.ctrTemp = `${process.env.JD_JOY_REWARD_NOTIFY}` === 'false';
                  } else if ($.getdata('jdJoyRewardNotify')) {
                    $.ctrTemp = $.getdata('jdJoyRewardNotify') === 'false';
                  } else {
                    $.ctrTemp = `${jdNotify}` === 'false';
                  }
                  if ($.ctrTemp) {
                    $.msg($.name, ``, `【京东账号${$.index}】${$.nickName}\n【${giftValue}京豆】兑换成功🎉\n【积分详情】消耗积分 ${salePrice}`);
                    if ($.isNode()) {
                      allMessage += `【京东账号${$.index}】 ${$.nickName}\n【${giftValue}京豆】兑换成功🎉\n【积分详情】消耗积分 ${salePrice}${$.index !== cookiesArr.length ? '\n\n' : ''}`;
                    }
                    break;
                  }
                } else if ($.exchangeRes && $.exchangeRes.errorCode === 'buy_limit') {
                  console.log(`兑换${rewardNum}京豆失败，原因：兑换京豆已达上限，请把机会留给更多的小伙伴~`);
                  llError = true;
                  break;
                } else if ($.exchangeRes && $.exchangeRes.errorCode === 'stock_empty') {
                  console.log(`兑换${rewardNum}京豆失败，原因：当前京豆库存为空`);
                } else if ($.exchangeRes && $.exchangeRes.errorCode === 'insufficient') {
                  console.log(`兑换${rewardNum}京豆失败，原因：当前账号积分不足兑换${giftValue}京豆所需的${salePrice}积分`);
                  if (strDisable20 != 'false') {
                    console.log(`关闭兑换500京豆，开启20京豆兑换...`);
                    strDisable20 = 'false';
                  } else {
                    console.log(`关闭兑换500京豆...`);
                  }
                  llChange500 = false;
                } else {
                  console.log(`兑奖失败:${JSON.stringify($.exchangeRes)}`);
                }
              } else {
                console.log(`兑换京豆异常:${JSON.stringify($.exchangeRes)}`);
              }
            }
          }
        }
      }
      if (strDisable20 == 'false') {
        for (let item of data[giftSaleInfos]) {
          if (item.giftType === 'jd_bean') {
            saleInfoId = item.id;
            salePrice = item.salePrice;
            giftValue = item.giftValue;
            rewardNum = giftValue;
            if (salePrice && rewardNum == 20) {
              if (!saleInfoId) continue;
              console.log(`开始兑换${rewardNum}京豆,时间 ${new Date().Format('yyyy-MM-dd hh:mm:ss | S')}`);
              await exchange(saleInfoId, 'pet');
              console.log(`结束兑换API后时间 ${new Date().Format('yyyy-MM-dd hh:mm:ss | S')}`);
              if ($.exchangeRes && $.exchangeRes.success) {
                if ($.exchangeRes.errorCode === 'buy_success') {
                  console.log(`兑换${giftValue}成功,【消耗积分】${salePrice}个`);
                  llSuccess = true;
                  if ($.isNode() && process.env.JD_JOY_REWARD_NOTIFY) {
                    $.ctrTemp = `${process.env.JD_JOY_REWARD_NOTIFY}` === 'false';
                  } else if ($.getdata('jdJoyRewardNotify')) {
                    $.ctrTemp = $.getdata('jdJoyRewardNotify') === 'false';
                  } else {
                    $.ctrTemp = `${jdNotify}` === 'false';
                  }
                  if ($.ctrTemp) {
                    $.msg($.name, ``, `【京东账号${$.index}】${$.nickName}\n【${giftValue}京豆】兑换成功🎉\n【积分详情】消耗积分 ${salePrice}`);
                    if ($.isNode()) {
                      allMessage += `【京东账号${$.index}】 ${$.nickName}\n【${giftValue}京豆】兑换成功🎉\n【积分详情】消耗积分 ${salePrice}${$.index !== cookiesArr.length ? '\n\n' : ''}`;
                    }
                    break;
                  }
                } else if ($.exchangeRes && $.exchangeRes.errorCode === 'buy_limit') {
                  console.log(`兑换${rewardNum}京豆失败，原因：兑换京豆已达上限，请把机会留给更多的小伙伴~`);
                  llError = true;
                  break;
                } else if ($.exchangeRes && $.exchangeRes.errorCode === 'stock_empty') {
                  console.log(`兑换${rewardNum}京豆失败，原因：当前京豆库存为空`);
                } else if ($.exchangeRes && $.exchangeRes.errorCode === 'insufficient') {
                  console.log(`兑换${rewardNum}京豆失败，原因：当前账号积分不足兑换${giftValue}京豆所需的${salePrice}积分`);
                  llError = true;
                  break;
                } else {
                  console.log(`兑奖失败:${JSON.stringify($.exchangeRes)}`);
                }
              } else {
                console.log(`兑换京豆异常:${JSON.stringify($.exchangeRes)}`);
              }
            }
          }
        }
      }

      await $.wait(300);
    }
  } catch (e) {
    $.logErr(e);
  }
}
function getExchangeRewards() {
  let opt = {
    url: `//jdjoy.jd.com/common/gift/getBeanConfigs?reqSource=h5&invokeKey=${config.invokeKey}`,
    method: 'GET',
    data: {},
    credentials: 'include',
    header: {
      'content-type': 'application/json',
    },
  };
  return new Promise((resolve) => {
    let lkt = new Date().getTime();
    let lks = MD5(config.invokeKey + lkt).toString();
    const option = {
      url: 'https:' + taroRequest(opt)['url'] + $.validate,
      headers: {
        Host: 'jdjoy.jd.com',
        'Content-Type': 'application/json',
        Cookie: cookie,
        reqSource: 'h5',
        Connection: 'keep-alive',
        Accept: '*/*',
        'User-Agent': $.isNode()
          ? process.env.JD_USER_AGENT
            ? process.env.JD_USER_AGENT
            : require('./USER_AGENTS').USER_AGENT
          : $.getdata('JDUA')
          ? $.getdata('JDUA')
          : 'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
        Referer: 'https://jdjoy.jd.com/pet/index',
        'Accept-Language': 'zh-cn',
        'Accept-Encoding': 'gzip, deflate, br',
        lkt: lkt,
        lks: lks,
      },
    };
    $.get(option, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`);
          console.log(`${$.name} API请求失败，请检查网路重试`);
        } else {
          $.getExchangeRewardsRes = {};
          if (jd_helpers.safeGet(data)) {
            $.getExchangeRewardsRes = JSON.parse(data);
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}
function exchange(saleInfoId, orderSource) {
  let body = {
    buyParam: {
      orderSource: orderSource,
      saleInfoId: saleInfoId,
    },
    deviceInfo: {},
  };
  let opt = {
    url: `//jdjoy.jd.com/common/gift/new/exchange?reqSource=h5&invokeKey=${config.invokeKey}`,
    data: body,
    credentials: 'include',
    method: 'POST',
    header: {
      'content-type': 'application/json',
    },
  };
  return new Promise((resolve) => {
    let lkt = new Date().getTime();
    let lks = MD5(config.invokeKey + lkt).toString();
    const option = {
      url: 'https:' + taroRequest(opt)['url'] + $.validate,
      body: `${JSON.stringify(body)}`,
      headers: {
        Host: 'jdjoy.jd.com',
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-cn',
        'Content-Type': 'application/json',
        Origin: 'https://jdjoy.jd.com',
        reqSource: 'h5',
        Connection: 'keep-alive',
        'User-Agent': $.isNode()
          ? process.env.JD_USER_AGENT
            ? process.env.JD_USER_AGENT
            : require('./USER_AGENTS').USER_AGENT
          : $.getdata('JDUA')
          ? $.getdata('JDUA')
          : 'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
        Referer: 'https://jdjoy.jd.com/pet/index',
        'Content-Length': '10',
        Cookie: cookie,
        lkt: lkt,
        lks: lks,
      },
    };
    $.post(option, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`);
          console.log(`${$.name} API请求失败，请检查网路重试`);
        } else {
          console.log(`兑换结果:${data}`);
          $.exchangeRes = {};
          if (jd_helpers.safeGet(data)) {
            $.exchangeRes = JSON.parse(data);
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}
function getJDServerTime() {
  return new Promise((resolve) => {
    $.get(
      {
        url: 'https://a.jd.com//ajax/queryServerData.html',
        headers: {
          'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88',
        },
      },
      async (err, resp, data) => {
        try {
          if (err) {
            console.log(`${JSON.stringify(err)}`);
            console.log(`${$.name} 获取京东服务器时间失败，请检查网路重试`);
          } else {
            data = JSON.parse(data);
            $.jdTime = data['serverTime'];
            // console.log(data['serverTime']);
            // console.log(data['serverTime'] - Date.now())
          }
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve($.jdTime);
        }
      }
    );
  });
}
async function get_diff_time() {
  // console.log(`本机时间戳 ${Date.now()}`)
  // console.log(`京东服务器时间戳 ${await getJDServerTime()}`)
  return Date.now() - (await getJDServerTime());
}

function taroRequest(e) {
  const a = $.isNode() ? require('crypto-js') : CryptoJS;
  const i = '98c14c997fde50cc18bdefecfd48ceb7';
  const o = a.enc.Utf8.parse(i);
  const r = a.enc.Utf8.parse('ea653f4f3c5eda12');
  let _o = {
    AesEncrypt: function AesEncrypt(e) {
      var n = a.enc.Utf8.parse(e);
      return a.AES.encrypt(n, o, {
        iv: r,
        mode: a.mode.CBC,
        padding: a.pad.Pkcs7,
      }).ciphertext.toString();
    },
    AesDecrypt: function AesDecrypt(e) {
      var n = a.enc.Hex.parse(e),
        t = a.enc.Base64.stringify(n);
      return a.AES.decrypt(t, o, {
        iv: r,
        mode: a.mode.CBC,
        padding: a.pad.Pkcs7,
      })
        .toString(a.enc.Utf8)
        .toString();
    },
    Base64Encode: function Base64Encode(e) {
      var n = a.enc.Utf8.parse(e);
      return a.enc.Base64.stringify(n);
    },
    Base64Decode: function Base64Decode(e) {
      return a.enc.Base64.parse(e).toString(a.enc.Utf8);
    },
    Md5encode: function Md5encode(e) {
      return a.MD5(e).toString();
    },
    keyCode: '98c14c997fde50cc18bdefecfd48ceb7',
  };

  const c = function sortByLetter(e, n) {
    if (e instanceof Array) {
      n = n || [];
      for (var t = 0; t < e.length; t++) n[t] = sortByLetter(e[t], n[t]);
    } else
      !(e instanceof Array) && e instanceof Object
        ? ((n = n || {}),
          Object.keys(e)
            .sort()
            .map(function (t) {
              n[t] = sortByLetter(e[t], n[t]);
            }))
        : (n = e);
    return n;
  };
  const s = function isInWhiteAPI(e) {
    for (var n = ['gift', 'pet'], t = !1, a = 0; a < n.length; a++) {
      var i = n[a];
      e.includes(i) && !t && (t = !0);
    }
    return t;
  };

  const d = function addQueryToPath(e, n) {
    if (n && Object.keys(n).length > 0) {
      var t = Object.keys(n)
        .map(function (e) {
          return e + '=' + n[e];
        })
        .join('&');
      return e.indexOf('?') >= 0 ? e + '&' + t : e + '?' + t;
    }
    return e;
  };
  const l = function apiConvert(e) {
    for (var n = r, t = 0; t < n.length; t++) {
      var a = n[t];
      e.includes(a) && !e.includes('common/' + a) && (e = e.replace(a, 'common/' + a));
    }
    return e;
  };

  var n = e,
    t = (n.header, n.url);
  t += (t.indexOf('?') > -1 ? '&' : '?') + 'reqSource=h5';
  var _a = (function getTimeSign(e) {
    var n = e.url,
      t = e.method,
      a = void 0 === t ? 'GET' : t,
      i = e.data,
      r = e.header,
      m = void 0 === r ? {} : r,
      p = a.toLowerCase(),
      g = _o.keyCode,
      f = m['content-type'] || m['Content-Type'] || '',
      h = '',
      u = +new Date();
    return (
      (h =
        'get' !== p && ('post' !== p || ('application/x-www-form-urlencoded' !== f.toLowerCase() && i && Object.keys(i).length))
          ? _o.Md5encode(_o.Base64Encode(_o.AesEncrypt('' + JSON.stringify(c(i)))) + '_' + g + '_' + u)
          : _o.Md5encode('_' + g + '_' + u)),
      s(n) &&
        ((n = d(n, {
          lks: h,
          lkt: u,
        })),
        (n = l(n))),
      Object.assign(e, {
        url: n,
      })
    );
  })(
    (e = Object.assign(e, {
      url: t,
    }))
  );
  return _a;
}
// md5
// prettier-ignore
!function(n){function t(n,t){var r=(65535&n)+(65535&t);return(n>>16)+(t>>16)+(r>>16)<<16|65535&r}function r(n,t){return n<<t|n>>>32-t}function e(n,e,o,u,c,f){return t(r(t(t(e,n),t(u,f)),c),o)}function o(n,t,r,o,u,c,f){return e(t&r|~t&o,n,t,u,c,f)}function u(n,t,r,o,u,c,f){return e(t&o|r&~o,n,t,u,c,f)}function c(n,t,r,o,u,c,f){return e(t^r^o,n,t,u,c,f)}function f(n,t,r,o,u,c,f){return e(r^(t|~o),n,t,u,c,f)}function i(n,r){n[r>>5]|=128<<r%32,n[14+(r+64>>>9<<4)]=r;var e,i,a,d,h,l=1732584193,g=-271733879,v=-1732584194,m=271733878;for(e=0;e<n.length;e+=16){i=l,a=g,d=v,h=m,g=f(g=f(g=f(g=f(g=c(g=c(g=c(g=c(g=u(g=u(g=u(g=u(g=o(g=o(g=o(g=o(g,v=o(v,m=o(m,l=o(l,g,v,m,n[e],7,-680876936),g,v,n[e+1],12,-389564586),l,g,n[e+2],17,606105819),m,l,n[e+3],22,-1044525330),v=o(v,m=o(m,l=o(l,g,v,m,n[e+4],7,-176418897),g,v,n[e+5],12,1200080426),l,g,n[e+6],17,-1473231341),m,l,n[e+7],22,-45705983),v=o(v,m=o(m,l=o(l,g,v,m,n[e+8],7,1770035416),g,v,n[e+9],12,-1958414417),l,g,n[e+10],17,-42063),m,l,n[e+11],22,-1990404162),v=o(v,m=o(m,l=o(l,g,v,m,n[e+12],7,1804603682),g,v,n[e+13],12,-40341101),l,g,n[e+14],17,-1502002290),m,l,n[e+15],22,1236535329),v=u(v,m=u(m,l=u(l,g,v,m,n[e+1],5,-165796510),g,v,n[e+6],9,-1069501632),l,g,n[e+11],14,643717713),m,l,n[e],20,-373897302),v=u(v,m=u(m,l=u(l,g,v,m,n[e+5],5,-701558691),g,v,n[e+10],9,38016083),l,g,n[e+15],14,-660478335),m,l,n[e+4],20,-405537848),v=u(v,m=u(m,l=u(l,g,v,m,n[e+9],5,568446438),g,v,n[e+14],9,-1019803690),l,g,n[e+3],14,-187363961),m,l,n[e+8],20,1163531501),v=u(v,m=u(m,l=u(l,g,v,m,n[e+13],5,-1444681467),g,v,n[e+2],9,-51403784),l,g,n[e+7],14,1735328473),m,l,n[e+12],20,-1926607734),v=c(v,m=c(m,l=c(l,g,v,m,n[e+5],4,-378558),g,v,n[e+8],11,-2022574463),l,g,n[e+11],16,1839030562),m,l,n[e+14],23,-35309556),v=c(v,m=c(m,l=c(l,g,v,m,n[e+1],4,-1530992060),g,v,n[e+4],11,1272893353),l,g,n[e+7],16,-155497632),m,l,n[e+10],23,-1094730640),v=c(v,m=c(m,l=c(l,g,v,m,n[e+13],4,681279174),g,v,n[e],11,-358537222),l,g,n[e+3],16,-722521979),m,l,n[e+6],23,76029189),v=c(v,m=c(m,l=c(l,g,v,m,n[e+9],4,-640364487),g,v,n[e+12],11,-421815835),l,g,n[e+15],16,530742520),m,l,n[e+2],23,-995338651),v=f(v,m=f(m,l=f(l,g,v,m,n[e],6,-198630844),g,v,n[e+7],10,1126891415),l,g,n[e+14],15,-1416354905),m,l,n[e+5],21,-57434055),v=f(v,m=f(m,l=f(l,g,v,m,n[e+12],6,1700485571),g,v,n[e+3],10,-1894986606),l,g,n[e+10],15,-1051523),m,l,n[e+1],21,-2054922799),v=f(v,m=f(m,l=f(l,g,v,m,n[e+8],6,1873313359),g,v,n[e+15],10,-30611744),l,g,n[e+6],15,-1560198380),m,l,n[e+13],21,1309151649),v=f(v,m=f(m,l=f(l,g,v,m,n[e+4],6,-145523070),g,v,n[e+11],10,-1120210379),l,g,n[e+2],15,718787259),m,l,n[e+9],21,-343485551),l=t(l,i),g=t(g,a),v=t(v,d),m=t(m,h)}return[l,g,v,m]}function a(n){var t,r="",e=32*n.length;for(t=0;t<e;t+=8){r+=String.fromCharCode(n[t>>5]>>>t%32&255)}return r}function d(n){var t,r=[];for(r[(n.length>>2)-1]=void 0,t=0;t<r.length;t+=1){r[t]=0}var e=8*n.length;for(t=0;t<e;t+=8){r[t>>5]|=(255&n.charCodeAt(t/8))<<t%32}return r}function h(n){return a(i(d(n),8*n.length))}function l(n,t){var r,e,o=d(n),u=[],c=[];for(u[15]=c[15]=void 0,o.length>16&&(o=i(o,8*n.length)),r=0;r<16;r+=1){u[r]=909522486^o[r],c[r]=1549556828^o[r]}return e=i(u.concat(d(t)),512+8*t.length),a(i(c.concat(e),640))}function g(n){var t,r,e="";for(r=0;r<n.length;r+=1){t=n.charCodeAt(r),e+="0123456789abcdef".charAt(t>>>4&15)+"0123456789abcdef".charAt(15&t)}return e}function v(n){return unescape(encodeURIComponent(n))}function m(n){return h(v(n))}function p(n){return g(m(n))}function s(n,t){return l(v(n),v(t))}function C(n,t){return g(s(n,t))}function A(n,t,r){return t?r?s(t,n):C(t,n):r?m(n):p(n)}$.md5=A}(this);