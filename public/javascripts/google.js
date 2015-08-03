var info = document.getElementsByClassName('location');

console.log(info);
var regex = new RegExp("<p>", "g");
var reg = new RegExp("</p>", "g");
var quote = new RegExp('"', "g");
var empty = [];
var latt=0;
var long = 0;
for (var i = 0; i < info.length; i++) {

 var clean = info[i].innerHTML.replace(regex, "").replace(reg, ", ").replace(quote,"").trim().split(",");
 var name = [clean[0].toString(), " Price"+clean[3].toString(), " Spots Open"+clean[4].toString()];
 var lat=(Number(clean[1]));
 var lng= (Number(clean[2]));
 latt+=(lat);
long+=(lng);
 //console.log(long);
 empty.push([name, lat, lng]);

}
//console.log(empty);
var avglat = latt/(info.length);
var avglong = long/(info.length);
//console.log(avglat);
//console.log(avglong);


var map = new google.maps.Map(document.getElementById('map'), {
     zoom: 15,
     center: new google.maps.LatLng(avglat, avglong),
     mapTypeId: google.maps.MapTypeId.ROADMAP
   });

   var infowindow = new google.maps.InfoWindow();

   var marker, i;

   for (i = 0; i < empty.length; i++) {
     marker = new google.maps.Marker({
       position: new google.maps.LatLng(empty[i][1], empty[i][2]),
       map: map
     });

     google.maps.event.addListener(marker, 'click', (function(marker, i) {
       return function() {
         infowindow.setContent(empty[i][0]);
         infowindow.setContent(empty[i][1]);
         infowindow.open(map, marker);
       };
     })(marker, i));
   }
