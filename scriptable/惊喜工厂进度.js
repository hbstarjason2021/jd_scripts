//京东水果成熟进度
//var token = args.widgetParameter;

var cookies = [
  {
    "name": "",
    "cookie": ''
  },
  {
    "name": "",
    "cookie": ""
  }

];

let widget = await createWidget()
if (!config.runsInWidget) {
  await widget.presentLarge()
}
Script.setWidget(widget)
Script.complete()
async function createWidget() {
  let title = "惊喜工厂进度"
  let w = new ListWidget()
  bg = new LinearGradient()
  bg.locations = [0, 1]
  bg.colors = [
    //new Color("#6fa8dc"),
    //new Color("#a4c2f4")
    new Color('ffffff')
  ]

  w.backgroundGradient = bg
  w.addSpacer(8)

  // 显示图标和标题
  let titleStack = w.addStack()
  titleStack.addSpacer(4)
  let titleElement = titleStack.addText(title)
  titleElement.textColor = Color.orange();
  titleElement.font = Font.mediumSystemFont(15)
  w.addSpacer(8)

  let msgstr = "", sharecode = "";
  for (var i = 0; i < cookies.length; i++) {
    let data = await getData(cookies[i].cookie);
    //console.log("🍎🍎🍎" + JSON.stringify(data));
    msgstr = cookies[i].name + ":";
    if (!!data.ret && data.ret == "10001") {
      msgstr = cookies[i].name + ": cookie失效";
    }
    if (!!data.data.productionList && !!data.data.productionList[0].investedElectric) {
      let data2 = await GetCommodityDetails(cookies[i].cookie, data.data.productionList[0].commodityDimId);
      let data3 = await QueryFriendList(cookies[i].cookie);
      var zgxx = "";
      if (data['ret'] === 0) {
        const { assistListToday = [], assistNumMax, hireListToday = [], hireNumMax } = data3.data;
        zgxx = ",招工进度" + hireListToday.length + '/' + hireNumMax;
      }
      var str = data2.data['commodityList'][0].name;
      var str2 = "生产进度" + ((data.data.productionList[0].investedElectric / data.data.productionList[0].needElectric) * 100).toFixed(2) + "%";
      msgstr = cookies[i].name + ": " + str + "," + str2 + zgxx;
      if (config.widgetFamily == "small") {
        msgstr = cookies[i].name + ": " + ((data.data.productionList[0].investedElectric / data.data.productionList[0].needElectric) * 100).toFixed(2) + "%";
      }

      //msgstr=data.data.productionList[0].needElectric.toString();
      //console.log("🍓🍓🍓🍓"+data.data.productionList[0].needElectric);
      //console.log(data.data.user.encryptPin);
      sharecode += data.data.user.encryptPin + "@";
    }

    let date1 = w.addText(msgstr)
    date1.font = Font.semiboldSystemFont(12);
    //date1.textColor = Color.white()
    date1.textColor = Color.black();
    w.addSpacer(5)

  }
  console.log("/submit_activity_codes jxfactory " + sharecode.substr(0, sharecode.length - 1));

  // 更新时间
  let gx = dateFtt("yyyy-MM-dd hh:mm:ss", new Date(new Date().toLocaleString('chinese', { hour12: false })));
  let body = w.addText(gx)
  body.font = Font.mediumRoundedSystemFont(9)
  body.textColor = Color.blue()
  w.addSpacer(15)
  return w
}

//个人信息
async function getData(cookie) {
  var url = 'https://m.jingxi.com/dreamfactory/userinfo/GetUserInfo?zone=dream_factory&pin=&sharePin=&shareType=&materialTuanPin=&materialTuanId=&sceneval=2&g_login_type=1&_time=' + Date.now() + '&_=' + Date.now();

  var req = new Request(url)

  req.headers = {
    "Cookie": cookie,
    "Host": "m.jingxi.com",
    "Connection": "keep-alive", "User-Agent": "jdpingou;iPhone;3.14.4;14.0;ae75259f6ca8378672006fc41079cd8c90c53be8;network/wifi;model/iPhone10,2;appBuild/100351;ADID/00000000-0000-0000-0000-000000000000;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/1;hasOCPay/0;supportBestPay/0;session/62;pap/JA2015_311210;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148", "Accept-Language": "zh-cn", "Referer": "https://wqsd.jd.com/pingou/dream_factory/index.html", "Accept-Encoding": "gzip, deflate, br"
  }
  req.method = 'GET';
  //req.body = "body=version:4&appid=wh5&clientVersion=9.1.0";
  //console.log(req);
  var data = await req.loadJSON();
  //console.log(data);
  return data
}

//商品信息
async function GetCommodityDetails(cookie, commodityDimId) {
  var url = 'https://m.jingxi.com/dreamfactory/diminfo/GetCommodityDetails?zone=dream_factory&sceneval=2&g_login_type=1&commodityId=' + commodityDimId + '&_time=' + Date.now() + '&_=' + Date.now();

  var req = new Request(url)

  req.headers = {
    "Cookie": cookie,
    "Host": "m.jingxi.com",
    "Connection": "keep-alive", "User-Agent": "jdpingou;iPhone;3.14.4;14.0;ae75259f6ca8378672006fc41079cd8c90c53be8;network/wifi;model/iPhone10,2;appBuild/100351;ADID/00000000-0000-0000-0000-000000000000;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/1;hasOCPay/0;supportBestPay/0;session/62;pap/JA2015_311210;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148", "Accept-Language": "zh-cn", "Referer": "https://wqsd.jd.com/pingou/dream_factory/index.html", "Accept-Encoding": "gzip, deflate, br"
  }
  req.method = 'GET';
  //req.body = "body=version:4&appid=wh5&clientVersion=9.1.0";
  //console.log(req);
  var data = await req.loadJSON();
  //console.log(data);
  return data

}

//招工信息
async function QueryFriendList(cookie) {
  var url = 'https://m.jingxi.com/dreamfactory/friend/QueryFriendList?zone=dream_factory&pin=&sharePin=&shareType=&materialTuanPin=&materialTuanId=&sceneval=2&g_login_type=1&_time=' + Date.now() + '&_=' + Date.now();

  var req = new Request(url)

  req.headers = {
    "Cookie": cookie,
    "Host": "m.jingxi.com",
    "Connection": "keep-alive", "User-Agent": "jdpingou;iPhone;3.14.4;14.0;ae75259f6ca8378672006fc41079cd8c90c53be8;network/wifi;model/iPhone10,2;appBuild/100351;ADID/00000000-0000-0000-0000-000000000000;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/1;hasOCPay/0;supportBestPay/0;session/62;pap/JA2015_311210;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148", "Accept-Language": "zh-cn", "Referer": "https://wqsd.jd.com/pingou/dream_factory/index.html", "Accept-Encoding": "gzip, deflate, br"
  }
  req.method = 'GET';
  //req.body = "body=version:4&appid=wh5&clientVersion=9.1.0";
  //console.log(req);
  var data = await req.loadJSON();
  //console.log(data);
  return data

}

/**************************************时间格式化处理************************************/
function dateFtt(fmt, date) { //author: meizz   
  var o = {
    "M+": date.getMonth() + 1,                 //月份   
    "d+": date.getDate(),                    //日   
    "h+": date.getHours(),                   //小时   
    "m+": date.getMinutes(),                 //分   
    "s+": date.getSeconds(),                 //秒   
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
    "S": date.getMilliseconds()             //毫秒   
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
} 
