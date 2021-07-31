const ROLES = require('../roles.json')
module.exports = {
	name: 'assign',
	description: 'Assigns self-assignable roles!',
	execute(message, args) {

        args.map(arg => {
            ROLES.selfroles.map( x => {
                if(x.name == arg){
                    console.log("We'll assign roles here.")
                }
            });
        })


		message.reply('Executing assign')
            .then(msg=>{
                setTimeout(() => msg.delete(), 10000)
            });
	},
};