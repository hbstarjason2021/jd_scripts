
var res = JSON.parse($response.body);

res.info.price=0;
res.info.need_pay = 0;

console.log(JSON.stringify(res));
$done({ body: JSON.stringify(res) })

