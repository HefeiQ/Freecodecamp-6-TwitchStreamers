$(document).ready(function() {
	
 var userArr = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", 
    "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", 
	"comster404", "thomasballinger", "TR7K", "sheevergaming"];  
 
 //for (var i = 0; i < userArr.length; i++) {
  userArr.forEach(function(userName) {
  var url_streams = "https://api.twitch.tv/kraken/streams/" + encodeURIComponent(userName) + "?callback=?";
  var url_channel, game, logo;
  
  $.getJSON(url_streams, function(json){
   if (json.stream === null) {
	game = "Offline";
	url_channel = json._links.channel;
   } else if (json.stream === undefined) { //must use "==="
	game = "Account closed";
	url_channel = "https://api.twitch.tv/kraken/channels/" + encodeURIComponent(userName) + "?callback=?";
   } else {
	game = json.stream.game;
	url_channel = json._links.channel;
   }  
   $.getJSON(url_channel, function(json) {
    logo = json.logo != null ? json.logo : "noavatar.jpg";
    var text = '<div id = "user' + userName + '" class = "row">' +
	           '<div class = "col-xs-2"> <img class = "logo" src = "' + logo + '"></div>' +
			   '<div class = "col-xs-2">' + 
			   '<a href="https://twitch.tv/' + userName + '" target="_blank">' +
			   '<p>' + userName + '</p></a> </div>' +
			   '<div class = "col-xs-8"> <p>' + game + '</p> </div>' + '</div>'
	if (game != "Account closed" && game != "Offline") {
	  $("#users_list").prepend(text);
	  $("#user" + userName).css({"background-color": "DarkSeaGreen", "line-height": "50px"});
	} else {
	  $("#users_list").append(text);
	  $("#user" + userName).css({"background-color": "DarkGrey", "line-height": "50px"});
	}
	
   });
  });
 
 });
});