const fs = require('fs');
const Discord = require('discord.js');
const conf = require('./config.json');
const prefix = conf.prefix;
const token = conf.TOKEN;

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}


client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // let guild = client.guilds.cache.get('859292086989881364'); 
    // //'859292086989881364') -> main server
    // //861949315584884748 -> suresj's
    // guild.members.fetch().then((user) => {

    //     user.forEach((member,id)=>{
    //         roles.must.forEach(r=>{
    //             member.roles.add(r.id);
    //             console.log('role assigned')
    //         });
    //     });

        
    // }).catch(console.error);
    // console.log('ended');
});


client.on("message", message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

	try {
		command.execute(message, args)

	} catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command!\nMaybe you passed an invalid argument!\nPlease try again. <3')
            .then(msg =>{
                setTimeout(() => msg.delete(), 10000)
            });
        
	}
    setTimeout(()=> message.delete(),10000)
});



client.login(token);