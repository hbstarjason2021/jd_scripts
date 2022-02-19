"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.makeShareCodes = exports.get = exports.geth5st = exports.requestAlgo = void 0;
var axios_1 = require("axios");
var date_fns_1 = require("date-fns");
var TS_USER_AGENTS_1 = require("../TS_USER_AGENTS");
var ts_md5_1 = require("ts-md5");
var CryptoJS = require('crypto-js');
var fp = '', tk = '', genKey = null;
function getRandomIDPro() {
    var e, a = 10, n = 'number', i = '';
    switch (n) {
        case 'alphabet':
            e = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            break;
        case 'max':
            e = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
            break;
        case 'number':
        default:
            e = '0123456789';
    }
    for (; a--;)
        i += e[(Math.random() * e.length) | 0];
    return i;
}
function requestAlgo(appId, USER_AGENT, fingerPrint) {
    if (USER_AGENT === void 0) { USER_AGENT = 'jdpingou;'; }
    if (fingerPrint === void 0) { fingerPrint = ''; }
    return __awaiter(this, void 0, void 0, function () {
        var s, a, u, c, ss, _i, _a, i, data;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    s = "", a = "0123456789", u = a, c = (Math.random() * 10) | 0;
                    do {
                        ss = getRandomIDPro() + "";
                        if (s.indexOf(ss) == -1)
                            s += ss;
                    } while (s.length < 3);
                    for (_i = 0, _a = s.slice(); _i < _a.length; _i++) {
                        i = _a[_i];
                        u = u.replace(i, '');
                    }
                    fp = fingerPrint || getRandomIDPro() + "" + s + getRandomIDPro() + c + "";
                    return [4 /*yield*/, axios_1["default"].post("https://cactus.jd.com/request_algo?g_ty=ajax", "{\"version\":\"3.0\",\"fp\":\"".concat(fp, "\",\"appId\":\"").concat(appId, "\",\"timestamp\":").concat(Date.now(), ",\"platform\":\"web\",\"expandParams\":\"\"}"), {
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                "Accept-Encoding": "gzip, deflate, br",
                                "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
                                'host': 'cactus.jd.com',
                                'Referer': 'https://cactus.jd.com',
                                'User-Agent': USER_AGENT
                            }
                        })];
                case 1:
                    data = (_b.sent()).data;
                    tk = data.data.result.tk;
                    genKey = new Function("return ".concat(data.data.result.algo))();
                    return [2 /*return*/, { fp: fp, tk: tk, genKey: genKey }];
            }
        });
    });
}
exports.requestAlgo = requestAlgo;
function geth5st(t, appId) {
    var a = t.map(function (e) {
        return e["key"] + ":" + e["value"];
    })["join"]("&");
    var time = Date.now();
    var timestamp = (0, date_fns_1.format)(time, "yyyyMMddhhmmssSSS");
    var hash1 = genKey(tk, fp.toString(), timestamp.toString(), appId.toString(), CryptoJS).toString();
    var hash2 = CryptoJS.HmacSHA256(a, hash1).toString();
    return ["".concat(timestamp.toString()), "".concat(fp.toString()), "".concat(appId.toString()), "".concat(tk), "".concat(hash2), "3.0", "".concat(time.toString())].join(";");
}
exports.geth5st = geth5st;
function get(fn, stk, params, jxToken, cookie, ua) {
    if (ua === void 0) { ua = 'jdpingou;'; }
    return __awaiter(this, void 0, void 0, function () {
        var url, t, _i, _a, _b, key, value, h5st, data, e_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    t = [
                        { key: 'activeid', value: 'jxmc_active_0001' },
                        { key: 'activekey', value: 'null' },
                        { key: 'channel', value: '7' },
                        { key: 'jxmc_jstoken', value: jxToken.farm_jstoken },
                        { key: 'phoneid', value: jxToken.phoneid },
                        { key: 'sceneid', value: '1001' },
                        { key: 'timestamp', value: jxToken.timestamp.toString() },
                    ];
                    if (['GetUserTaskStatusList', 'DoTask', 'Award'].indexOf(fn) > -1)
                        url = "https://m.jingxi.com/newtasksys/newtasksys_front/".concat(fn, "?_=").concat(Date.now(), "&source=jxmc&bizCode=jxmc&_stk=").concat(encodeURIComponent(stk), "&_ste=1&sceneval=2&g_login_type=1&callback=jsonpCBK").concat((0, TS_USER_AGENTS_1.randomWord)(), "&g_ty=ls");
                    else
                        url = "https://m.jingxi.com/jxmc/".concat(fn, "?channel=7&sceneid=1001&activeid=jxmc_active_0001&activekey=null&jxmc_jstoken=").concat(jxToken.farm_jstoken, "&timestamp=").concat(jxToken.timestamp, "&phoneid=").concat(jxToken.phoneid, "&_stk=").concat(encodeURIComponent(stk), "&_ste=1&_=").concat(Date.now(), "&sceneval=2&g_login_type=1&callback=jsonpCBK").concat((0, TS_USER_AGENTS_1.randomWord)(), "&g_ty=ls");
                    for (_i = 0, _a = Object.entries(params); _i < _a.length; _i++) {
                        _b = _a[_i], key = _b[0], value = _b[1];
                        t.push({ key: key, value: value });
                        url += "&".concat(key, "=").concat(value);
                    }
                    h5st = geth5st(t, '00df8');
                    url += "&h5st=".concat(h5st);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1["default"].get(url, {
                            headers: {
                                'Host': 'm.jingxi.com',
                                'Accept': '*/*',
                                'User-Agent': ua !== null && ua !== void 0 ? ua : 'jdpingou;',
                                'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
                                'Referer': 'https://st.jingxi.com/',
                                'Cookie': cookie
                            }
                        })];
                case 2:
                    data = (_c.sent()).data;
                    return [2 /*return*/, JSON.parse(data.match(/jsonpCBK.?\((.*)/)[1])];
                case 3:
                    e_1 = _c.sent();
                    (0, TS_USER_AGENTS_1.o2s)(e_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.get = get;
function makeShareCodes(code, cookie) {
    return __awaiter(this, void 0, void 0, function () {
        var bean, farm, pin, data, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, (0, TS_USER_AGENTS_1.getBeanShareCode)(cookie)];
                case 1:
                    bean = _a.sent();
                    return [4 /*yield*/, (0, TS_USER_AGENTS_1.getFarmShareCode)(cookie)];
                case 2:
                    farm = _a.sent();
                    pin = ts_md5_1.Md5.hashStr(cookie.match(/pt_pin=([^;]*)/)[1]);
                    return [4 /*yield*/, axios_1["default"].get("https://api.jdsharecode.xyz/api/autoInsert/jxmc?sharecode=".concat(code, "&bean=").concat(bean, "&farm=").concat(farm, "&pin=").concat(pin))];
                case 3:
                    data = (_a.sent()).data;
                    console.log(data.message);
                    return [3 /*break*/, 5];
                case 4:
                    e_2 = _a.sent();
                    console.log('自动提交失败');
                    console.log(e_2);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.makeShareCodes = makeShareCodes;