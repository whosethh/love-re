const clk = require('chalk')
const mng = require('mongoose')
const { mongooseConnectionString } = require('../../config.json')

module.exports = {
    name: 'ready',
    once: true,
    /**
     * 
     * @param {Client} client 
     */
    execute(client) {
        console.log(clk.blueBright.bold(' \'The client is now ready.\' - 🤓'));
        client.user.setActivity('\'Hello \' - 🤓')

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