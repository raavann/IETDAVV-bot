const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(typeof(client.guilds));
    // client.guilds.forEach(guild => {
    //     console.log(guild.roles)
    // });
});


//ietdavv
let iet = 'ODYwNDIzNTM4NTA2MjAzMTg3.YN7B3Q.-B5W9R-_Cl9NRyg1EkCi_dBsJbs' 
//test
let test = 'ODYyMDI5MDg4ODAxMTYxMjM2.YOSZJg.6zf7U-DKXNUujT7teAbJxl0CndY' 
client.login(iet);