// Description:
//   Recurly integration
//
// Dependencies:
//   None
//
// Configuration:
//   Add Recurly Private API key to environment variable: HUBOT_RECURLY_PRIVATE_API
//   Add Recurly subdomain key to environment variable: HUBOT_RECURLY_SUBDOMAIN
//
// Commands:
//   None

var Recurly = require('../lib/node-recurly');
var recurly = new Recurly(require('../recurly-config'));
var dotenv = require('dotenv');
dotenv.load();

module.exports = function(robot) {

  var lastUserEmail = '';
  var lastUserName = '';

  // SET THE LAST USER DATA
  recurly.accounts.list(state='active', function (data) {
    lastUserEmail = data.data.accounts.account[0].email;
    lastUserName = data.data.accounts.account[0].first_name + " " + data.data.accounts.account[0].last_name;
  });

  // CHECKING FOR NEW USERS ON RECURLY
  var interval = setInterval(function() {
    //console.log('Running...');
    recurly.accounts.list('active', function (data) {
      var dataHolder = data.data.accounts.account;
      var emailCheck = dataHolder[0].email;
      var nameCheck = dataHolder[0].first_name + " " + dataHolder[0].last_name;
      if (lastUserEmail !== emailCheck) {
        console.log('New user detected!');
        lastUserEmail = emailCheck;
        lastUserName = nameCheck;
        robot.emit("new_recurly_user", {
          email: lastUserEmail,
          name: lastUserName
        });
      }
    });
  }, 15000);
}