const { model, Schema } = require("mongoose");

module.exports = model(
    "Server",
    new Schema({
        id: String,
        prefix: String,
    })
);

// WHERES THE ERROR YOU WANT ME TO FIX?

//Events/Message/messagecreate.js