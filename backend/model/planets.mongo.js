const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlanetsSchema = new Schema({
    keplerName: {
        type:String,
        required:true,
    }
});

module.exports = mongoose.model('Planet',PlanetsSchema);