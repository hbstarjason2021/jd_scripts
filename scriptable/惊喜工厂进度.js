
//京东水果成熟进度
//var token = args.widgetParameter;

var cookies = [
  {
    "name": "xxx",
    "cookie": 'xxxx'
  },
  {
    "name": "xxx2",
    "cookie": "xxx2"
  }
];
Keychain.set('jdcookies', JSON.stringify(cookies));//写到缓存中


let widget = await createWidget()
if (!config.runsInWidget) {
  await widget.presentLarge()
}
Script.setWidget(widget)
Script.complete()
async function createWidget() {
  let title = "东东农场进度"
  let w = new ListWidget()
  bg = new LinearGradient()
  bg.locations = [0, 1]
  bg.colors = [
    //new Color("#6fa8dc"),
    //new Color("#a4c2f4")
    new Color("#ffffff")
  ]

  w.backgroundGradient = bg
  w.addSpacer(5)

  // 显示图标和标题
  let titleStack = w.addStack()
  titleStack.addSpacer(4)
  let titleElement = titleStack.addText(title)
  titleElement.textColor = Color.orange();
  titleElement.font = Font.mediumSystemFont(15);
  w.addSpacer(3);

  let sharecode = "";
  for (var i = 0; i < cookies.length; i++) {
    let data = await getData(cookies[i].cookie);
    let msgstr = "";
    if (!!data.msg && data.msg == "not login") {
      msgstr = cookies[i].name + ": cookie失效";
    }
    else if (data.farmUserPro.treeState == 2 || data.farmUserPro.treeState == 3) {
      msgstr = cookies[i].name + ": 可领取";
    }
    else if (data.farmUserPro.treeState == 0) {
      msgstr = cookies[i].name + ": 请种植水果";
    }
    else {
      var str = data.farmUserPro.name + "，";
      var str2 = "进度" + ((data.farmUserPro.treeEnergy / data.farmUserPro.treeTotalEnergy) * 100).toFixed(2) + "%，";
      var str3 = "还剩" + (data.farmUserPro.treeTotalEnergy - data.farmUserPro.treeEnergy) / 10 + "次";
      msgstr = cookies[i].name + ": " + str + str2 + str3;
      if (config.widgetFamily == "small") {
        msgstr = cookies[i].name + ": " + str2.replace("进度", "").replace("，", "");
      }
    }
    if (!!data.farmUserPro && !!data.farmUserPro.shareCode) {
      //console.log(cookies[i].name + "分享码: " + data.farmUserPro.shareCode);
      sharecode += data.farmUserPro.shareCode + "&";
    }

    let date1 = w.addText(msgstr)
    date1.font = Font.semiboldSystemFont(12);
    date1.textColor = Color.black();
    w.addSpacer(3)

  }
  console.log("/submit_activity_codes farm " + sharecode.substr(0, sharecode.length - 1));

  // 更新时间
  var df = new DateFormatter();
  df.dateFormat = 'yyyy-MM-dd hh:mm:ss';
  let gx = df.string(new Date());
  let body = w.addText(gx)
  body.font = Font.mediumRoundedSystemFont(9);
  body.textColor = Color.blue()
  w.addSpacer(3)
  return w
}
async function getData(cookie) {
  var url = 'https://api.m.jd.com/client.action?functionId=initForFarm';

  var req = new Request(url)

  req.headers = {
    'User-Agent': 'jdapp;iPhone;9.2.2;14.2;%E4%BA%AC%E4%B8%9C/9.2.2 CFNetwork/1206 Darwin/20.1.0',
    'Content-Type': 'application/x-www-form-urlencoded',
    "cookie": cookie
  };
  req.method = 'POST';
  req.body = "body=version:4&appid=wh5&clientVersion=9.1.0";
  //console.log(req);
  var data = await req.loadJSON();
  //console.log(data);
  return data
}
