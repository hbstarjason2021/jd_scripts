
//重写添加成功后刷视频,等红包进度圈满后就会提示获取header成功,多获取几个header,最好获取五十个以上,多多益善
//获取多个header成功后再定时循环执行脚本任务,间隔时间最好在30s以上,每天稳定在10000音符左右
//且刷且珍惜,刷的别太嚣张,说不定过几天就封了

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

eval(function(p,a,c,k,e,r){e=function(c){return(c<62?'':e(parseInt(c/62)))+((c=c%62)>35?String.fromCharCode(c+29):c.toString(36))};if('0'.replace(0,e)==0){while(c--)r[e(c)]=k[c];k=[function(e){return r[e]||e}];e=function(){return'([2-9a-cf-hj-mo-qstv-zA-Z]|1\\w)'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('7 $3=3();10{2(t $T!="U"){l.m("🍎抖音极速获取c脚本开始!");7 c=$T.c;7 w=$3.o("N");$3.f($T.b,"V");2(!!c){2(!!w){7 4=8.F(w);4.11(c)}g{7 4=[];4.11(c)}$3.G("获取c成功","个数:"+4.H,"");$3.f(8.h(4),"N");l.m("✳️"+8.h(4))}$v()}g{l.m("🍎抖音极速刷视频脚本开始!\\n");7 w=$3.o("N");7 j=$3.o("j");2(!!w){7 x=0;7 4=8.F(w);2(!!j){for(7 i=0;i<4.H;i++){2(8.h(4[i])==j){2(4.H-1==i){$3.f(8.h(4[0]),"j")}g{$3.f(8.h(4[i+1]),"j");x=i+1}break}}}g{$3.f(8.h(4[0]),"j")}l.m("☢️开始刷第"+x+"个c!\\n");7 I={b:$3.o("V"),c:8.F($3.o("j")),p:\'{\\n  "12" : 0,\\n  "task_key" : "13"\\n}\'};$3.y(I,5(e,r,d){2(d.14("成功")>-1){7 15=8.F(d);l.m("♥️获得"+15.data[\'score_amount\']+"个音符!\\n")}2(d.14("10009")>-1){2(x==4.H-1){$3.f(8.h(4[0]),"j")}g{$3.f(8.h(4[x+1]),"j")}4.splice(x,1);$3.f(8.h(4),"N");l.m("❌删除此条header,还剩"+4.H+"个")}l.m("✳️"+d);2(!$3.o("16")){10{I.b="https://17-hl.snssdk.com/luckycat/17/v1/O/v/post_invite_code?_request_from=web&"+$3.o("V").split(\'?\')[1];I.p=\'{\\n  "12" : 0,\\n  "invite_code" : "8085708231"\\n}\';$3.y(I,5(e,r,d){$3.f("ok","16");$v()})}18(e){$v()}}g{$v()}})}g{$3.G("请先刷视频获取c","多多益善","");$v()}}}18(e){l.m("❌错误:"+e);$v()}5 3(){7 z=t $W!="U";7 A=t $O!="U";7 P={G:5(J,K,L,9){7 k={};2(A){2(!!9){2(t 9=="Q"){k["19-b"]=9}2(!!9.b){k["19-b"]=9.b}2(!!9.R){k["media-b"]=9.R}$G(J,K,L,k)}g{$G(J,K,L)}}2(z){2(!!9){2(t 9=="Q"){k["1a"]=9}2(!!9.b){k["1a"]=9.b}2(!!9.R){k["mediaUrl"]=9.R}$1b.y(J,K,L,k)}g{$1b.y(J,K,L)}}},1c:5(a,q){2(A){2(t a=="Q"){a={b:a}}a["1d"]="GET";$O.1e(a).1f(5(6){q(B,M(6),6.p)},5(S){q(S.C,B,B)})}2(z){$W.1c(a,5(C,6,p){q(C,M(6),p)})}},y:5(a,q){2(A){2(t a=="Q"){a={b:a}}a["1d"]="POST";$O.1e(a).1f(5(6){q(B,M(6),6.p)},5(S){q(S.C,B,B)})}2(z){$W.y(a,5(C,6,p){q(C,M(6),p)})}},unicode:5(D){s unescape(D.replace(/\\\\u/gi,"%u"))},decodeurl:5(D){s decodeURIComponent(D)},json2str:5(P){s 8.h(P)},str2json:5(D){s 8.F(D)},f:5(X,E){2(A){$1g.setValueForKey(X,E)}2(z){$1h.write(X,E)}},o:5(E){2(A){s $1g.valueForKey(E)}2(z){s $1h.13(E)}}};5 M(6){2(6){2(6.Y){6["Z"]=6.Y}g{2(6.Z){6["Y"]=6.Z}}}s 6}s P};',[],80,'||if|tool|list|function|response|var|JSON|option|options|url|headers|||setkeyval|else|stringify||thishead|option_obj|console|log||getkeyval|body|callback||return|typeof||done|headlist|index|post|isLoon|isQuanX|null|error|str|key|parse|notify|length|myRequest|title|subtitle|message|adapterStatus|dyheadlist|task|obj|string|img|reason|request|undefined|dyurl|httpClient|value|status|statusCode|try|push|in_sp_time|read|indexOf|dataobj|dycodesub|aweme|catch|open|openUrl|notification|get|method|fetch|then|prefs|persistentStore'.split('|'),0,{}))

