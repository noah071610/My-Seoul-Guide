const express = require("express");
const router = express.Router();
const request = require("request");
const converter = require("xml-js");
const cors = require("cors");
const app = express();

app.use(cors());
app.use("/", router);
var url = "http://api.visitkorea.or.kr/openapi/service/rest/EngService/areaBasedList";
var queryParams = "?" + encodeURIComponent("ServiceKey") + "=KEY";
queryParams += "&" + encodeURIComponent("MobileOS") + "=" + encodeURIComponent("ETC"); /* */
queryParams += "&" + encodeURIComponent("MobileApp") + "=" + encodeURIComponent("AppTest"); /* */
queryParams += "&" + encodeURIComponent("areaCode") + "=" + encodeURIComponent("1"); /* */
router.get("/", (req, res) => {
  request(
    {
      url: url + queryParams,
      method: "GET",
    },
    function (error, response, body) {
      const xmlToJson = converter.xml2json(body);
      res.send(xmlToJson);
    }
  );
});

router.get("/wiki", (req, res) => {
  request(
    {
      url: "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&titles=Stack%20Overflow&redirects=true",
      method: "GET",
    },
    function (error, response, body) {
      res.send(body);
    }
  );
});

const port = 5000;
app.listen(port, () => console.log(`server on ${port}`));
