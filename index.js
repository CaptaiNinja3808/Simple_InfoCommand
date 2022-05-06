require('events').EventEmitter.prototype._maxListeners = 100;

const Discord = require('discord.js');

client.login("token")

//User Info 

client.on("message", message => {
    if (message.content.startsWith("?userinfo")) {
        if (message.content == "?userinfo") {
            var utente = message.member;
        }
        else {
            var utente = message.mentions.members.first();
        }
        if (!utente) {
            message.channel.send("🛑 | I don't find this user")
            return
        }
        var elencoPermessi = "";
        if (utente.hasPermission("ADMINISTRATOR")) {
            elencoPermessi = "👑 ADMINISTRATOR";
        }
        else {
            var permessi = ["CREATE_INSTANT_INVITE", "KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_CHANNELS", "MANAGE_GUILD", "ADD_REACTIONS", "VIEW_AUDIT_LOG", "PRIORITY_SPEAKER", "STREAM", "VIEW_CHANNEL", "SEND_MESSAGES", "SEND_TTS_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "MENTION_EVERYONE", "USE_EXTERNAL_EMOJIS", "VIEW_GUILD_INSIGHTS", "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS", "USE_VAD", "CHANGE_NICKNAME", "MANAGE_NICKNAMES", "MANAGE_ROLES", "MANAGE_WEBHOOKS", "MANAGE_EMOJIS"]
            for (var i = 0; i < permessi.length; i++) {
                if (utente.hasPermission(permessi[i])) {
                    elencoPermessi += "- " + permessi[i] + "\r";
                }
            }
        }
        var embed = new Discord.MessageEmbed()
            .setTitle(utente.user.tag)
            .setDescription("All the info of this user")
            .setThumbnail(utente.user.displayAvatarURL())
            .addField("User ID", utente.user.id, true)
            .addField("Status", utente.user.presence.status, true)
            .addField("She/He's a bot?", utente.user.bot ? "Si" : "No", true)
            .addField("Account created on", utente.user.createdAt.toDateString(), true)
            .addField("Joined the server", utente.joinedAt.toDateString(), true)
            .addField("Permissions", elencoPermessi, false)
            .addField("Roles", utente.roles.cache.map(ruolo => ruolo.name).join("\r"), false)
        message.channel.send(embed)
    }
  })

  //Server Info 

  client.on("message", message => {
    if (message.content == "?serverinfo") {
        var server = message.member.guild;
        var botCount = server.members.cache.filter(member => member.user.bot).size;
        var utentiCount = server.memberCount - botCount;
        var categoryCount = server.channels.cache.filter(c => c.type == "category").size
        var textCount = server.channels.cache.filter(c => c.type == "text").size
        var voiceCount = server.channels.cache.filter(c => c.type == "voice").size
        var embed = new Discord.MessageEmbed()
            .setTitle(server.name)
            .setDescription("All the info of this server")
            .setThumbnail(server.iconURL())
            .addField("Owner", server.owner.user.username, true)
            .addField("Server ID", server.id, true)
            .addField("Server region", server.region, true)
            .addField("Members", "Total: " + server.memberCount + " - User: " + utentiCount + " - Bot: " + botCount, false)
            .addField("Channel", "Categories: " + categoryCount + " - Text: " + textCount + " - Vocal: " + voiceCount, false)
            .addField("Server created on", server.createdAt.toDateString(), true)
            .addField("Boost level", "Level " + server.premiumTier + " (Boost: " + server.premiumSubscriptionCount + ")", true)
        message.channel.send(embed)
    }
  })

   //Ping

   client.on("message", message => {
    if(message.content.startsWith("?ping")) {
      var ciccio = new Discord.MessageEmbed()
      .setTitle("Pong🏓")
      .setDescription(`\`\`\`Ping: ${client.ws.ping} ms\`\`\``)
      .setColor("RANDOM")
      message.channel.send(ciccio)
    }
  })
