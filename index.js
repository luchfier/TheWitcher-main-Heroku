const Discord = require("discord.js");
const { Client, Util } = require("discord.js");
const PREFIX = process.env.PREFIX;
require("./server.js")
const bot = new Client({ disableEveryone: false });
const queue = new Map();
const {MessageEmbed} = require('discord.js');
const moment = require('moment');
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const GOOGLE_API_KEY = process.env.YTAPI_KEY;
const youtube = new YouTube(GOOGLE_API_KEY);
const momentDurationFormatSetup = require("moment-duration-format");



bot.on('ready', () => {
    bot.user.setStatus('available')
    bot.user.setPresence({
        game: {
            name: 'AIO bot Witcher -about',
        }
    });
});

bot.on('guildMemberAdd', member => {
    member.addRole(member.guild.roles.find(role => role.name === "Masyarakat"));
    var ran = randomRange(0,5);
    var greeting;
    switch (ran) {
        case 0:
            greeting = `:tada: Hi <@${member.user.id}> Selamat datang di **WITCHER GUILD** <a:kilap:719138495074926612><a:wel:701399909072502854><a:com:701399909017976863><a:kilap:719138495074926612>`;
            break;
        case 1:
            greeting = `<a:crew:719138492830973977> Selamat Datang di **WITCHER GUILD** <@${member.user.id}> Semoga Betah ya <a:kilap:719138495074926612><a:wel:701399909072502854><a:com:701399909017976863><a:kilap:719138495074926612>`;
            break;
        case 2:
            greeting = `Halo :wave: <@${member.user.id}> <a:kilap:719138495074926612><a:wel:701399909072502854><a:com:701399909017976863><a:kilap:719138495074926612> Aku belum kenal kamu, semoga kita semakin akrab ya <:shinobu:704044182909485058>`;
            break;
       case 3:
            greeting = `<a:kilap:719138495074926612><a:wel:701399909072502854><a:com:701399909017976863><a:kilap:719138495074926612> Selamat datang <@${member.user.id}> Di <a:kilap:719138495074926612>**WITCHER GUILD**<a:kilap:719138495074926612>`;
            break;
        case 4:
            greeting = `Guys <@${member.user.id}> <:shinobu:704044182909485058> Baru join, kasih dia teh anget <a:apih:701397086662557717>`;
            break;
        case 5:
            greeting = `Dua tiga kucing berlari <a:ngocok:704041702670860299> Selamat datang di **WITCHER GUILD** <@${member.user.id}> <a:kilap:719138495074926612><a:wel:701399909072502854><a:com:701399909017976863><a:kilap:719138495074926612>`;
            break;
    }
    member.guild.channels.get('701530747013562448').send(greeting);
});


bot.on('guildMemberRemove', member => {
    var ran = randomRange(0,5);
    var bye;
    switch (ran) {
        case 0:
            bye ='**' + member.user.username + '#' + member.user.discriminator +'** <:nisan1:719144460583436358> Telah berpulang kerumah emak nya,Sampai jumpa lagi di WITCHER <a:peti:718780864082870332>';
            break;
        case 1:
            bye ='**' + member.user.username + '#' + member.user.discriminator +'** <:nisan2:719144460285509702> TELAH MATI!! eh OUT!!!';
            break;
        case 2:
            bye ='**' + member.user.username + '#' + member.user.discriminator +'** <:nisan3:719144455747403798> Telah Meninggalkan kita gess <a:peti:718780864082870332>';
            break;
        case 4:
            bye ='**' + member.user.username + '#' + member.user.discriminator +'** <:nisan3:719144455747403798> Dia telah Pergi jauh sekali :leaves:';
            break;
        case 5:
            bye ='**' + member.user.username + '#' + member.user.discriminator +'** <a:peti:718780864082870332> Pamit Dulu gess <a:ngocok:704041702670860299><a:ngocok:704041702670860299>';
            break;
    }
    member.guild.channels.get('701530872427315381').send(bye);
});


//music component ==============================================

