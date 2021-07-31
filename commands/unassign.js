const ROLES = require('../roles.json')
module.exports = {
	name: 'unassign',
	description: 'Deletes the roles for the user!',
	execute(message, args) {

        const unassigned =[];
        args.map(arg => {
            ROLES.selfroles.map( x => {
                if(x.name == arg){
                    message.member.roles.remove(x.id);
                    unassigned.push(x.name);
                }
            });
        })

		message.reply(`\n${unassigned} role(s) have been removed successfully`)
            .then(msg=>{
                setTimeout(() => msg.delete(), 10000)
            });
	},
};