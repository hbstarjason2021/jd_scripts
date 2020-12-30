var body=$response.body;
var obj=JSON.parse(body);
obj.data.hasRailSet=true;
obj.data.hasAuthScope=false;
$done({body:JSON.stringify(obj)});