const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoDBURI');

const connectDB = async () =>{
    try {
        await mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex : true, useFindAndModify : false });
        console.log("Database connected");
    } catch (error) {
        console.error(error);
        // Exit the app
        process.exit(1);
    }
}

module.exports = connectDB;