// JavaScript source code

//var html = '测试:<input type="text"/><input type="button" id="btn" value="测试" />$("#btn").click(function () {console.log(1111111);})';
var html = '<!DOCTYPE html><html lang="en"xmlns="http://www.w3.org/1999/xhtml"><head><meta charset="utf-8"/><title></title><script src="https://ajax.aspnetcdn.com/ajax/jquery/jquery-1.10.2.min.js"></script></head><body>测试:<input type="text"/><input id="btn"type="button"value="测试"/></body></html><script>$(function(){$("#btn").click(function(){alert(1111)})})</script>';

$done(html);
