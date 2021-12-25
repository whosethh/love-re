const Mongoose = require("mongodb");

const Guild = Mongoose.model("Guild", new Mongoose.Schema({
  id: {
    type: ID,
    required: [true,"Cannot create an instance of 'Guild' model without an id property."],
    unique: true
  },
  latestMessage: {
    user:{
      name: String,
      pfp: String
    },
    channel: String,
    content: String,
    timestamp: Integer
  }
}));
