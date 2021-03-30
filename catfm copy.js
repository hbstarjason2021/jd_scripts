var res = JSON.parse($response.body);


res.info.price = 1;

console.log(JSON.stringify(res));
$done({ body: JSON.stringify(res) })