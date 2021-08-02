const fs = require('fs');
const Discord = require('discord.js');
const conf = require('./config.json');
const prefix = conf.prefix;
const token = conf.TOKEN;
const mustRoles = require('./roles.json').must;

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}


client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


client.on("message", message => {

    if(message.channel.id == '870579705152155658' &&  !message.content.startsWith(prefix) && !message.member.hasPermission('ADMINISTRATOR')){
        message.delete();
        return;
    } 

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.toLowerCase().slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

    console.log(args);
    return;
    
    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command){
        if(message.channel.id == '870579705152155658'){
            message.delete();
        }
        return;
    }

	try {
		command.execute(message, args)

	} catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command!\nMaybe you passed an invalid argument!\nPlease try again. <3')
            .then(msg =>{
                setTimeout(() => msg.delete(), 6000)
            });
        
	}
    setTimeout(()=> message.delete(),4000)
});

client.on("guildMemberAdd", guildMember=>{
    mustRoles.map(role=>{
        guildMember.roles.add(role.id);
    });
});

client.login(token);