async function handleVideo(video, msg, voiceChannel, playlist = false) {
    const serverQueue = queue.get(msg.guild.id);
    const song = {
        id: video.id,
        l1: moment.duration(video.duration).format('hh:mm:ss'),
        title: Util.escapeMarkdown(video.title),
        url: `https://www.youtube.com/watch?v=${video.id}`
    };
    if (!serverQueue) {
        const queueConstruct = {
            textChannel: msg.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 100,
            playing: true,
            loop: false
        };
        queue.set(msg.guild.id, queueConstruct);

        queueConstruct.songs.push(song);
        try {
            var connection = await voiceChannel.join();
            queueConstruct.connection = connection;
            play(msg.guild, queueConstruct.songs[0]);
        } catch (error) {
            console.error(`Tidak bisa Terhubung ke Voice Channel: ${error}`);
            queue.delete(msg.guild.id);
            return msg.channel.send(`Tidak bisa Terhubung ke Voice Channel: **\`${error}\`**`);
        }
    } else {
     const queue = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setDescription(`\n**\`${song.title}\`** | \`${song.l1}\` \n__**Di Tambahkan ke Antrian**__ :thumbsup: `)
        serverQueue.songs.push(song);
        console.log(serverQueue.songs);
        if (playlist) return undefined;
      
        else return msg.channel.send(queue);
    }
    return undefined;
}
function play(guild, song) {
    const serverQueue = queue.get(guild.id);
    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }
    const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
        .on("end", reason => {
            if (reason === "`\Server ERROR\`") console.log("Song ended");
            else console.log(reason);
            const shiffed = serverQueue.songs.shift();
            if (serverQueue.loop === true) {
	   	serverQueue.songs.push(shiffed); 
	    };
            play(guild, serverQueue.songs[0]);
        })
        .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 100);
     const lagu = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setDescription(`🎶  **|**  Start Playing <a:dance:743435170392047698> <a:apih:701397086662557717> \n**\`${song.title}\`** | \`${song.l1}\``)
    serverQueue.textChannel.send(lagu);
}

//end music component ==============================================

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

