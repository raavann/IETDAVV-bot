module.exports = {
	name: 'ready',
	once: true,
	execute() {
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
	},
};