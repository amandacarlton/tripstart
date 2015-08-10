var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/tripstart');
var users = db.get('users');
var bcrypt = require('bcrypt');


router.get("/signup", function (req, res, next) {
  res.render("auth/signup");
});

router.post("/signup" , function (req, res, next) {
  var hash = bcrypt.hashSync(req.body.password, 8);
  users.insert({email:req.body.email, password:hash});
  res.redirect("/");
});


router.post("/login", function (req, res, next) {
  users.findOne({email:req.body.email}, function(err, data){
      if(data){
        var compare= data.password;
        var statement;
        if (bcrypt.compareSync(req.body.password, compare)){
          res.redirect("/");
        }else{
          statement="Password does not match";
          res.render("index", {statement:statement, title:"All the Bars"});
        }
      }
      else{
        var message="Email does not exist";
        res.render("index", {message:message, title:"All the Bars"});
      }

    });
  });
module.exports = router;
