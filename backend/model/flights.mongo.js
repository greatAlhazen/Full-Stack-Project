const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FlightsSchema = new Schema({
    launchNumber:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:true,
    },
    mission:{
        type:String,
        required:true
    },
    rocket:{
        type:String,
        required:true,
    },
    destination:{
        type:String,
        required:true,
    },
    customers:{
        type:[String],
        default:['GreatAlhazen','NASA'],
    },
    upcoming:{
        type:Boolean,
        required:true,
        default:true
    },
    success:{
        type:Boolean,
        required:true,
        default:true
    }
});

module.exports = mongoose.model('Flight',FlightsSchema);