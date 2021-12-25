const { Events } = require('../Validation/EventNames');
const clk = require('chalk')
const { promisify } = require('util');
const { glob } = require('glob');
const PG = promisify(glob);
const Ascii = require('ascii-table');
const path = require('path');


module.exports = async (client) => {

    const Table = new Ascii('Events Loaded');

    (await PG(`${process.cwd()}/Events/**/*.js`)).map(async (file) => {
        const event = require(file);

        if(!Events.includes(event.name) || !event.name) {
            const L = file.split('/')
            await Table.addRow(`${event.name || "Missing"}`, `Event name is either invalid or missing: ${L[6] + `/` + L[7]}`);
            return;
        }
        
        if(event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        };

        await Table.addRow(event.name, 'Event Loaded');


    });

  console.log(clk.rgb(255,31,142).bold(Table.toString()))
 //   console.log(clk.rgb(255, 31, 142).bold(process.cwd()))


}