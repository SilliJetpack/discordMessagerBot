const Discord = require("discord.js")
const express = require("express")
const app = express()
app.get("/", (req, res) => {
  res.send("hi")
});
app.listen(8000)
const fs = require("fs")
const bot = new Discord.Client()
const settings = require("./settings.json")
const prefix = settings.prefix
const token = settings.token 
const gamename = settings.game
bot.on('ready', ready => {
console.log("Ready " + bot.user.username)
console.log(bot.guilds.size)
fs.readdir('./tot/', function(err, items) {
bot.user.setPresence({game: {name: gamename, type: 0}})
});
});
bot.on('message', message => {
    let messageArray = message.content.split(" ");
let command = messageArray[0];
let args = messageArray.slice(1);
  if(message.author.bot) return;
if(message.content.startsWith(prefix + "help")) {
    const help = new Discord.RichEmbed()
    .setDescription("Help commands")
    .setColor("#0000FF")
    .addField(`➕ ${prefix}cemail <name>`, "Creates an email account (without @domain.com, just name, domain name is automaticly filled out)")
    .addField(`ℹ️ ${prefix}myemail`, "View your email account")
    .addField(`✏️ ${prefix}compose/cp <full-email-name> <message>`, "Compose a message")
    .addField(`✏️ ${prefix}compose/cp l <message>`, "Compose an email to the last person you sent to, usefull for quicker messaging")
    .addField(`✏️ ${prefix}reply <message>`, "Reply to the last person who sent you a message")
    .addField(`🚫 ${prefix}block <full-email-name>`, "Block an email (you cannot send or receive messages from them)")
    .addField(`☑️ ${prefix}unblock <full-email-name>`, "Unblock an email")
    .addField(`📜 ${prefix}ebb`, "Lists blocked emails")
    .addField(`📜 ${prefix}inboxlog`, "Sends the total logs of messages you received since you began receiving messages")
    .addField(`📜 ${prefix}sendlog`, "Sends the total logs of messages you sent since you began sending messages")
    .addField(`❎ ${prefix}deactivate`, "Deactivates your email (You won't receive or be able to send any messages)")
    .addField(`✅ ${prefix}activate`, "Activates your email again")
    .addField(`ℹ️ ${prefix}info`, "View some information about this bot")
    .addField(`✋ invite`, "Sends the invite link for this bot")
    message.channel.send(help)
}
if(message.content.startsWith(prefix + "eval")) {
    if (message.author.id !== "469716275786940416") return message.channel.send("Only the bot owner can use this command")

const that = message.content.split(" ").slice(1);
try {
  const code = args.join(" ");
let evaled = eval(code);
if (typeof evaled !== "string")
evaled = require("util").inspect(evaled); 
const ss = new Discord.RichEmbed()
.setDescription("**EVAL**")
.setColor('GREEN')
.addField("INPUT", "```" +code + "```")
.addField("OUTPUT", "```" + (evaled) + "```")
return message.channel.send(ss)

} catch (e) {
 console.log(e.stack);
 const err = new Discord.RichEmbed()
.setDescription("**ERROR**")
.setColor('RED')
.addField("Error:", e)
return message.channel.send(err)
}
}
if(message.content.startsWith(prefix + "inboxlog")) {
    fs.readFile(`./Emails/${message.author.id}/mail.txt`,'utf8', function(err, data) {
        if(err) return message.channel.send("❌ You don't have an email account, to send messages you need to create one ❌ ")
        fs.readFile(`./logs/${message.author.id}/log2.txt`, 'utf8', function(err, data33) {
            if(err) return message.channel.send("❌ Looks like you don't have any logs ❌")
message.channel.send({file: `./logs/${message.author.id}/log2.txt`})
        });
    });
}
if(message.content.startsWith(prefix + "sendlog")) {
    fs.readFile(`./Emails/${message.author.id}/mail.txt`,'utf8', function(err, data) {
        if(err) return message.channel.send("❌ You don't have an email account, to send messages you need to create one ❌ ")
        fs.readFile(`./logs/${message.author.id}/log2.txt`, 'utf8', function(err, data33) {
            if(err) return message.channel.send("❌ Looks like you don't have any logs ❌")
message.channel.send({file: `./logs/${message.author.id}/log.txt`})
        });
    });
}
if(message.content.startsWith(prefix +  "invite")) {
    const embed = new Discord.RichEmbed()
    .setDescription("You want to make me more useless? okay then")
    .addField("Here", "[Click Me](https://discordapp.com/oauth2/authorize?client_id=" + bot.user.id + "&scope=bot&permissions=0)")
    .addField("OR the link only", "https://discordapp.com/oauth2/authorize?client_id=" + bot.user.id + "&scope=bot&permissions=0")
    message.channel.send(embed)
}
if(message.content.startsWith(prefix + "info")) {
    fs.readdir('./tot', function(err, items1) {
        fs.readdir('./Emails/mails', function(err, items2) {
    var botuptime = bot.uptime;
    x = botuptime / 1000
    seconds = Math.floor(x % 60)
    x /= 60
    minutes =  Math.floor(x % 60)
    x /= 60
    hours =  Math.floor(x % 24)
    x /= 24
    days = Math.floor(x % 24)
    var uptime = days + ' day(s) ' +  hours + ' hour(s) ' + minutes + ' Minute(s)  ' + seconds + ' Second(s)'
const info = new Discord.RichEmbed()
.setDescription("INFORMATION ABOUT ME")
.addField("ℹ️ Description", settings.description)
.addField("🏭 My server count", bot.guilds.size)
.addField("🖕🏻 My uptime", uptime)
.addField("Number of email accounts", items2.length)
.addField("Total amount of emails sent", items1.length)
.setColor("#0000FF")
message.channel.send(info)
});
    });
}
if(message.content.startsWith(prefix + "cemail")) {
let what = args.join('')
if(what.length <1) return message.channel.send("❌ Provide an email name ❌ ")
if(what.length > 16) return message.channel.send("❌ Emails can only be a maximum of 16 characters ❌ ")
var nofuck = `./Emails/mails/` +  what + "@" + "skymail" + ".cord";

if (fs.existsSync(nofuck)) return message.channel.send("❌ An user with this email already exists ❌ ")
var dir = `./Emails/${message.author.id}`;

if (!fs.existsSync(dir)){
fs.mkdirSync(dir);
}
var dir2 = `./Emails/mails`;

if (!fs.existsSync(dir2)){
fs.mkdirSync(dir2);
}

fs.readFile(`./Emails/${message.author.id}/email.txt`,'utf8', function(err, data) {
if(data === message.author.id) return message.channel.send("❌ You already have an email account! ❌ ")
if(err) {
    var dir3 = `./Emails/mails/` +  what + "@" + "skymail" + ".cord";
    
    if (!fs.existsSync(dir3)){
    fs.mkdirSync(dir3);
    }
fs.writeFile(`./Emails/mails/` + what + "@" + "skymail" + ".cord" + "/" + what + "@" + "skymail" + ".cord" + ".txt", `${message.author.id}` ,  function (err) {
message.channel.send("✔️ Success, your email is: " + "'" + what + "@" + "skymail" + ".cord" + "' ✔️" )
});
fs.writeFile(`./Emails/${message.author.id}/email.txt`, `${message.author.id}` ,  function (err) {
if(err) return undefined
});
fs.writeFile(`./Emails/${message.author.id}/mail.txt`, what + "@" + "skymail" + ".cord" ,  function (err) {
if(err) return undefined
});
} 
});
}
 if(message.content.startsWith(prefix + "reply")) {
  const mesg = args.join(' ')
  var dir60 = `./logs/${message.author.id}`;

  if (!fs.existsSync(dir60)){
  fs.mkdirSync(dir60);
  }
  
        fs.readFile(`./reply/${message.author.id}/msg.txt`, 'utf8', function(err, lastemail) {
            if(err) return message.channel.send("You don't have any last emails")
            fs.readFile(`./Emails/${message.author.id}/mail.txt`,'utf8', function(err, data) {
                if(err) return message.channel.send("❌ You don't have an email account, to send messages you need to create one ❌ ")
                fs.readFile(`./Emails/mails/` + lastemail + "/" + lastemail + ".txt", 'utf8', function(err, data2) {
                if(err) return message.channel.send("❌  The email you typed could not be found ❌ ")
                fs.readFile(`./Emails/mails/` + lastemail + "/" + message.author.id + ".txt", 'utf8', function(err, data3) {
                fs.readFile(`./Emails/${message.author.id}/mail.txt`,'utf8', function(err, data7) {
                fs.readFile(`./Emails/mails/` + data7 + "/" + data2 + ".txt",'utf8', function(err, data8) {
                    if(data8 === "true") return message.channel.send("🚫 You cannot send messages to users you have blocked 🚫")
                if(data3 === 'true') return message.channel.send("🚫 Error, possibilites user may have blocked the bot, they have DMs disabled, they are not in any servers where bot is, or you were blocked by the target 🚫")
                fs.readFile(`./Emails/mails/` + lastemail + "/" + "deact" + ".txt", 'utf8', function(err, data4){
                if(data4 === 'true') return message.channel.send("❌ The target's email is deactivated ❌")
                fs.readFile(`./Emails/${message.author.id}/mail.txt`, 'utf8', function(err, data5) {
                    fs.readFile(`./Emails/mails/` + "/" + data5 + "/" + "deact" + ".txt", 'utf8', function(err, data6) {
                if(data6 === "true") return message.channel.send("❌ Your email is deactivated, you cannot send or receive messages ❌")
                let shitze = bot.users.get(data2).send('REPLY' + "\n" + "```" + "From: " + data + "```" + "\n" + "```" + "Message: " + "```" + "\n" + mesg).catch(err=> message.channel.send("🚫 Error, possibilites user may have blocked the bot, they have DMs disabled, they are not in any servers where bot is, or you were blocked by the target 🚫"))
                if(!shitze) return message.channel.send("🚫 Error, possibilites user may have blocked the bot, they have DMs disabled, they are not in any servers where bot is, or you were blocked by the target 🚫")
                fs.readdir('./tot/', function(err, garbage) {
                    var dir69 = `./logs/${data2}`;

if (!fs.existsSync(dir69)){
fs.mkdirSync(dir69);
}
var dirlmao = `./reply/${data2}`;

  if (!fs.existsSync(dirlmao)){
  fs.mkdirSync(dirlmao);
  }
                    const garbagezz = garbage.length + 1
                 message.channel.send("✔️ Replied ✔️" + "\n" + "TO: " + "`" + lastemail + "`")
                 fs.writeFile('./tot/' + garbagezz + ".txt", "TO: " + lastemail + "\n" + "FROM: " + data, function(err) {
                    fs.writeFile(`./last/${message.author.id}/msg.txt`, lastemail, function(err) {
                        fs.writeFile(`./reply/${data2}/msg.txt`, data, function(err) {
                    const fuck = new Date()
                    var fuck1 = fuck.getDate()
                    var fuck2 = fuck.getMonth() + 1
                    var fuck3 = fuck.getFullYear()
                    var fuck4 = fuck.getHours()
                    var fuck5 = fuck.getMinutes()
                    var fuck6 = fuck.getSeconds()
                    var timedate = fuck1 + "." + fuck2 + "." + fuck3 + " " + fuck4 + ":" + fuck5 + ":" + fuck6 + " (Norwegian European Time) GMT"
                    fs.appendFile(`./logs/${message.author.id}/log.txt`, "\n" + timedate + "\n" + "TO: " + lastemail + "\n" + "MESSAGE: " + mesg + "\n" + "---------------------------------", function(err) {
                    });
                    fs.appendFile(`./logs/${data2}/log2.txt`, "\n" + timedate + "\n" + "FROM: " + data + "\n" + "MESSAGE: " + mesg + "\n" + "---------------------------------", function(err) {
                    });
                 });
                });
                }); 
            });
        });
                });
                });
                });
                });
                });
                });
                }); 
});


 }
if(message.content.startsWith(prefix + "myemail")) {
  
let what = args[0]
var dir = `./Emails/${message.author.id}`;

if (!fs.existsSync(dir)){
fs.mkdirSync(dir);
}
var dir2 = `./Emails/mails`;

if (!fs.existsSync(dir2)){
fs.mkdirSync(dir2);
}
fs.readFile(`./Emails/${message.author.id}/mail.txt`,'utf8', function(err, data) {
if(err) return message.channel.send("❌ You don't have an email account ❌ ")
message.channel.send("YOUR EMAIL ACCOUNT:" + "\n" + "```" + data + "```" + "\n")
});
}
if(message.content.startsWith(prefix + "compose") || message.content.startsWith(prefix + "cp")) {
let what = args[0]
let mesg = args.slice(1).join(' ')
if(mesg.length <1) return message.channel.send("Provide an email and a message to compose")
var dir = `./Emails/${message.author.id}`;

if (!fs.existsSync(dir)){
fs.mkdirSync(dir); 
}
var dir2 = `./Emails/mails`;

if (!fs.existsSync(dir2)){
fs.mkdirSync(dir2);
}
var dir7 = `./last/${message.author.id}`;

if (!fs.existsSync(dir7)){
fs.mkdirSync(dir7);
}
var dir60 = `./logs/${message.author.id}`;

if (!fs.existsSync(dir60)){
fs.mkdirSync(dir60);
}

if(what === "l") {

        fs.readFile(`./last/${message.author.id}/msg.txt`, 'utf8', function(err, lastemail) {
            if(err) return message.channel.send("You don't have any last emails")
            fs.readFile(`./Emails/${message.author.id}/mail.txt`,'utf8', function(err, data) {
                if(err) return message.channel.send("❌ You don't have an email account, to send messages you need to create one ❌ ")
                fs.readFile(`./Emails/mails/` + lastemail + "/" + lastemail + ".txt", 'utf8', function(err, data2) {
                if(err) return message.channel.send("❌  The email you typed could not be found ❌ ")
                fs.readFile(`./Emails/mails/` + lastemail + "/" + message.author.id + ".txt", 'utf8', function(err, data3) {
                fs.readFile(`./Emails/${message.author.id}/mail.txt`,'utf8', function(err, data7) {
                fs.readFile(`./Emails/mails/` + data7 + "/" + data2 + ".txt",'utf8', function(err, data8) {
                    if(data8 === "true") return message.channel.send("🚫 You cannot send messages to users you have blocked 🚫")
                if(data3 === 'true') return message.channel.send("🚫 Error, possibilites user may have blocked the bot, they have DMs disabled, they are not in any servers where bot is, or you were blocked by the target 🚫")
                fs.readFile(`./Emails/mails/` + lastemail + "/" + "deact" + ".txt", 'utf8', function(err, data4){
                if(data4 === 'true') return message.channel.send("❌ The target's email is deactivated ❌")
                fs.readFile(`./Emails/${message.author.id}/mail.txt`, 'utf8', function(err, data5) {
                    fs.readFile(`./Emails/mails/` + "/" + data5 + "/" + "deact" + ".txt", 'utf8', function(err, data6) {
                if(data6 === "true") return message.channel.send("❌ Your email is deactivated, you cannot send or receive messages ❌")
                let shitze = bot.users.get(data2).send('EMAIL' + "\n" + "```" + "From: " + data + "```" + "\n" + "```" + "Message: " + "```" + "\n" + mesg).catch(err=> message.channel.send("🚫 Error, possibilites user may have blocked the bot, they have DMs disabled, they are not in any servers where bot is, or you were blocked by the target 🚫"))
                if(!shitze) return message.channel.send("🚫 Error, possibilites user may have blocked the bot, they have DMs disabled, they are not in any servers where bot is, or you were blocked by the target 🚫")
                fs.readdir('./tot/', function(err, garbage) {
                    var dir65 = `./reply/${data2}`;

if (!fs.existsSync(dir65)){
fs.mkdirSync(dir65);
}
                    var dir69 = `./logs/${data2}`;

if (!fs.existsSync(dir69)){
fs.mkdirSync(dir69);
}
                    const garbagezz = garbage.length + 1
                 message.channel.send("✔️ Email successfully delivered ✔️" + "\n" + "TO: " + "`" + lastemail + "`")
                 fs.writeFile('./tot/' + garbagezz + ".txt", "TO: " + lastemail + "\n" + "FROM: " + data, function(err) {
                    fs.writeFile(`./reply/${data2}/msg.txt`, data, function(err) {
                    const fuck = new Date()
                    var fuck1 = fuck.getDate()
                    var fuck2 = fuck.getMonth() + 1
                    var fuck3 = fuck.getFullYear()
                    var fuck4 = fuck.getHours()
                    var fuck5 = fuck.getMinutes()
                    var fuck6 = fuck.getSeconds()
                    var timedate = fuck1 + "." + fuck2 + "." + fuck3 + " " + fuck4 + ":" + fuck5 + ":" + fuck6 + " (Norwegian European Time) GMT"
                    fs.appendFile(`./logs/${message.author.id}/log.txt`, "\n" + timedate + "\n" + "TO: " + lastemail + "\n" + "MESSAGE: " + mesg + "\n" + "---------------------------------", function(err) {
                    });
                    fs.appendFile(`./logs/${data2}/log2.txt`, "\n" + timedate + "\n" + "FROM: " + data + "\n" + "MESSAGE: " + mesg + "\n" + "---------------------------------", function(err) {
                    });
                 });
                });
                }); 
                });
                });
                });
                });
                });
                });
                }); 
});
        });

} else {

fs.readFile(`./Emails/${message.author.id}/mail.txt`,'utf8', function(err, data) {
if(err) return message.channel.send("❌ You don't have an email account, to send messages you need to create one ❌ ")
fs.readFile(`./Emails/mails/` + what + "/" + what + ".txt", 'utf8', function(err, data2) {
if(err) return message.channel.send("❌  The email you typed could not be found ❌ ")
fs.readFile(`./Emails/mails/` + what + "/" + message.author.id + ".txt", 'utf8', function(err, data3) {
fs.readFile(`./Emails/${message.author.id}/mail.txt`,'utf8', function(err, data7) {
fs.readFile(`./Emails/mails/` + data7 + "/" + data2 + ".txt",'utf8', function(err, data8) {
    if(data8 === "true") return message.channel.send("🚫 You cannot send messages to users you have blocked 🚫")
if(data3 === 'true') return message.channel.send("🚫 Error, possibilites user may have blocked the bot, they have DMs disabled, they are not in any servers where bot is, or you were blocked by the target 🚫")
fs.readFile(`./Emails/mails/` + what + "/" + "deact" + ".txt", 'utf8', function(err, data4){
if(data4 === 'true') return message.channel.send("❌ The target's email is deactivated ❌")
fs.readFile(`./Emails/${message.author.id}/mail.txt`, 'utf8', function(err, data5) {
    fs.readFile(`./Emails/mails/` + "/" + data5 + "/" + "deact" + ".txt", 'utf8', function(err, data6) {
if(data6 === "true") return message.channel.send("❌ Your email is deactivated, you cannot send or receive messages ❌")
let shitze = bot.users.get(data2).send('EMAIL' + "\n" + "```" + "From: " + data + "```" + "\n" + "```" + "Message: " + "```" + "\n" + mesg).catch(err=> message.channel.send("🚫 Error, possibilites user may have blocked the bot, they have DMs disabled, they are not in any servers where bot is, or you were blocked by the target 🚫"))
if(!shitze) return message.channel.send("🚫 Error, possibilites user may have blocked the bot, they have DMs disabled, they are not in any servers where bot is, or you were blocked by the target 🚫")
fs.readdir('./tot/', function(err, garbage) {
    var dir65 = `./reply/${data2}`;

if (!fs.existsSync(dir65)){
fs.mkdirSync(dir65);
}
    var dir69 = `./logs/${data2}`;

    if (!fs.existsSync(dir69)){
    fs.mkdirSync(dir69);
    }
    const garbagezz = garbage.length + 1
 message.channel.send("✔️ Email successfully delivered ✔️")
 fs.writeFile('./tot/' + garbagezz + ".txt", "TO: " + what + "\n" + "FROM: " + data, function(err) {
fs.writeFile(`./last/${message.author.id}/msg.txt`, what, function(err) {
    fs.writeFile(`./reply/${data2}/msg.txt`, data, function(err) {
    const fuck = new Date()
    var fuck1 = fuck.getDate()
    var fuck2 = fuck.getMonth() + 1
    var fuck3 = fuck.getFullYear()
    var fuck4 = fuck.getHours()
    var fuck5 = fuck.getMinutes()
    var fuck6 = fuck.getSeconds()
    var timedate = fuck1 + "." + fuck2 + "." + fuck3 + " " + fuck4 + ":" + fuck5 + ":" + fuck6 + " (Norwegian European Time) GMT"
    fs.appendFile(`./logs/${message.author.id}/log.txt`, "\n" + timedate + "\n" + "TO: " + what + "\n" + "MESSAGE: " + mesg + "\n" + "---------------------------------", function(err) {
    });
    fs.appendFile(`./logs/${data2}/log2.txt`, "\n" + timedate + "\n" + "FROM: " + data + "\n" + "MESSAGE: " + mesg + "\n" + "---------------------------------", function(err) {
    });
});
 });
});
});
}); 
});
});
});
});
});
});
}); 
}
}

if(message.content.startsWith(prefix + "block")) {
let what = args[0]
var dir = `./Emails/${message.author.id}`;

if (!fs.existsSync(dir)){
fs.mkdirSync(dir); 
}
var dir2 = `./Emails/mails`;

if (!fs.existsSync(dir2)){
fs.mkdirSync(dir2);
}
var dir3 = `./Emails/${message.author.id}/b`;

if (!fs.existsSync(dir3)){
fs.mkdirSync(dir3);
}
fs.readFile(`./Emails/mails/${what}/${what}` + ".txt",  'utf8', function(err, data) {
if(err) return message.channel.send("❌ Email not found ❌ ")
fs.readFile(`./Emails/${message.author.id}/mail.txt`, 'utf8', function(err, data2) {
fs.writeFile(`./Emails/mails/` + "/" + data2 + "/" + data + ".txt", 'true', function(err) {
if(err) return undefined
message.channel.send("✔️ Email" + "```" + what + "```" + "Was blocked ✔️")
var dir4 = `./Emails/${message.author.id}/b/` + what;

if (!fs.existsSync(dir4)){
fs.mkdirSync(dir4);
}
});
});
});
}


if(message.content.startsWith(prefix + "unblock")) {
let what = args[0]
var dir = `./Emails/${message.author.id}`;

if (!fs.existsSync(dir)){
fs.mkdirSync(dir); 
}
var dir2 = `./Emails/mails`;

if (!fs.existsSync(dir2)){
fs.mkdirSync(dir2);
}
fs.readFile(`./Emails/mails/${what}/${what}` + ".txt",  'utf8', function(err, data) {
if(err) return message.channel.send("❌ Email not found ❌ ")
fs.readFile(`./Emails/${message.author.id}/mail.txt`, 'utf8', function(err, data2) {
fs.unlink(`./Emails/mails/` + "/" + data2 + "/" + data + ".txt",  function(err) {
message.channel.send("✔️ Email" + "```" + what + "```" + "was unblocked ✔️")
fs.rmdir(`./Emails/${message.author.id}/b/` + what, function (err) {
});
});
});
});
}
if(message.content.startsWith(prefix + "ebb")) {
let what = args[0]
var dir = `./Emails/${message.author.id}`;

if (!fs.existsSync(dir)){
fs.mkdirSync(dir); 
}
var dir2 = `./Emails/mails`;

if (!fs.existsSync(dir2)){
fs.mkdirSync(dir2);
}
fs.readdir(`./Emails/${message.author.id}/b/`, function(err, items) {
if(err) return message.channel.send("None")
if(items.length <1) return message.channel.send("❌ You haven't blocked any email(s) ❌ ")
message.channel.send( "`" + items.length + "`" + "\n" + "\n"+ "```" + items.join('\n') + "```")
});
}
 
if(message.content.startsWith(prefix + "deactivate")) {
fs.readFile(`./Emails/${message.author.id}/mail.txt`, 'utf8', function(err, data2) {
fs.writeFile(`./Emails/mails/` + "/" + data2 + "/" + "deact" + ".txt", 'true', function(err) {
if(err) return undefined
message.channel.send("✔️ Your Email was deactivated ✔️")
});
});
}
   
if(message.content.startsWith(prefix + "activate")) {
fs.readFile(`./Emails/${message.author.id}/mail.txt`, 'utf8', function(err, data2) {
fs.unlink(`./Emails/mails/` + "/" + data2 + "/" + "deact" + ".txt",  function(err) {
if(err) return message.channel.send("❌ Your email isn't deactivated ❌ ")
message.channel.send("✔️ Your Email was activated ✔️")
});
});
}
});
bot.login(token)
