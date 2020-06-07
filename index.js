const Discord = require("discord.js");
const { Client, Util } = require("discord.js");
const TOKEN = process.env.BOT_TOKEN;
const PREFIX = process.env.PREFIX;
require("./server.js")
const bot = new Client({ disableEveryone: true });
const queue = new Map();
const {MessageEmbed} = require('discord.js');
const moment = require('moment');

bot.on('ready', () => {
    bot.user.setStatus('available')
    bot.user.setPresence({
        game: {
            name: 'AIO bot Witcher -about',
        }
    });
});

bot.on('guildMemberAdd', member => {
    member.addRole(member.guild.roles.find(role => role.name === "APAM"));
    var ran = randomRange(0,5);
    var greeting;
    switch (ran) {
        case 0:
            greeting = `:tada: Hi <@${member.user.id}> Selamat datang di **WITCHER GUILD** <a:awh:718810189322518528><a:awal:718798277365203024><a:akhir:718798277931302952><a:awh:718810189322518528>`;
            break;
        case 1:
            greeting = `<a:awh:718810189322518528> Selamat datang di **WITCHER GUILD** <@${member.user.id}>Semoga Betah <a:awal:718798277365203024><a:akhir:718798277931302952>`;
            break;
        case 2:
            greeting = `Halo:wave: <@${member.user.id}> <a:awal:718798277365203024><a:akhir:718798277931302952> Aku belum kenal kamu, semoga kita semakin akrab ya <:shinobu:718847490304245771>`;
            break;
       case 3:
            greeting = `<a:awal:718798277365203024><a:akhir:718798277931302952> Selamat datang <@${member.user.id}> Di <a:awh:718810189322518528> **WITCHER GUILD**<a:awh:718810189322518528>`;
            break;
        case 4:
            greeting = `Guys <@${member.user.id}> Baru join, kasih dia teh anget <:wait:718848882934677577>`;
            break;
        case 5:
            greeting = `Dua tiga kucing berlari, selamat datang di **WITCHER GUILD** <@${member.user.id}> <a:awh:718810189322518528><a:awal:718798277365203024><a:akhir:718798277931302952><a:awh:718810189322518528>`;
            break;
    }
    member.guild.channels.get('716173885078372402').send(greeting);
});


bot.on('guildMemberRemove', member => {
    var ran = randomRange(0,5);
    var bye;
    switch (ran) {
        case 0:
            bye ='**' + member.user.username + '#' + member.user.discriminator +'** <:rip:718859922703646730> Telah berpulang kerumah emak nya,Sampai jumpa lagi di WITCHER :wave:';
            break;
        case 1:
            bye ='**' + member.user.username + '#' + member.user.discriminator +'** <:rip2:718859923206963250> TELAH MATI!! eh out!!!';
            break;
        case 2:
            bye ='**' + member.user.username + '#' + member.user.discriminator +'** <:rip3:718859923970195577> Telah Meninggalkan kita gess <a:coffin:718780814409596999>';
            break;
        case 4:
            bye ='**' + member.user.username + '#' + member.user.discriminator +'** <:rip4:718859922594463846> Dia telah Pergi jauh sekali :leaves:';
            break;
        case 5:
            bye ='**' + member.user.username + '#' + member.user.discriminator +'** <:rip6:718859922703646730> Pamit Dulu gess <a:coffin:718780814409596999>';
            break;
  
    }
    member.guild.channels.get('716173898554540052').send(bye);
});


function formatTime(date, full) {
    let time = '';
    time += date.getDate() < 10 ? `0${date.getDate()}-` : `${date.getDate()}-`;
    const month = date.getMonth() + 1;
    time += month < 10 ? `0${month}-` : `${month}-`;
    time += `${date.getFullYear()}`;
    if (!full) return time;
    time += date.getHours() < 10 ? ` 0${date.getHours()}:` : ` ${date.getHours()}:`;
    time += date.getMinutes() < 10 ? `0${date.getMinutes()}:` : `${date.getMinutes()}:`;
    time += date.getSeconds() < 10 ? `0${date.getSeconds()}` : `${date.getSeconds()}`;
    return time;
  }

