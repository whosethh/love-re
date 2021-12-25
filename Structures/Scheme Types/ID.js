const Mongoose = require("mongodb");

class ID extends Mongoose.SchemaType
{
  constructor(key, options)
  {super(key, options, "ID");}

  cast(val)
  {
    id = id.toString();
    if(id.length != 18)
      return undefined;
    for(let i = 0; i < id.length; i++)
      if(isNaN(parseInt(id[i])))
        return undefined;
    return id;
  }
}

Mongoose.Schema.Types.ID = ID;
