// Description:
//   answers with Denver weather
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot what's the weather?  - returns current temp

var dotenv = require('dotenv');
dotenv.load();

module.exports = function(robot) {
  robot.respond(/weather in (.*)/i, function(msg) {
    var APIKEY;
    APIKEY = process.env.HUBOT_OWM_APIKEY || null;
    if (APIKEY === null) {
      msg.send("HUBOT_OWM_APIKEY environment varibale is not provided for hubot-weather");
    } else {
      msg.http("http://api.openweathermap.org/data/2.5/weather?q=" + msg.match[1] + "&units=metric&APPID=" + APIKEY).header('Accept', 'application/json').get()(function(err, res, body) {
        var data;
        data = JSON.parse(body);
        if (data.cod == '200') {
          var currentTemp = Math.round(data.main.temp * 1.8 + 32) + "°F";
          msg.send("It is currently " + currentTemp + " in " + data.name + ".");
        } else {
          msg.send("Sorry, I coulnd't get the weather for " + msg.match[1] + ".");
        }
      });
    }
  });
}