module.exports = function (bot) {

    bot.on(PlugAPI.events.MODERATE_WLBAN, function (data) {

        if (config.verboseLogging) {
            console.log('[EVENT] modWaitlistBan ', JSON.stringify(data, null, 2));
        }

        var duration = 'unknown';
        switch (data.duration) {
            case 'Short':
                duration = '15 min';
                break;
            case 'Medium':
                duration = '30 min';
                break;
            case 'Long':
                duration = '45 min';
                break;
            case 'Forever':
                duration = 'forever';
                break;
            default:
                // maybe this is an unmute?
                break;
        }

        getDbUserFromUsername(data.user.username, function (dbUser) {
            var message;
            if (duration == 'unknown') {
                message = '[UNMUTE] ' + data.user.username + ' (ID: ' + data.user.id + ') was unbanned from the waitlist by ' + data.moderator.username;
            } else if (dbUser == null) {
                message = '[MUTE] ' + data.user.username + ' (ID: ' + data.user.id + ') was banned from the waitlist for ' + duration + ' by ' + data.moderator.username;
            } else {
                message = '[MUTE] ' + data.user.username + ' (ID: ' + data.user.id + ', LVL: ' + dbUser.site_points + ') was banned from the waitlist for ' + duration + ' by ' + data.moderator.username;
            }
            console.log(message);
            sendToSlack(message);
        });
    });

};
