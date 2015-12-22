// Description:
//   answers with current temp
//
// Dependencies:
//   dotenv node module
//
// Configuration:
//   Add Open Weather Map API key to environment variable: HUBOT_OWM_APIKEY
//
// Commands:
//   hubot weather in <city>?  - returns current temp

var dotenv = require('dotenv');
dotenv.load();

module.exports = function(robot) {
  robot.hear(/weather in (.*)/i, function(msg) {
    var APIKEY;
    APIKEY = process.env.HUBOT_OWM_APIKEY || null;
    if (APIKEY === null) {
      msg.reply("HUBOT_OWM_APIKEY environment variable is not provided for hubot-weather");
    } else {
      msg.http("http://api.openweathermap.org/data/2.5/weather?q=" + msg.match[1] + "&units=metric&APPID=" + APIKEY).header('Accept', 'application/json').get()(function(err, res, body) {
        var data;
        data = JSON.parse(body);
        if (data.cod == '200') {
          var currentTemp = Math.round(data.main.temp * 1.8 + 32) + "°F";
          msg.reply("It is currently " + currentTemp + " in " + data.name + ".");
        }
      });
    }
  });
}