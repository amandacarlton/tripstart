

var date =  function (input) {
  input = input.split("-");
  return (input[1]+"/"+input[2]+"/"+input[0]);
};


var cars = {
  "ECAR": "Economy Car",
  "CCAR": "Compact Car",
  "FCAR": "Full-size Car",
  "FFAR": "Full-size SUV",
  "FRAR": "Full-size SUV",
  "ICAR": "Mid-size Car",
  "IFAR": "Mid-size SUV",
  "LCAR": "Luxury Car",
  "MVAR": "Minivan",
  "PCAR": "Premium Car",
  "SCAR": "Standard Car",
  "SFAR": "Standard SUV",
  "SPAR": "Standard Pickup Truck",
  "STAR": "Convertible Car",
  "SXAR": "Special Car",
  "XXAR": "Special Car"
};

var cartype = function (data) {
  for (var i = 0; i < data.length; i++) {
    data[i].CarTypeCode = cars[data[i].CarTypeCode];
  }
  return data;
};



module.exports={date:date,
          cartype:cartype};
