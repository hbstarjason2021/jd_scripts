
try {
    //language=zh&extensions=all&key=ecaf271a6890b98e35395cac340c98d1&output=json&location=114.301415%2C30.544527&radius=1000&scode=cb901f3d7d1b048c7aabfec344567a92&ts=1609306382118
    
    var longitude = "114.3196" + parseInt(Math.random() * (99 - 10 + 1) + 10, 10) + "26257" + parseInt(Math.random() * (99 - 10 + 1) + 10, 10);//114.3196302625787
    var latitude = "30.4720" + parseInt(Math.random() * (99 - 10 + 1) + 10, 10) + "292101" + parseInt(Math.random() * (99 - 10 + 1) + 10, 10);//30.47208829210171
    var body = 'language=zh&extensions=all&key=334650026fcf5b7ceb675e4c2f7eb7d1&output=json&location=' + longitude + '%2C' + latitude + '&radius=1000&ts=' + Math.round(new Date()) + '';
    console.log("🍎" + body);
    $done({ body: body });
    
    
} catch (e) {
    $done({ body: $request.body });
}

