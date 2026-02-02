const mongoose = require("mongoose");
const { type } = require("os");
const { boolean } = require("webidl-conversions");

const ToDo =new  mongoose.Schema(
   {
    title:{
        type: String,
        required:true,
        trim : true
    },
    description:{
        type:String,
        trim :true
    },
    completed:{
        type:Boolean,
        default:true
    },
    priority:{
        type:String,
        enum:["Low","Medium","High"],
        default: "medium"
    },
    dueDate:{
        type:Date,

    },
},
    {
    timestamp: true
    }
   
);

module.exports = mongoose.model("todo",ToDo);