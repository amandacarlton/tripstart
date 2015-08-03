var express = require('express');
var router = express.Router();
var Hotwire = require('hotwire');
var hotwire = new Hotwire('g4hyhkdzkw2per9j7qj4sd9e');
var unirest = require('unirest');
/* GET home page. */



router.get("/", function(req, res, next) {
res.render('index');
});

router.post('/', function(req, res, next) {
  hotwire.tripStarterHotelSearch({format: 'json', price: '*~'+req.body.price, sort: 'date', limit: 80}, function (err, response, body) {
    var data = JSON.parse(body);
    console.log(data.Result.length);
    var place = [];
    var content=[];
  for (var i = 0; i<data.Result.length; i++){
    console.log(data.Result[i].DestinationCity);
  if(place.indexOf(data.Result[i].DestinationCity)<0){
    place.push(data.Result[i].DestinationCity);
    content.push(data.Result[i]);
  }
  }
  console.log(place);
  console.log(content);
  res.render('vacay', { info: content });
});
});

router.get("/parking/info", function(req, res, next){
  res.render("parkingselect");
});

router.post("/parking", function(req, res, next){
  unirest.get('http://api.parkwhiz.com/search/?destination='+req.body.address+'&key=ff13aa2d2794c136803139ed99ab329f')
.end(function (result) {
  console.log(result.body);

  res.render('parking', {result:result.body.parking_listings});

});
});

module.exports = router;
