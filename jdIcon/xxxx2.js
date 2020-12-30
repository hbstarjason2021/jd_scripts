var body=$response.body;
var obj=JSON.parse(body);
obj.data.hasRailSet=true;
$done({body:JSON.stringify(obj)});