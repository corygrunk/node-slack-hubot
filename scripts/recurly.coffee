# Description
#   Hubot listens for new recurly user, then announces it
#
# Configuration:
#  None
#
# Commands:
#  None
#
# Author:
#   corygrunk

module.exports = (robot) ->
	
	robot.on 'new_recurly_user', (room) ->
		robot.messageRoom 'paranoid-android', "A new user just *created an account*. I can barely contain my excitement."