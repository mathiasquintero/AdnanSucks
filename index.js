var Botkit = require('botkit');

var token = process.env.SLACK_TOKEN;

var controller = Botkit.slackbot({
  retry: Infinity,
  debug: false
});

controller.spawn({
  token: token
}).startRTM(function (err, bot, payload) {
  if (err) {
    throw new Error(err);
  }
  console.log('Connected!');
});

controller.on('bot_channel_join', function (bot, message) {
  bot.reply(message, "Sup? I'm here now.");
});

function simple(user) {
    return user + " sucks!!!";
}

function soMuch(user) {
    return user + " sucks soooooooo much...";
}

function seriously(user) {
    return "Seriously, " + user + ". You suck.";
}

function haveI(user) {
    return user + ". Have I told you you suck? Because you do.";
}

function levels(user) {
    return user + "'s suckage level's over 9000";
}

function why(user) {
    return "Tell me, " + user + ". Why do you suck so much?";
}

var modes = [simple, soMuch, seriously, haveI, levels, why];

// Tells people they suck!
controller.hears(["(.*)I can('?)t(.*)", "(.*)I won'?t(.*)", "(.*)sorry(.*)", "I am home", "no lunch", "I (.*) late", "(.*)shit(.*)", "(.*)not come(.*)"], ['ambient', 'direct_message','direct_mention','mention'], function (bot, message) {
  var name = bot.api.users.info({ user: message.user }, function(error, result) {
      if (error === null) {
          var responseMessage = modes[Math.floor(Math.random()*modes.length)](result.user.name);
          bot.reply(message, responseMessage);
      }
  });

});
