
var res = JSON.parse($response.body);

var res = JSON.parse(str);
res.info.drama.pay_type = 0;
res.info.drama.type = 0;
res.info.drama.need_pay = 0;

for (let index = 0; index < res.info.episodes.episode.length; index++) {
    res.info.episodes.episode[index].pay_type = 0;
    res.info.episodes.episode[index].type = 0;
    res.info.episodes.episode[index].need_pay = 0;
}
console.log(JSON.stringify(res));
$done({ body: JSON.stringify(res) })