function Witcher(){
    var randomNumber = Math.round(Math.random()*3); // 0, 1 or 2
    switch(randomNumber){
        case 0: return 'a lannister always pay his debts / ehh salah :kissing_closed_eyes:  ';
        case 1: return 'Meaw miyaw miyau oiii >> btw logo guguk :kissing_closed_eyes:  ';
        case 2: return 'Miaaaaaww aye aye :point_left: :point_up: :point_left: :point_up: ';
        case 3: return ':kissing_cat: MIAAW MIAAW NYAA :kissing_cat:  ';
    }
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
bot.on('ready', () => console.log(`${bot.user.tag} has been successfully turned on!`));
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
> \`-role\` - memberikan role core
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
> \`-Roll/rng\` - Nomor acak
==============================
> >> \`**Guide Command**\`
> \`-element\` - element converter table
> \`-saverefine\` - List biaya safe refine
> \`-lvpenalty\` - daftar monster penalty menurut lv kalian
> \`-wppenalty\` - daftar size penalty dari senjata
> \`-pettaming\` - list pet
> \`-petfusion\` - list fusion pet
> \`-cardcraft\` - Biaya crafting kartu king poring
> \`-wocguide\` - menampilkan strategi WOC Guild
> \`-woeguide-attack\` - menampilkan strategi attack WOE Guild
> \`-woeguide-defense\` - menampilkan strategi defense WOE Guild
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
  

}          if(command === "wocguide") {
                   msg.channel.send("@everyone <a:apih:701397086662557717> Guide to War of Crystals HERE!! <a:apih:701397086662557717>");
                    const woc = new Discord.RichEmbed()
                     .setImage(`https://i.imgur.com/UyBhsRH.jpg`)
                    msg.channel.send(woc)
                      .then(msg => {
                        msg.delete(26400000)
                      });
  
}          if(command === "wocguide") {
                    const woc = new Discord.RichEmbed()
                     .setImage(`https://i.imgur.com/QIh3ETm.jpg`)
                    msg.channel.send(woc)
                      .then(msg => {
                        msg.delete(26400000)
                      });
  
}          if(command === "wocguide") {
                    const woc = new Discord.RichEmbed()
                     .setImage(`https://i.imgur.com/EdEi0n6.jpg`)
                    msg.channel.send(woc)
                      .then(msg => {
                        msg.delete(26400000)
                      });
  
}          if(command === "wocguide") {
                    const woc = new Discord.RichEmbed()
                     .setImage(`https://i.imgur.com/0M8Ef6T.jpg`)
                    msg.channel.send(woc)
                      .then(msg => {
                        msg.delete(26400000)
                      });
  
}          if(command === "wocguide") {
                    const woc = new Discord.RichEmbed()
                     .setImage(`https://i.imgur.com/xajQPz7.jpg`)
                    msg.channel.send(woc)
                      .then(msg => {
                        msg.delete(26400000)
                      });
  
}          if(command === "wocguide") {
                    const woc = new Discord.RichEmbed()
                     .setImage(`https://i.imgur.com/yo3Az3c.jpg`)
                    msg.channel.send(woc)
                      .then(msg => {
                        msg.delete(26400000)
                      });
  
}          if(command === "wocguide") {
                    const woc = new Discord.RichEmbed()
                     .setImage(`https://i.imgur.com/bjlJYfu.jpg`)
                    msg.channel.send(woc)
                      .then(msg => {
                        msg.delete(26400000)
                      });
  
}          if(command === "wocguide") {
                    const woc = new Discord.RichEmbed()
                     .setImage(`https://i.imgur.com/lsRbEWV.jpg`)
                    msg.channel.send(woc)
                      .then(msg => {
                        msg.delete(26400000)
                      });
  
}          if(command === "wocguide") {
                    const woc = new Discord.RichEmbed()
                     .setImage(`https://i.imgur.com/OwZi2hd.jpg`)
                    msg.channel.send(woc)
                      .then(msg => {
                        msg.delete(26400000)
                      });
    
}          if(command === "woeguide-attack") {
                    msg.channel.send("@everyone <a:apih:701397086662557717> Guide to Attack on War Of Emperium HERE!! <a:apih:701397086662557717>");
                    const woe = new Discord.RichEmbed()
                     .setImage(`https://i.imgur.com/5noYs2M.jpg`)
                    msg.channel.send(woe)
                      .then(msg => {
                        msg.delete(26400000)
                      });
    
}          if(command === "woeguide-attack") {
                    const woe = new Discord.RichEmbed()
                     .setImage(`https://i.imgur.com/p6nQctH.jpg`)
                    msg.channel.send(woe)
                      .then(msg => {
                        msg.delete(26400000)
                      });
    
}          if(command === "woeguide-attack") {
                    const woe = new Discord.RichEmbed()
                     .setImage(`https://i.imgur.com/OJ0iQoP.jpg`)
                    msg.channel.send(woe)
                      .then(msg => {
                        msg.delete(26400000)
                      });
    
}          if(command === "woeguide-attack") {
                    const woe = new Discord.RichEmbed()
                     .setImage(`https://i.imgur.com/nF54CCN.jpg`)
                    msg.channel.send(woe)
                      .then(msg => {
                        msg.delete(26400000)
                      });
    
}          if(command === "woeguide-attack") {
                    const woe = new Discord.RichEmbed()
                     .setImage(`https://i.imgur.com/4bL4Uzn.jpg`)
                    msg.channel.send(woe)
                      .then(msg => {
                        msg.delete(26400000)
                      });
    
}          if(command === "woeguide-attack") {
                    const woe = new Discord.RichEmbed()
                     .setImage(`https://i.imgur.com/ofSqp8R.jpg`)
                    msg.channel.send(woe)
                      .then(msg => {
                        msg.delete(26400000)
                      });
    
}          if(command === "woeguide-attack") {
                    const woe = new Discord.RichEmbed()
                     .setImage(`https://i.imgur.com/OHqirGR.jpg`)
                    msg.channel.send(woe)
                      .then(msg => {
                        msg.delete(26400000)
                      });
    
}          if(command === "woeguide-defense") {
                    msg.channel.send("@everyone <a:apih:701397086662557717> Guide to Defense on War Of Emperium HERE!! <a:apih:701397086662557717>");
                    const woe = new Discord.RichEmbed()
                     .setImage(`https://i.imgur.com/RIuPPDq.jpg`)
                    msg.channel.send(woe)
                      .then(msg => {
                        msg.delete(26400000)
                      });
    
}          if(command === "woeguide-defense") {
                    const woe = new Discord.RichEmbed()
                     .setImage(`https://i.imgur.com/Kwonnji.jpg`)
                    msg.channel.send(woe)
                      .then(msg => {
                        msg.delete(26400000)
                      });
    
}          if(command === "woeguide-defense") {
                    const woe = new Discord.RichEmbed()
                     .setImage(`https://i.imgur.com/uj7ffAR.jpg`)
                    msg.channel.send(woe)
                      .then(msg => {
                        msg.delete(26400000)
                      });
    
}          if(command === "woeguide-defense") {
                    const woe = new Discord.RichEmbed()
                     .setImage(`https://i.imgur.com/vhoO0uG.jpg`)
                    msg.channel.send(woe)
                      .then(msg => {
                        msg.delete(26400000)
                      });
    
}          if(command === "woeguide-defense") {
                    const woe = new Discord.RichEmbed()
                     .setImage(`https://i.imgur.com/8tWIACy.jpg`)
                    msg.channel.send(woe)
                      .then(msg => {
                        msg.delete(26400000)
                      });
    
}          if(command === "woeguide-defense") {
                    const woe = new Discord.RichEmbed()
                     .setImage(`https://i.imgur.com/xwEkWKp.jpg`)
                    msg.channel.send(woe)
                      .then(msg => {
                        msg.delete(26400000)
                      });
    
}          if(command === "woeguide-defense") {
                    const woe = new Discord.RichEmbed()
                     .setImage(`https://i.imgur.com/GHIANgv.jpg`)
                    msg.channel.send(woe)
                      .then(msg => {
                        msg.delete(26400000)
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
    
}          if(command === "roll"|| command === "rng") {
                  
              let comma_index = msg.content.indexOf(',');
              let num1 = msg.content.substring((PREFIX + 'rng ').length, comma_index);
              num1 = parseInt(num1);
              let num2 = msg.content.substring(comma_index + 1);
              num2 = parseInt(num2);
              if (comma_index == -1 || isNaN(num1) || isNaN(num2)) {
                let log = `Successful error reply to ${msg.content}`;
                msg.reply(`mohon masukan angka yang valid \`(Contoh: ${PREFIX}roll 1,999)\``)
                .then(console.log(log))
                .catch(console.error);
                return log;
              }

              let min = Math.min(num1, num2);
              let max = Math.max(num1, num2);
              let random = Math.floor(Math.random() * (max - min + 1)) + min;

              const rich_embed = new Discord.RichEmbed()
              .setColor('DARK_GOLD')
              .setThumbnail('https://i.imgur.com/YHGYYg1.png')
              .setAuthor('Random Number Generator')
              .addField('Dari', `__${min}__`, true)
              .addField('Ke',`__${max}__`, true)
              .addField('Hasil :confetti_ball:', `__\`${random}\`__`, false)
              .setFooter("The Witcher™")
              .setTimestamp();
            
              msg.channel.send('Bentar Ya... <a:roll:743791502395965460>').then((msg)=> {
                    setTimeout(function(){
                      msg.edit(rich_embed);
                    }, 3000)
                  })
              .then(console.log(`Successful command reply to ${msg.content}`))
              .catch(console.error);
              return rich_embed;
	
}           if (command == 'role') {
                if(!msg.member.roles.some(r=>["👑 ADMIN"].includes(r.name)) )
                if(!msg.member.roles.some(r=>["💎 Server Helper"].includes(r.name)) )
                return msg.reply("maaf, command ini hanya bisa di gunakan oleh admin,\ncukup tulis nama kamu dan nick char lalu mention/tag ADMIN untuk up role kamu \ncontoh", {files: ["https://i.imgur.com/GUUpvTB.png"]});
                    
                let role   = msg.guild.roles.find(r => r.name === "CORE");
                let remove = msg.guild.roles.find(r => r.name === "Masyarakat");
                let member = msg.mentions.members.first();

                member.addRole(role).catch(console.error);
                member.removeRole(remove);
                return msg.channel.send(`
Done :white_check_mark:
> Hi :wave: <@${member.user.id}> silahkan ke <#733579122739118140> untuk memilih job kamu.`);
                    
             
}          if(command === "clear") {
                  if(!msg.member.roles.some(r=>["👑 ADMIN"].includes(r.name)) )
                  if(!msg.member.roles.some(r=>["💎 Server Helper"].includes(r.name)) )
                  return msg.reply("Sori bro/sist lo ga punya akses :poop: !");
                  msg.channel.fetchMessages().then(messages => {
                  msg.channel.bulkDelete(messages);
                  const messagesDeleted = messages.array().length; 
                  msg.channel.send("Telah Menghapus `" + messagesDeleted + "` Message")
                    .then(msg => {
                        msg.delete(1500)
                      });
                  })
  
} 

  //music command=============

    if (command === "play" || command === "p") {
        const voiceChannel = msg.member.voiceChannel;
        if (!voiceChannel) return msg.reply("**\`Silahkan Masuk ke Voice Channel untuk Play Music\`** :boar:");
        const permissions = voiceChannel.permissionsFor(msg.client.user);
        if (!permissions.has("CONNECT")) {
            return msg.channel.send("Maaf aktifkan izin **`CONNECT`** Untuk melanjutkan");
        }
        if (!permissions.has("SPEAK")) {
            return msg.channel.send("Maaf aktifkan izin **`SPEAK`** Untuk melanjutkan");
        }
        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();
            for (const video of Object.values(videos)) {
                const video2 = await youtube.getVideoByID(video.id);
                await handleVideo(video2, msg, voiceChannel, true); 
            }
            
        const song = {
                      id: video.id,
                      l1: moment.duration(video.duration).format('hh:mm:ss'),
                      title: Util.escapeMarkdown(video.title),
                      url: `https://www.youtube.com/watch?v=${video.id}`
                  };
             const Ye = new Discord.RichEmbed()
                .setColor("RANDOM")
                .setDescription(`\n**\`${song.title}\`** | \`${song.l1}\` \n__**Di Tambahkan ke Antrian**__ :thumbsup: `)
                return msg.channel.send(Ye);

        } else {
            try {
                var video = await youtube.getVideo(url);
            } catch (error) {
                try {
                    var videos = await youtube.searchVideos(searchString, 10);
                    var video = await youtube.getVideoByID(videos[0].id);
                    if (!video) return msg.channel.send("🆘  **|**  Tidak ada hasil ditemukan.");
                } catch (err) {
                    console.error(err);
                    return msg.channel.send("🆘  **|**  Tidak ada hasil ditemukan.");
                }
            }
            return handleVideo(video, msg, voiceChannel);
        }
    }
  
    if (command === "search" || command === "sc") {
        const voiceChannel = msg.member.voiceChannel;
        if (!voiceChannel) return msg.reply("**\`Silahkan Masuk ke Voice Channel untuk Play Music\`** :boar:");
        const permissions = voiceChannel.permissionsFor(msg.client.user);
        if (!permissions.has("CONNECT")) {
            return msg.channel.send("Maaf aktifkan izin **`CONNECT`** Untuk melanjutkan");
        }
        if (!permissions.has("SPEAK")) {
            return msg.channel.send("Maaf aktifkan izin **`SPEAK`** Untuk melanjutkan");
        }
        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();
            for (const video of Object.values(videos)) {
                const video2 = await youtube.getVideoByID(video.id); 
                await handleVideo(video2, msg, voiceChannel, true); 
            }
                   const song = {
                      id: video.id,
                      l1: moment.duration(video.duration).format('hh:mm:ss'),
                      title: Util.escapeMarkdown(video.title),
                      url: `https://www.youtube.com/watch?v=${video.id}`
                  };
             const Ye2 = new Discord.RichEmbed()
                .setColor("RANDOM")
                .setDescription(`\n**\`${song.title}\`** | \`${song.l1}\` \n__**Di Tambahkan ke Antrian**__ :thumbsup: `)
                return msg.channel.send(Ye2);
        } else {
            try {
                var video = await youtube.getVideo(url);
            } catch (error) {
                try {
                    var videos = await youtube.searchVideos(searchString, 10);
                    let index = 0;
                     const search= new Discord.RichEmbed()
            .setColor("RANDOM")
            .setDescription(`
__**Pilih Lagu <a:dance:743435170392047698>**__
${videos.map(video2 => `**\`${++index}\`.**  ${video2.title}`).join("\n")}
Silahkan ketik 1-10.`)
                    msg.channel.send(search);
                    try {
                        var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
                            maxMatches: 1,
                            time: 18000,
                            errors: ["time"]
                        });
                    } catch (err) {
                        console.error(err);
                        return msg.channel.send("Tidak ada input,Cancel...");
                    }
                    const videoIndex = parseInt(response.first().content);
                    var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                } catch (err) {
                    console.error(err);
                    return msg.channel.send("🆘  **|**  Tidak ada hasil ditemukan.");
                }
            }
            return handleVideo(video, msg, voiceChannel);
        }
    } else if (command === "skip" || command == "s") {
        if (!msg.member.voiceChannel) return msg.reply("**\`Silahkan Masuk ke Voice Channel untuk Play Music\`** :boar:");
        if (!serverQueue) return msg.channel.send("Tidak ada yang bisa di **\`skip\`**");
        serverQueue.connection.dispatcher.end("SOke");
        msg.channel.send("⏭️  **|**  Skip");
        return undefined;
      
    } else if (command === "stop" || command == "leave" ) {
        if (!msg.member.voiceChannel) return msg.reply("**\`Silahkan Masuk ke Voice Channel untuk Play Music\`** :boar:");
        if (!serverQueue) return msg.channel.send("Tidak ada yang bisa di **\`stop\`**");
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end("Oke");
        msg.channel.send("⏹️  **|**  Bye");
        return undefined;
      
    } else if (command === "volume" || command === "vol") {
        if (!msg.member.voiceChannel) return msg.reply("**\`Silahkan Masuk ke Voice Channel untuk Play Music\`** :boar:");
        if (!serverQueue) return msg.channel.send("Silahkan Mainkan lagu Untuk Mengunakan Command ini");
        if (!args[1]) return msg.channel.send(`Volume Sekarang: **\`${serverQueue.volume}%\`**`);
        if (isNaN(args[1]) || args[1] > 100) return msg.channel.send("Hanya Bisa Dalam **\`1\`** - **\`100\`**");

        serverQueue.volume = args[1];
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 100);
        return msg.channel.send(`I set the volume to: **\`${args[1]}%\`**`);
      
    } else if (command === "nowplaying" || command === "np") {
        if (!serverQueue) return msg.channel.send("Tidak ada lagu :stuck_out_tongue:");
          const np = new Discord.RichEmbed()
                      .setColor("RANDOM")
                      .setDescription(`**Live NOW!! <a:apih:701397086662557717> : \`${serverQueue.songs[0].title}\` | \`${serverQueue.songs[0].l1}\`**
                  `)      
        return msg.channel.send(np);
      
    } else if (command === "queue" || command === "q") {
        if (!serverQueue) return msg.channel.send("Tidak ada lagu :stuck_out_tongue:");
        let index = 0;
        const antri = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setDescription(`__**Daftar Antri**__
${serverQueue.songs.map(song => `**\`${++index}\`  |** ${song.title} **|** ${song.l1}`).join("\n")}
**Live NOW!! <a:apih:701397086662557717> : \`${serverQueue.songs[0].title}\` | \`${serverQueue.songs[0].l1}\`**
        `)      
        return msg.channel.send(antri);
      
    } else if (command === "pause") {
        if (serverQueue && serverQueue.playing) {
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause();
            return msg.channel.send("⏸  **|**  Berhenti sekejap");
        }
        return msg.channel.send("Tidak ada lagu :stuck_out_tongue:");
      
    } else if (command === "resume") {
        if (serverQueue && !serverQueue.playing) {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
            return msg.channel.send("▶  **|**  Gass kak!!");
        }
        return msg.channel.send("Tidak ada lagu :stuck_out_tongue:");
      
    } else if (command === "loop" || command == "repeat") {
    	if (serverQueue) {
            serverQueue.loop = !serverQueue.loop;
            return msg.channel.send(`:repeat: **|** repeat ${serverQueue.loop === true ? "on" : "off"}!`);
	};
	return msg.channel.send("Tidak ada lagu :stuck_out_tongue:");
    }  
  
    return undefined;
});

bot.login(process.env.BOT_TOKEN);
