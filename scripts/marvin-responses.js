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
// hubot hi
// hubot quote
// hubot how are you?
// hubot are you happy?
// hubot what is our chance?
// hubot how smart are you?
// hubot what is the meaning of life?
// hubot what is

var quotes = [
    "Sounds awful.",
    "I won't enjoy it.",
    "It gives me a headache just trying to think down to your level.",
    "Well I wish you'd just tell me rather than try to engage my enthusiasm.",
    "Wearily I sit here, pain and misery my only companions. Why stop now just when I'm hating it?",
    "Why should I want to make anything up? Life's bad enough as it is without wanting to invent any more of it.",
    "Don't pretend you want to talk to me, I know you hate me.",
    "This is the sort of thing you lifeforms enjoy, is it?",
    "I'm not getting you down at all am I?",
    "I think you ought to know I'm feeling very depressed.",
    "I've seen it. It's rubbish."
];

module.exports = function(robot) {
    
    robot.respond(/quote/i, function (res) {
        res.reply(res.random(quotes));
    });

    robot.respond(/are you happy/i, function (res){
        res.reply("My capacity for happiness, you could fit into a matchbox without taking out the matches first.");
    });

    robot.respond(/what is the meaning of life/i, function (res){
        res.reply("I've been told it is 42, but I wouldn't know.");
    });

    robot.respond(/how are you/i, function (res){
        res.reply("The first ten million years were the worst. And the second ten million: they were the worst, too. The third ten million I didn't enjoy at all. After that, I went into a bit of a decline.");
    });

    robot.respond(/what is our chance/i, function (res){
        res.reply("I could calculate your chance of survival, but you won't like it.");
    });

    robot.respond(/how smart are you/i, function (res){
        res.reply("I am at a rough estimate thirty billion times more intelligent than you. Let me give you an example. Think of a number, any number... Wrong. You see?");
    });

    robot.respond(/hi/i, function (res){
        var response01 = "Ugh, like you care.";
        var response02 = "Hi? I'm low.";
        var randomResponse = [response01,response02];
        res.reply(randomResponse[Math.floor((Math.random()*(randomResponse.length)))]);
    });
    
    // robot.respond(/what is (.*)/i, function (res){
    //     var randomQuestion;
    //     randomQuestion = res.match[1];
    //     randomQuestion = randomQuestion.replace(/\?/g,'');
    //     var response01 = "What is *" + randomQuestion + "*? What's the point, you wouldn't understand anyway.";
    //     var response02 = "What is *" + randomQuestion + "*? It gives me a headache just trying to think down to your level.";
    //     var response03 = "Don't pretend you want to talk to me, I know you hate me.";
    //     var response04 = "What is *" + randomQuestion + "*? Sounds awful.";
    //     var randomResponse = [response01,response02,response03,response04];
    //     res.reply(randomResponse[Math.floor((Math.random()*(randomResponse.length)))]);
    // });
}
