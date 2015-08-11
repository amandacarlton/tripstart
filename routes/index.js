var express = require('express');
var router = express.Router();
var Hotwire = require('hotwire');
var hotwire = new Hotwire('g4hyhkdzkw2per9j7qj4sd9e');
var unirest = require('unirest');
var routefunction = require("../lib/routefunction.js");
var use;
/* GET home page. */



router.get("/", function(req, res, next) {
res.render('index');
});

router.post('/', function(req, res, next) {
  hotwire.tripStarterHotelSearch({format: 'json', price: '*~'+req.body.price, sort: 'date', limit: 80}, function (err, response, body) {
    var data = JSON.parse(body);
    var place = [];
    var content=[];
  for (var i = 0; i<data.Result.length; i++){
  if(place.indexOf(data.Result[i].DestinationCity)<0){
    place.push(data.Result[i].DestinationCity);
    content.push(data.Result[i]);
  }
}
  res.render('vacay', { info: content });
});
});

router.get("/parking/info", function(req, res, next){
  res.render("parkingselect");
});

router.post("/parking", function(req, res, next){
  unirest.get('http://api.parkwhiz.com/search/?destination='+req.body.address+'&key=ff13aa2d2794c136803139ed99ab329f')
.end(function (result) {
  res.redirect('parking', {result:result.body.parking_listings});

});
});

router.get("/rental", function(req, res, next){
  res.render("rentalselect");
});

router.post("/rental", function (req, res, next){
  var master ={};
  var start = routefunction.date(req.body.pdate);
  var end = routefunction.date(req.body.edate);
  //console.log(start);
  hotwire.rentalCarSearch({format: 'json', dest: req.body.address, startdate: start, enddate: end, pickuptime: req.body.stime, dropofftime: req.body.etime}, function (err, response, body) {
    var data = JSON.parse(body);
    console.log(data);
  var type = routefunction.cartype(data.Result);
  console.log(type);
    res.render("rental", {info:type});
});
});

router.get("/hotel", function(req, res, next){
  res.render("hotelselect");
});

router.post("/hotel", function (req, res, next){
  var start = routefunction.date(req.body.pdate);
  var end = routefunction.date(req.body.edate);
  //console.log(start);
  hotwire.hotelSearch({format: 'json', dest: req.body.address, rooms: req.body.rooms, adults: req.body.adults, children: req.body.kids, startdate: start, enddate: end}, function (err, response, body) {
    var data = JSON.parse(body);
    console.log(data);
    res.render('hotel');
});
});

// router.get("/hotel/deals", function (req, res, next){
//   hotwire.hotelDeals({format: 'json', dest: 'Chicago'}, function (err, response, body) {
//     var data = JSON.parse(body);
//     console.log(data);
//     res.render('hotel');
// });
// });

module.exports = router;
