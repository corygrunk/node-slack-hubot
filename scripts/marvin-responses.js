// Description:
//   answers questions as marvin the paranoid android
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   hubot how old are you?

module.exports = function(robot) {

		// How smart are you?
    robot.respond(/how smart are you\s?\?/i, function(msg){
        msg.reply("I am at a rough estimate thirty billion times more intelligent than you. Let me give you an example. Think of a number, any number.");
    });
}
