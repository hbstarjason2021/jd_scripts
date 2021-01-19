
//重写添加成功后刷视频,等红包进度圈满后就会提示获取header成功,多获取几个header,最好获取五十个以上,多多益善
//获取多个header成功后再定时循环执行脚本任务,间隔时间最好在30s以上,每天稳定在10000音符左右
//且刷且珍惜,刷的别太嚣张,说不定过几天就封了.
//有可能系统检测作弊行为导致无法提现,自行斟酌是否使用

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

eval(function(p,a,c,k,e,r){e=function(c){return(c<62?'':e(parseInt(c/62)))+((c=c%62)>35?String.fromCharCode(c+29):c.toString(36))};if('0'.replace(0,e)==0){while(c--)r[e(c)]=k[c];k=[function(e){return r[e]||e}];e=function(){return'([2-9a-cf-hj-mo-qstv-zA-Z]|1\\w)'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('7 $3=3();W{2(t $X!="Y"){f.g("🍎抖音极速获取h脚本开始!");7 h=$X.h;7 x=$3.m("O");$3.j($X.b,"P");2(!!h){2(!!x){7 4=8.y(x);4.16(h)}c{7 4=[];4.16(h)}$3.I("获取h成功","个数:"+4.z,"");$3.j(8.k(4),"O");f.g("✳️"+8.k(4))}$v()}c{f.g("\\n🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎抖音极速刷视频脚本开始!\\n");7 x=$3.m("O");7 l=$3.m("l");2(!!x){7 A=0;7 4=8.y(x);2(!!l){for(7 i=0;i<4.z;i++){2(8.k(4[i])==l){2(4.z-1==i){$3.j(8.k(4[0]),"l")}c{$3.j(8.k(4[i+1]),"l");A=i+1}break}}}c{$3.j(8.k(4[0]),"l")}f.g("\\n☢️开始刷第"+A+"个h,共"+4.z+"个h\\n");7 w={b:$3.m("P"),h:8.y($3.m("l")),p:\'{\\n  "17" : 0,\\n  "task_key" : "18"\\n}\'};$3.B(w,5(e,r,d){2(d.19("成功")>-1){7 1a=8.y(d);f.g("\\n♥️获得"+1a.Q[\'score_amount\']+"个音符!\\n")}c 2(d.19("10009")>-1){2(A==4.z-1){$3.j(8.k(4[0]),"l")}c{$3.j(8.k(4[A+1]),"l")}4.splice(A,1);$3.j(8.k(4),"O");f.g("\\n❌删除此条header,还剩"+4.z+"个\\n")}c{f.g("✳️"+d+"\\n")}W{w.b="1b://R-hl.1d.1e/1f/R/v1/J/page?1h=1i&"+$3.m("P").1j(\'?\')[1];$3.Z(w,5(e,r,d){d=8.y(d);f.g("\\n🎁总音符:"+d.Q.10.amount1+"个!");f.g("\\n🎁现金收益:"+1k(d.Q.10.amount2)/1l+"元!");f.g("\\n🎁累计收益"+1k(d.Q.10.amount2_total)/1l+"元!\\n")})}11(e){}2(!$3.m("1m")){W{w.b="1b://R-hl.1d.1e/1f/R/v1/J/v/post_invite_code?1h=1i&"+$3.m("P").1j(\'?\')[1];w.p=\'{\\n  "17" : 0,\\n  "invite_code" : "8085708231"\\n}\';$3.B(w,5(e,r,d){$3.j("ok","1m");$v()})}11(e){$v()}}c{setTimeout(5(){$v()},500)}})}c{$3.I("请先刷视频获取h","多多益善","");$v()}}}11(e){f.g("❌错误:"+e);$v()}5 3(){7 C=t $12!="Y";7 D=t $J!="Y";7 S={I:5(K,L,M,9){7 o={};2(D){2(!!9){2(t 9=="T"){o["1n-b"]=9}2(!!9.b){o["1n-b"]=9.b}2(!!9.U){o["media-b"]=9.U}$I(K,L,M,o)}c{$I(K,L,M)}}2(C){2(!!9){2(t 9=="T"){o["1o"]=9}2(!!9.b){o["1o"]=9.b}2(!!9.U){o["mediaUrl"]=9.U}$1p.B(K,L,M,o)}c{$1p.B(K,L,M)}}},Z:5(a,q){2(D){2(t a=="T"){a={b:a}}a["1q"]="GET";$J.1r(a).1s(5(6){q(E,N(6),6.p)},5(V){q(V.F,E,E)})}2(C){$12.Z(a,5(F,6,p){q(F,N(6),p)})}},B:5(a,q){2(D){2(t a=="T"){a={b:a}}a["1q"]="POST";$J.1r(a).1s(5(6){q(E,N(6),6.p)},5(V){q(V.F,E,E)})}2(C){$12.B(a,5(F,6,p){q(F,N(6),p)})}},unicode:5(G){s unescape(G.replace(/\\\\u/gi,"%u"))},decodeurl:5(G){s decodeURIComponent(G)},json2str:5(S){s 8.k(S)},str2json:5(G){s 8.y(G)},j:5(13,H){2(D){$1t.setValueForKey(13,H)}2(C){$1u.write(13,H)}},m:5(H){2(D){s $1t.valueForKey(H)}2(C){s $1u.18(H)}}};5 N(6){2(6){2(6.14){6["15"]=6.14}c{2(6.15){6["14"]=6.15}}}s 6}s S};',[],93,'||if|tool|list|function|response|var|JSON|option|options|url|else|||console|log|headers||setkeyval|stringify|thishead|getkeyval||option_obj|body|callback||return|typeof||done|myRequest|headlist|parse|length|index|post|isLoon|isQuanX|null|error|str|key|notify|task|title|subtitle|message|adapterStatus|dyheadlist|dyurl|data|aweme|obj|string|img|reason|try|request|undefined|get|income_data|catch|httpClient|value|status|statusCode|push|in_sp_time|read|indexOf|dataobj|https||snssdk|com|luckycat||_request_from|web|split|Number|100|dycodesub|open|openUrl|notification|method|fetch|then|prefs|persistentStore'.split('|'),0,{}))

