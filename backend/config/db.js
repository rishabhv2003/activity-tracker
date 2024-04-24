const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Database is connected: ${connection.connection.host}`)
    } catch (error) {
        console.log(`Error while database connection ${error}`);
    }
}

module.exports = connectDB;