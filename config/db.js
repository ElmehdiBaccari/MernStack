const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');


const connectDB = async () => {
 try {
    console.log('MongoDB connecting....');
    await mongoose.connect(db);
    console.log('MongoDB Connected....')
 } catch (error) {
     console.log('Error :' + error.message);
     process.exit(1);
     
 }

};

module.exports = connectDB;