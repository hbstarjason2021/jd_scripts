

const url = `https://aweme-hl.snssdk.com/luckycat/aweme/v1/task/done/read?version_code=13.2.0&js_sdk_version=1.77.0.2&tma_jssdk_version=1.77.0.2&app_name=douyin_lite&app_version=13.2.0&vid=EC47716C-499A-468E-939B-E88153DE5BDA&device_id=58019842405&channel=App%20Store&mcc_mnc=46001&aid=2329&screen_width=1242&openudid=51dde9612de490a2a6e3f7f01f1b1c08ff159384&cdid=2E5FBF3D-B629-432C-86A2-A786BB4F6696&os_api=18&ac=WIFI&os_version=14.1&client_niu_ready=0&device_platform=iphone&build_number=132004&iid=1231106148139966&device_type=iPhone11,6&idfa=00000000-0000-0000-0000-000000000000`;
const method = `POST`;
const headers = {
    'X-SS-DP' : `2329`,
    'Connection' : `keep-alive`,
    'x-tt-trace-id' : `00-e35dc96c09d824089651ccb7df2d0919-e35dc96c09d82408-01`,
    'X-SS-Cookie' : `excgd=20210109; MONITOR_WEB_ID=58019842405; install_id=1231106148139966; ttreq=1$7426039a54fe5b3b203a5d6523197873b87d85d4; d_ticket=c1623859b15c6a537f666ba763526bfae5dc4; n_mh=m0oKiz98USQUmLaYnIywdG_TqxQzF0WGLA1V497lgec; odin_tt=c0e79db1af3b8ee165e5e82d85cd6348ea23f82bb83bbec5069cd33aff8c3de1ce2d9e93ad751faa7d99856ff0ec218b; sessionid=28da756a83c20a0fcc8f0a1337cdbb90; sessionid_ss=28da756a83c20a0fcc8f0a1337cdbb90; sid_guard=28da756a83c20a0fcc8f0a1337cdbb90%7C1609848710%7C5184000%7CSat%2C+06-Mar-2021+12%3A11%3A50+GMT; sid_tt=28da756a83c20a0fcc8f0a1337cdbb90; uid_tt=29451fbbc5da500562ff24bcc28a3909; uid_tt_ss=29451fbbc5da500562ff24bcc28a3909; passport_csrf_token=bd832873dbd1f24292aa8f4eb98aa4f4; passport_csrf_token_default=bd832873dbd1f24292aa8f4eb98aa4f4`,
    'sdk-version' : `2`,
    'Accept-Encoding' : `gzip, deflate, br`,
    'Content-Type' : `application/json; encoding=utf-8`,
    'x-Tt-Token' : `0028da756a83c20a0fcc8f0a1337cdbb9000124c82ea5cd2c613fb4704387b7a05e7d2a37ae01f1a0f3a83bf0cc583774d2093a4755b962a957ff2fcbb714b5d2060b46f3d3d6c0722c393921a69a83223191-1.0.0`,
    'X-SS-STUB' : `FB9613E49BC1669D908E1516EBF9F7B5`,
    'X-Khronos' : `1610132342`,
    'User-Agent' : `AwemeLite 13.2.0 rv:132004 (iPhone; iOS 14.1; zh_CN) Cronet`,
    'tt-request-time' : `1610132342773`,
    'Cookie' : `excgd=20210109; passport_csrf_token=bd832873dbd1f24292aa8f4eb98aa4f4; passport_csrf_token_default=bd832873dbd1f24292aa8f4eb98aa4f4; d_ticket=c1623859b15c6a537f666ba763526bfae5dc4; n_mh=m0oKiz98USQUmLaYnIywdG_TqxQzF0WGLA1V497lgec; odin_tt=c0e79db1af3b8ee165e5e82d85cd6348ea23f82bb83bbec5069cd33aff8c3de1ce2d9e93ad751faa7d99856ff0ec218b; sessionid=28da756a83c20a0fcc8f0a1337cdbb90; sessionid_ss=28da756a83c20a0fcc8f0a1337cdbb90; sid_guard=28da756a83c20a0fcc8f0a1337cdbb90%7C1609848710%7C5184000%7CSat%2C+06-Mar-2021+12%3A11%3A50+GMT; sid_tt=28da756a83c20a0fcc8f0a1337cdbb90; uid_tt=29451fbbc5da500562ff24bcc28a3909; uid_tt_ss=29451fbbc5da500562ff24bcc28a3909; install_id=1231106148139966; ttreq=1$7426039a54fe5b3b203a5d6523197873b87d85d4`,
    'Host' : `aweme-hl.snssdk.com`,
    'passport-sdk-version' : `5.12.1`,
    'X-Tyhon' : `vApIpEVUUJR8aFOmc346zm13fZt1dzyPc09AM0o=`,
    'X-Gorgon' : `8404409f100054cd39a3b25a96c7128ebd25fd3d0c1f941fdaba`,
    'Accept' : `application/json`
};
const body = `{
    "in_sp_time" : 0,
    "task_key" : "read"
}`;

const myRequest = {
    url: url,
    method: method,
    headers: headers,
    body: body
};

$task.fetch(myRequest).then(response => {
    console.log(response.statusCode + "\n\n" + response.body);
$done();
}, reason => {
    console.log(reason.error);
$done();
});