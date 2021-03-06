module.exports = function (bot) {
    bot.on(PlugAPI.events.VOTE, function (data) {

        user = bot.getUser(data.i);

        if (config.verboseLogging) {
            data.user = user;
            console.log('[VOTE] ' + JSON.stringify(data, null, 2));
        } else if (user && data.v == -1) {
            console.log('[VOTE] ' + user.username + ' voted ' + data.v);
        }

        if (config.queue.prohibitDownvoteInQueue && data.v == -1 && bot.getWaitListPosition(data.i) > 0) {
            bot.sendChat('@' + user.username + ', voting down while in queue is prohibited. Please vote up or leave the queue.');
            setTimeout(function () {
                removeIfDownvoting(user.username);
            }, 10 * 1000);
        }
    });
};