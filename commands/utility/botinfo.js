const Discord = require("discord.js");
const { version } = require("discord.js");
const moment = require("moment");
const m = require("moment-duration-format");
let os = require('os')
let cpuStat = require("cpu-stat")
const ms = require("ms")
const v = require("./../../package.json");


module.exports = {
    name: "botinfo",
    category: "utility",
    description: "See the information of the bot!",
    aliases: ["info"],
    Usage: "botinfo",
    run: async(client, message, args) => {
        let cpuLol;
    cpuStat.usagePercent(function(err, percent, seconds) {
        if (err) {
            return console.log(err);
        }
        const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        const embedStats = new Discord.RichEmbed()
            .setAuthor(client.user.username)
            .setTitle("__**Statistics:**__")
            .setColor("RANDOM")
            .setDescription(`Bot current version: alpha_(${v.version})`)
            .addField("� Mem Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
            .addField("� Uptime ", `${duration}`, true)
            .addField("Developers", `BlueBird`, true)
            .addField("� Users", `${client.users.size.toLocaleString()}`, true)
            .addField("� Servers", `${client.guilds.size.toLocaleString()}`, true)
            .addField("� Channels ", `${client.channels.size.toLocaleString()}`, true)
            .addField("� Discord.js", `v${version}`, true)
            .addField("� Node", `${process.version}`, true)
            .addField("� CPU", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
            .addField("� CPU usage", `\`${percent.toFixed(2)}%\``, true)
            .addField("� Arch", `\`${os.arch()}\``, true)
            .addField("� Platform", `\`\`${os.platform()}\`\``, true)
            .addField("API Latency", `${Math.round(client.ping)}ms`)  
        message.channel.send(embedStats)
    });
    }
}
