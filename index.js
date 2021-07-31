const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

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



client.login('ODYwNDIzNTM4NTA2MjAzMTg3.YN7B3Q.-B5W9R-_Cl9NRyg1EkCi_dBsJbs');