const ROLES = require('../roles.json')
module.exports = {
	name: 'assign',
	description: 'Assigns self-assignable roles!',
	execute(message, args) {

        const assigned =[];
        args.map(arg => {
            ROLES.selfroles.map( x => {
                if(x.name == arg){
                    message.member.roles.add(x.id);
                    assigned.push(x.name);
                }
            });
        })

		message.reply(`\n${assigned} role(s) have been assigned successfully.`)
            .then(msg=>{
                setTimeout(() => msg.delete(), 10000)
            });
	},
};