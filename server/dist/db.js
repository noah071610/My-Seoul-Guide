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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.getNearRecommends = exports.getFoodRecommends = exports.getShoppingRecommends = exports.getActivities = void 0;
var xml_js_1 = __importDefault(require("xml-js"));
var dotenv_1 = __importDefault(require("dotenv"));
var node_fetch_1 = __importDefault(require("node-fetch"));
dotenv_1["default"].config();
// for (let i = 0; i < contents.item.length; i++) {
//   const getOneOverview = await fetch(
//     `http://api.visitkorea.or.kr/openapi/service/rest/EngService/detailCommon?ServiceKey=${process.env.TOUR_SERVICE_KEY}&contentTypeId=${typeNum}&contentId=${contents.item[i].contentid._text}&MobileOS=ETC&MobileApp=TourAPI3.0_Guide&&overviewYN=Y`
//   )
//     .then((res) => res.text())
//     .then((data) => {
//       let content = JSON.parse(convert.xml2json(data, { compact: true })).response.body.items
//         .item;
//       return content.overview;
//     });
//   contents.item[i].overview = getOneOverview;
var getActivities = function (typeNum, pageNum) { return __awaiter(void 0, void 0, void 0, function () {
    var contents;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, node_fetch_1["default"]("http://api.visitkorea.or.kr/openapi/service/rest/EngService/areaBasedList?ServiceKey=" + process.env.TOUR_SERVICE_KEY + "&contentTypeId=" + typeNum + "&areaCode=1&sigunguCode=&cat1=A02&cat2=&cat3=&listYN=Y&MobileOS=ETC&MobileApp=TourAPI3.0_Guide&arrange=B&numOfRows=12&pageNo=" + pageNum)
                    .then(function (res) { return res.text(); })
                    .then(function (data) {
                    // XML을 JSON으로 바꿔줍니다. xml2json 라이브러리를 사용했습니다.
                    var contents = JSON.parse(xml_js_1["default"].xml2json(data, { compact: true })).response.body.items;
                    return contents;
                })];
            case 1:
                contents = _a.sent();
                return [2 /*return*/, contents.item];
        }
    });
}); };
exports.getActivities = getActivities;
var getFoodRecommends = function (isFood) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (isFood) {
            return [2 /*return*/, node_fetch_1["default"]("http://api.visitkorea.or.kr/openapi/service/rest/EngService/areaBasedList?ServiceKey=" + process.env.TOUR_SERVICE_KEY + "&contentTypeId=82&areaCode=1&sigunguCode=&cat1=A05&cat2=&cat3=&listYN=Y&MobileOS=ETC&MobileApp=TourAPI3.0_Guide&arrange=P&numOfRows=12&pageNo=1")
                    .then(function (res) { return res.text(); })
                    .then(function (data) {
                    var contents = JSON.parse(xml_js_1["default"].xml2json(data, { compact: true })).response.body.items.item.slice(0, 3);
                    return contents;
                })];
        }
        return [2 /*return*/];
    });
}); };
exports.getFoodRecommends = getFoodRecommends;
var getShoppingRecommends = function (isShopping) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (isShopping) {
            return [2 /*return*/, node_fetch_1["default"]("http://api.visitkorea.or.kr/openapi/service/rest/EngService/areaBasedList?ServiceKey=" + process.env.TOUR_SERVICE_KEY + "&contentTypeId=79&areaCode=1&sigunguCode=&cat1=A04&cat2=A0401&cat3=&listYN=Y&MobileOS=ETC&MobileApp=TourAPI3.0_Guide&arrange=B&numOfRows=12&pageNo=1")
                    .then(function (res) { return res.text(); })
                    .then(function (data) {
                    var contents = JSON.parse(xml_js_1["default"].xml2json(data, { compact: true })).response.body.items.item.slice(0, 3);
                    return contents;
                })];
        }
        return [2 /*return*/];
    });
}); };
exports.getShoppingRecommends = getShoppingRecommends;
var getNearRecommends = function (mapx, mapy) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, node_fetch_1["default"]("http://api.visitkorea.or.kr/openapi/service/rest/EngService/locationBasedList?ServiceKey=" + process.env.TOUR_SERVICE_KEY + "&contentTypeId=&mapX=" + mapx + "&mapY=" + mapy + "&radius=2000&listYN=Y&MobileOS=ETC&MobileApp=TourAPI3.0_Guide&arrange=B&numOfRows=12&pageNo=1")
                .then(function (res) { return res.text(); })
                .then(function (data) {
                var contents = JSON.parse(xml_js_1["default"].xml2json(data, { compact: true })).response.body.items.item.slice(0, 9);
                return contents;
            })];
    });
}); };
exports.getNearRecommends = getNearRecommends;
