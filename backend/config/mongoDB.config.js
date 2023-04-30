const mongoose = require('mongoose');
require('dotenv').config();

// if connection opened or error occured
mongoose.connection.once('open',() => {
	console.log('Connection opened');
});

mongoose.connection.on('error',(err) => {
	console.log(`Error is: ${err}`)
});

const MONGO_DB_URL = process.env.MONGO_URL;

async function mongoConnection(){
    await mongoose.connect(MONGO_DB_URL);
};

async function mongoDisconnection(){
     await mongoose.disconnect();
}

module.exports = {
    mongoConnection,
    mongoDisconnection,
}