function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " hari" : " hari yang") + " lalu";
    };
        let verifLevels = ["None", "Low", "Medium", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];
        let region = {
        "brazil": "Brazil :flag_br:",
        "eu-central": "Central Europe :flag_eu:",
        "singapore": "Singapore :flag_sg:",
        "japan":"Japan :flag_jp:",
        "us-central": "U.S. Central :flag_us:",
        "sydney": "Sydney :flag_au:",
        "us-east": "U.S. East :flag_us:",
        "us-south": "U.S. South :flag_us:",
        "us-west": ":U.S. West :flag_us:",
        "eu-west": "Western Europe :flag_eu:",
        "vip-us-east": "VIP U.S. East :flag_us:",
        "london": "London :flag_gb:",
        "amsterdam": "Amsterdam :flag_nl:",
        "hongkong": "Hong Kong :flag_hk:",
        "russia": "Russia :flag_ru:",
        "southafrica": "South Africa :flag_za:"
    }

function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Hina(){
    var randomNumber = Math.round(Math.random()*3);
    switch(randomNumber){
        case 0: return ':zombie:  ANJING KAU PANTEK BABI!!';
        case 1: return ':zombie: LO BODOH YA? MAU AJA DI HINA BODOHH!! ';
        case 2: return ':woman_cartwheeling: BAPAK KAU KULIAH JADI BIDAN!';
        case 3: return ':face_vomiting:  AIII BODO KAU,TIATI LAH KIMAK! ';
    }
}

function Hi(){
    var randomNumber = Math.round(Math.random()*3);
    switch(randomNumber){
        case 0: return 'ABANG SAYANG ADEK :relaxed: ';
        case 1: return 'NGENES KALI KAU PAKE COMMAND INI :yum:  ';
        case 2: return 'HI sayang nanti aku VC YA :shushing_face:  ';
        case 3: return 'Hi juga sayang MUAH :relaxed:  ';
    }
}

bot.on("warn", console.warn);
bot.on("error", console.error);
bot.on("ready", () => console.log(`${bot.user.tag} has been successfully turned on!`));
bot.on("disconnect", () => console.log("An error occurred, trying to reconnect!"));
bot.on("reconnecting", () => console.log("I am reconnecting now..."));
bot.on("message", async msg => { 
    if (msg.author.bot) return undefined;
    if (!msg.content.startsWith(PREFIX)) return undefined;

    const args = msg.content.split(" ");
    const searchString = args.slice(1).join(" ");
    const url = args[1] ? args[1].replace(/<(.+)>/g, "$1") : "";
    const serverQueue = queue.get(msg.guild.id);

    let command = msg.content.toLowerCase().split(" ")[0];
    command = command.slice(PREFIX.length)

    if (command === "help" || command == "cmd") {
        const helpembed = new Discord.RichEmbed()
            .setColor("#30ECE7")
            .setAuthor(bot.user.tag, bot.user.displayAvatarURL)
            .setDescription(`
__**Commands List**__
> >> \`**ADMIN Command**\`
> \`-kick ["@user"]\` - kick member dari server 
> \`-ban ["@user"]\` - ban member dari server 
> \`-clear\` - membersihkan pesan dari channel tertentu
> \`-Reboot!\` - Restart Bot
==============================
> >> \`**Music Commad**\`
> \`-play/P\` - command play music ketik -p "judul lagu" 
> \`-play [title/url]\` - play tapi sebih spesifik seperti playlist youtube 
> \`-skip/S\` - skip 1 lagu dari daftar queue
> \`-stop/leave/kill/disconect\` - stop semua lagu, bot off
> \`-search/sc\` - Cari lagu manual
> \`-repeat/loop\` - Mengulangi lagu dari daftar queue
> \`-shuffle/remix\` - mengacak daftar urut dari daftar queue
> \`-pause\` - U know lah
> \`-resume\` - ni apa lg hadehh
> \`-np\` - list lagu yang di mainkan
> \`-queue/q\` - daftar antree lagu kalian 
> \`-volume/vol\` - Set volume Range 0-100 lebih dari itu suara kek sampah
==============================
> >> \`**USEFULL COMMAND**\`
> \`-about\` - Informasi Bot
> \`-server\` - Informasi Server
> \`-Avatar ["@user"]\` - Menampilkan Avatar User
> \`-User ["@user"]\` - Menampilkan Info User
> \`-hi\` - random message buat zombloo
> \`-hina\` - random message buat yg suka di maki - maki (tiati Baper)
> \`-ping\`  - info latency 
> \`-witcher!\` - RANDOM MESSAGE YEL YEL KALIAN!!
==============================
> >> \`**Guide Command**\`
> \`-element\` - element converter table
> \`-saverefine\` - List biaya safe refine
> \`-lvpenalty\` - daftar monster penalty menurut lv kalian
> \`-wppenalty\` - daftar size penalty dari senjata
> \`-pettaming\` - list pet
> \`-petfusion\` - list fusion pet
> \`-cardcraft\` - Biaya crafting kartu king poring
`)
            .setFooter("Bot from lyon to WITCHER")
            .setTimestamp()
        msg.channel.send(helpembed)
                            .then(msg => {
                        msg.delete(3600000)
                      });

}            if (command === "about" || command == "info") {
                  const helpembed = new Discord.RichEmbed()
                      .setColor("#030303")
                      .setAuthor(`All about The Witcher™`, bot.user.displayAvatarURL)
                      .setDescription("Hi Perkenalkan **The Witcher™** Bot yang di tulis oleh **Ganja Seller#7812** mengunakan discord js 12.2.0, ketik \`-help\` untuk detail command \nBerikut beberapa fitur Bot ```css\n💻 Server Management \n⭐ Auto Role \n🎶 Music System  \n💡 Dan banyak fitur lain nya``` \nBot akan terus ada pembaruan, Stay tune  :)")
                      msg.channel.send(helpembed)
                        .then(msg => {
                        msg.delete(3600000)
                      });

}            if (command === "server info" || command == "server") {
                 let sicon = msg.guild.iconURL;
                 let serverembed = new Discord.RichEmbed()
                      .setDescription(":desktop: **Informasi Server**")
                      .addField("**Nama**", msg.guild.name, false)
                      .addField("**:id: ID Server**", msg.guild.id, false)
                      .addField("**:crown: Owner**", `${msg.guild.owner.user.username}#${msg.guild.owner.user.discriminator}`, false)
                      .addField("**:earth_asia: Server Region**", region[msg.guild.region], false)
                      .addField("**:busts_in_silhouette: Member**", `${msg.guild.members.size} (${msg.guild.members.filter(member => !member.user.bot).size} Manusia ${msg.guild.members.filter(member => member.user.bot).size} Bot )`, false)
                      .addField("**:speech_balloon: Channel**", msg.guild.channels.size, true)
                      .addField("**:closed_lock_with_key: Role**", msg.guild.roles.size, true)
                      .addField("**:calendar: Tanggal dibuat**", `${msg.channel.guild.createdAt.toGMTString().substr(0, 16)} (${checkDays(msg.channel.guild.createdAt)})`, false)
                      .setThumbnail(msg.guild.iconURL)
                      .setColor("#030303")
                      .setTimestamp()
                      msg.channel.send(serverembed)
                        .then(msg => {
                        msg.delete(3600000)
                      });
  
}            if (command === 'user') {
                      let user = msg.mentions.users.first() || msg.author;
                      const member = msg.mentions.members.first() || msg.member;

                      let embed = new Discord.RichEmbed()
                      .setTimestamp()
                      .setDescription(":bust_in_silhouette:  **Informasi User**")
                      .setThumbnail(`${user.avatarURL}`, true)
                      .addField(":id: ID:", user.id, false)
                      .addField(":star: Full Username:", user.tag , false)
                      .addField(":star: Nick Server:", `${member.nickname !== null ? `${member.nickname}` : 'None'}`, true)
                      .addField(":star: Join Discord:", user.createdAt.toLocaleDateString(), false)
                      .addField(":star: Join Server:", member.joinedAt.toLocaleDateString(), false)
                      .addField(":lock: Roles", member.roles.map(r => `${r}`).join(' | '), false);
                      
                      msg.channel.send(embed)
                          .then(msg => {
                        msg.delete(3600000)
                      });
  
}            if (command === 'avatar') {
                      let user = msg.mentions.users.first() || msg.author;
                      const embed = new Discord.RichEmbed()
                      .setColor("#030303")
                      .setTitle('')
                      .setFooter('The Witcher™')
                      .setTimestamp()
                      .setImage(`${user.avatarURL}`, true)
                      msg.channel.send({ embed })
                      .then(msg => {
                        msg.delete(3600000)
                      });
                      
}          if(command === "saverefine") {
                      const usefull = new Discord.RichEmbed()
                      .setTitle('~~Tutorial orang lemah~~ / Biaya Save Refine')
                      .setDescription(`
> **+4 → +5** 
> 5x <:ori:718366299654455297> atau <:elu:718366299901919233> | 1 item yg sama | 100.000 <:zen:718366299750662194> 
> 
> **+5 → +6** 
> 10x <:ori:718366299654455297> atau <:elu:718366299901919233> | 2 item yg sama | 220.000 <:zen:718366299750662194>
> 
> **+6 → +7:**
> 15x <:ori:718366299654455297> atau <:elu:718366299901919233> | 3 item yg sama | 470.000 <:zen:718366299750662194>
> 
> **+7 → +8** 
> 25x <:ori:718366299654455297> atau <:elu:718366299901919233> | 4 item yg sama | 910.000 <:zen:718366299750662194>
> 
> **+8 → +9** 
> 50x <:ori:718366299654455297> atau <:elu:718366299901919233> | 6 item yg sama | 1.650.000 <:zen:718366299750662194>
> 
> **+9 → +10** 
> 85x <:ori:718366299654455297> atau <:elu:718366299901919233> | 10 item yg sama | 2.740.000 <:zen:718366299750662194>
> 
> __**Total**__
> +4 → +10:
> 190x <:ori:718366299654455297> or <:elu:718366299901919233> | 26 item yg sama | 6.190.000 <:zen:718366299750662194>
> Item rusak <:bkh:718366302028169267> juga bisa di gunakan sebagai material
`)
                      .setImage(`https://i.imgur.com/7oKqZW2.jpg`)
                      .setTimestamp()
                      msg.channel.send(usefull)
                      .then(msg => {
                        msg.delete(3600000)
                      });
  
}          if(command === "lvpenalty") {
                   const usefull = new Discord.RichEmbed()
                      .setImage(`https://i.imgur.com/tJWTY7A.jpg`)
                      .setTimestamp()
                      msg.channel.send(usefull)
                        .then(msg => {
                        msg.delete(3600000)
                      });

}          if(command === "wppenalty") {
                   const usefull = new Discord.RichEmbed()
                     .setImage(`https://i.imgur.com/DUNQwIE.jpg`)
                     .setTimestamp()
                      msg.channel.send(usefull)
                        .then(msg => {
                        msg.delete(3600000)
                      });

}          if(command === "pettaming") {
                   const usefull = new Discord.RichEmbed()
                     .setImage(`https://i.imgur.com/yikVypn.jpg`)
                      msg.channel.send(usefull)
                        .then(msg => {
                        msg.delete(3600000)
                      });

}          if(command === "pettaming") {
                   const usefull = new Discord.RichEmbed()
                     .setImage(`https://i.imgur.com/aDVJ8jP.png`)
                      msg.channel.send(usefull)
                        .then(msg => {
                        msg.delete(3600000)
                      });

}          if(command === "pettaming") {
                   const usefull = new Discord.RichEmbed()
                     .setImage(`https://i.imgur.com/EXnvSVM.png`)
                      msg.channel.send(usefull)
                        .then(msg => {
                        msg.delete(3600000)
                      });

}          if(command === "pettaming") {
                   const usefull = new Discord.RichEmbed()
                     .setImage(`https://i.imgur.com/1Ejv6qL.png.png`)
                      msg.channel.send(usefull)
                        .then(msg => {
                        msg.delete(3600000)
                      });
  
}          if(command === "pettaming") {
                   const usefull = new Discord.RichEmbed()
                     .setImage(`https://i.imgur.com/F4Fnanh.png`)
                      msg.channel.send(usefull)
                        .then(msg => {
                        msg.delete(3600000)
                      });
}          if(command === "petfusion") {
                   const usefull = new Discord.RichEmbed()
                     .setImage(`https://i.imgur.com/CEPkAXM.png`)
                      msg.channel.send(usefull)
                        .then(msg => {
                        msg.delete(3600000)
                      });
}          if(command === "petfusion") {
                   const usefull = new Discord.RichEmbed()
                     .setImage(`https://i.imgur.com/v1IEvfc.png`)
                      msg.channel.send(usefull)
                        .then(msg => {
                        msg.delete(3600000)
                      });
}          if(command === "petfusion") {
                   const usefull = new Discord.RichEmbed()
                     .setImage(`https://i.imgur.com/AwdTrbI.png`)
                      msg.channel.send(usefull)
                        .then(msg => {
                        msg.delete(3600000)
                      });

}          if(command === "element") {
                   const usefull = new Discord.RichEmbed()
                     .setImage(`https://i.imgur.com/8O03DsM.jpg`)
                     .setTimestamp()
                      msg.channel.send(usefull)
                        .then(msg => {
                        msg.delete(3600000)
                      });

}          if(command === "cardcraft") {
                   const usefull = new Discord.RichEmbed()
                     .setDescription("Buka link [Card Crafting](https://bit.ly/2MtpUuI)")
                      msg.channel.send(usefull)
                        .then(msg => {
                        msg.delete(3600000)
                      });  
  

}          if(command === "space") {
                   const m = await msg.channel.send("=======================");

}            if (command === "kick") {
                   if(!msg.member.roles.some(r=>["ADMIN", "Moderator"].includes(r.name)) )
                   return msg.reply("sori bro/sis lo bukan admin! :yawning_face: ");

                  let member = msg.mentions.members.first() || msg.guild.members.get(args[0]);
                  if(!member)
                    return msg.reply("Silahkan metion member yang valid di Server ini");
                  if(!member.kickable) 
                    return msg.reply("Gw ga bisa kick Dia! Kasta nya beda:warning: ");

                  let reason = args.slice(1).join(' ');
                  if(!reason) reason = "Dia bau sapi";

                  await member.kick(reason)
                    .catch(error => msg.reply(`Maaf ${msg.author} Gw Gabisa kick dia : ${error}`));
                  msg.reply(`${member.user.tag} Telah di tendang oleh :fire: ${msg.author.tag} `); 
      
}           if (command === "ban") {
                  if(!msg.member.roles.some(r=>["ADMIN"].includes(r.name)) )
                    return msg.reply("Sori  lo bukan ADMIN :poop: !");

                  let member = msg.mentions.members.first();
                  if(!member)
                    return msg.reply("Silahkan metion member yang valid di Server ini");
                  if(!member.bannable) 
                    return msg.reply("Gw ga bisa kick Dia! Kasta nya beda:warning:");

                  let reason = args.slice(1).join(' ');
                  if(!reason) reason = "Dia bau sapi";

                  await member.ban(reason)
                    .catch(error => msg.reply(`Maaf ${msg.author} Gw Gabisa kick dia : ${error}`));
                  msg.reply(`${member.user.tag} :leaves: Telah di bunuh oleh ${msg.author.tag} Dan Tak akan kembali :leaves: }`);

}          if(command === "ping") {
                    const m = await msg.channel.send("Ping?");
                    m.edit(`_PING!!_ Latency BOT **${m.createdTimestamp - msg.createdTimestamp}ms.** Latency Ente **${Math.round(bot.ping)}ms,**`) ;

}          if(command === "witcher!") {
                  const m = msg.reply(Witcher());
           
}          if(command === "hina") {
                  const m = msg.reply(Hina());
             
}          if(command === "hi") {
                  const m = msg.reply(Hi());

}          if(command === "clear") {
                   if(!msg.member.roles.some(r=>["ADMIN"].includes(r.name)) )
                  if(!msg.member.roles.some(r=>["Server helper"].includes(r.name)) )
                  return msg.reply("Sori bro/sist lo ga punya akses :poop: !"); {
                        msg.channel.fetchMessages()
                           .then(function(list){
                        msg.channel.bulkDelete(list);
                  }, function(err){msg.channel.send("ERROR: ERROR CLEARING CHANNEL.")})                        
            };
} 
    return undefined;
});

bot.login(TOKEN);
