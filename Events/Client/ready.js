const clk = require('chalk')
const mng = require('mongoose')
const { mongooseConnectionString } = require('../../Structures/config.json')

module.exports = {
    name: 'ready',
    once: true,
    /**
     * 
     * @param {Client} client 
     */
    execute(client) {
        const users = client.users.cache.size
        console.log(clk.blueBright.bold(' \'The client is now ready.\' - 🤓'));
        client.user.setActivity(`to ${users} users.`, { type: "STREAMING", URL: "https://www.twitch.tv/rraenee" })

        if(!mongooseConnectionString) {
            return console.log(clk.redBright.bold(' Connection string not found skipping database Connection.'))
        } else{
            mng.connect(mongooseConnectionString, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }).then(() => {
                console.log(clk.greenBright.bold('Connection to Database is successfull.'))
            }).catch((err) => {
                console.log(err)
            })
        }
    }
}