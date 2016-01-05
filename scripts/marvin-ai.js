// Description:
//   Routes all responses through the Wit.ai engine
//
// Dependencies:
//   Request
//
// Configuration:
//   Add Wit.ai API key to environment variable: HUBOT_WIT_AI_TOKEN
//
// Commands:
//   Anything, he learns.

var dotenv = require('dotenv');
dotenv.load();

var request = require('request');

var confidenceThres = 0.6;

module.exports = function (robot) {
  APIKEY = process.env.HUBOT_WIT_AI_TOKEN || null;
  
  robot.respond(/(.*)/i, function (res) {
    var userTextRaw = res.match[1];
    var userText = userTextRaw.replace(/ /g,"%20"); // Striping out spaces for the api request
    var apiUrl = 'https://api.wit.ai/message?v=20160104&q=' + userText;
    request.get(apiUrl, {
      'auth': {
        'bearer': APIKEY
      }
    }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var responseJson = JSON.parse(body);
        var confidence = responseJson.outcomes[0].confidence;
        var intent = responseJson.outcomes[0].intent;
        var entities = responseJson.outcomes[0].entities;
        //console.log('Intent: ' + intent + " / " + confidence);
        //console.log(entities);
        //
        // EMPTY OUTCOMES
        //
        if (responseJson.outcomes === []) {
          // TO DO - ADD REGEX HERE FOR OTHER RESPONSES
          //res.reply('Sorry, I don\'t understand what you\'re asking. I\'m sure it\'s you and not me.');
        }
        //
        // EMPTY OUTCOMES of LOW CONFIDENCE
        //
        if (confidence < confidenceThres) {
          // TO DO - ADD REGEX HERE FOR OTHER RESPONSES
          res.reply('Sorry, I\'m not sure I understand. I\'m sure it\'s you and not me.');
        }
        //
        // HELLO
        //
        if (intent === 'Greeting' && confidence > confidenceThres) {
          var response01 = "Ugh, like you care.";
          var response02 = "Hi? I'm low.";
          var randomResponse = [response01,response02];
          res.reply(randomResponse[Math.floor((Math.random()*(randomResponse.length)))]);
        }
        //
        // WEATHER
        //
        if (intent === 'Weather' && confidence > confidenceThres) {
          var WX_APIKEY;
          WX_APIKEY = process.env.HUBOT_OWM_APIKEY || null;
          var getWx = function (callback) {
            if (WX_APIKEY === null) {
              callback("HUBOT_OWM_APIKEY environment variable is not provided for hubot-weather");
            } else {
              res.http("http://api.openweathermap.org/data/2.5/weather?q=" + entities.location[0].value + "&units=metric&APPID=" + WX_APIKEY).header('Accept', 'application/json').get()(function(err, res, body) {
                var data;
                data = JSON.parse(body);
                if (data.cod == '200') {
                  var currentConditions = data.weather[0].description;
                  var currentTemp = Math.round(data.main.temp * 1.8 + 32) + "°F";
                  var message0 = 'It\'s always cloudy for me, but in *' + data.name + '*, it is *' + currentTemp + '* and  *' + currentConditions + '*.';
                  var message1 = 'Ugh, if you must know what it\'s like outside in *' + data.name + '*, it is *' + currentTemp + '* and  *' + currentConditions + '*.';
                  var message2 = 'A brain the size of a planet and I\'m reporting the weather. Very well, in *' + data.name + '*, it is *' + currentTemp + '* and  *' + currentConditions + '*.';
                  var randomMsg = [message0,message1,message2];
                  callback(randomMsg[Math.floor((Math.random()*(randomMsg.length)))]);
                }
              });
            }
          }
          getWx(function(wxReply) {
            res.reply(wxReply);
          });
        }
      } else {
        res.reply('Sorry, my brain is busy with more important tasks right now. Ask me later.');
      }
    });
  });
}