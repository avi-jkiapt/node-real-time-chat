$(function(){

  var socket = io();

  socket.on('connect',function() {
    console.log("Connected to server");
});

socket.on('disconnect',function() {
 console.log("DisConnected to server");
});

var message = $('#message');
var send = $('#send');
var messagecomes = $('#messagecomes');
var location = $('#location');

send.click(function(){
  socket.emit('newMessage',{text : message.val(),from: 'Anonymous'});
  $('#message').val('');
});

location.click(function(){
  if (!navigator.geolocation){
       socket.emit('newMessage',{text : 'Geolocation is not supported by your browser' ,from: 'Anonymous'});
   }
   else{

     function getPosition(position) {
       var currentLocation="";
               var latitude  = position.coords.latitude;
               var longitude = position.coords.longitude;
          currentLocation = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";
         socket.emit('newMessage',{text :'Current Location  ' + currentLocation ,from: 'Anonymous'});
    }
     navigator.geolocation.getCurrentPosition(getPosition);

   }

});



socket.on('newMessage',(data) => {
  messagecomes.append('<div id="home"><p><span id="user">' +data.from +'</span> :<span id="msg"> ' + data.text + '</span></p></div>');
});


});
