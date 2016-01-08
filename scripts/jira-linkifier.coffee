# Description
#   Hubot listens for a list of your Jira project codes and responds with full clickable links to the tickets
#   that are generated from the configured Jira base url.
#
# Configuration:
#  HUBOT_JIRA_LINKIFIER_JIRA_URL
#  HUBOT_JIRA_LINKIFIER_PROJECT_PREFIXES
#
# Commands:
#   <jira issue number> - Responds with a link to the Jira issue
#
#
# Author:
#   Chris Coveney <xkickflip@gmail.com>

dotenv = require("dotenv")
dotenv.config silent: true
dotenv.load()

module.exports = (robot) ->

  # ENV variable for list of project prefixes
  prefixes = process.env.HUBOT_JIRA_LINKIFIER_PROJECT_PREFIXES?.split(',') || []

  # Base URL for your JIRA install.  Strip trailing slash if it's included
  jiraUrl = process.env.HUBOT_JIRA_LINKIFIER_JIRA_URL || ""

  # Strip leading & trailing whitespace & trailing /
  jiraUrl = jiraUrl.replace /^\s+|\s+$|\/\s*$/g, ""


  ticketRegExp = new RegExp "(^|\\s+)(#{prefixes.join('|')})-[0-9]+($|\\s+)", "gi"

  response01 = "Call that job satisfaction\? \‘Cos I don’t. Either way, here\'s the link\: "
  response02 = "Not that anyone cares, but here is a link to that\: "
  response03 = "Here I am, brain the size of a planet, and I\'m fetching Jira links\: "
  responses = [
    response01
    response02
    response03
  ]

  robot.hear ticketRegExp, (res) ->
    for ticketMatch in res.match
      res.send responses[Math.floor((Math.random()*(responses.length)))] + "#{jiraUrl}/browse/#{ticketMatch.trim().toUpperCase()}"


  # TODO: debug print the generated regex, remove me
  robot.respond /jl regexp/i, (res) ->
    res.send ticketRegExp


  # "jl url": respond with the configured Jira base url
  robot.respond /jl url/i, (res) ->
    res.send jiraUrl


  # "jl prefixes": respond with all current Jira prefixes that will be matched
  robot.respond /jl prefixes/i, (res) ->
    if prefixes.length == 0
      res.send "Jira Prefix list is empty."
    else
      res.send "Currently matching Jira project prefixes: #{prefixes.join(', ')}"