//  file we will use to connect to mongo db

const mongoose = require("mongoose");


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)

        /* Logging the connection to the database. */
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
    } catch(error){
            console.log(error);
            process.exit(1);
    }
}

module.exports = connectDB;

// var MongoClient = require('mongodb').MongoClient;
// var uri = "mongodb://<username>:<password>@arabovcluster-shard-00-00.kd3sk.mongodb.net:27017,arabovcluster-shard-00-01.kd3sk.mongodb.net:27017,arabovcluster-shard-00-02.kd3sk.mongodb.net:27017/?ssl=true&replicaSet=atlas-5a2hfc-shard-0&authSource=admin&retryWrites=true&w=majority";
// MongoClient.connect(uri, function(err, client) {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });