robot.respond(/sleep it off/i, function(msg) {
  return msg.send('zzz...');
});

module.exports = function(robot) {};