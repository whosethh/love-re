const { Client, Collection } = require('discord.js');
const client = new Client({ intents: 32767 });
const { promisify } = require('util');
const { glob } = require('glob');
const PG = promisify(glob);
const clk = require('chalk')
const Ascii = require('ascii-table');
const { token, mongooseConnectionString } = require('./config.json');


client.commands = new Collection();

['Events', 'Commands'].forEach(handler => {
    require(`./Handlers/${handler}`)(client, PG, Ascii, clk);
});

module.exports = { client }

client.login(token)