var body=$response.body;
var obj=JSON.parse(body);
obj.hasRailSet=true;
$done({body:JSON.stringify(obj)});