# Description:
#   Example hubot script
#
# Dependencies:
#   Hubot
#
# Configuration:
#   N/A
#
# Commands:
#   what what

module.exports = (robot) ->
  robot.hear /what what/i, (res) ->
    res.reply "Can I get a What What!"