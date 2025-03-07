const mongoose = require('mongoose');
require('dotenv').config();

const { MONGO_URL } = process.env;

class Database {
    constructor() {
        if (!Database.instance) {
            this.connect();
            Database.instance = this;
        }
        return Database.instance;
    }

    async connect() {
        try {
            if (!MONGO_URL) {
                throw new Error('MONGO_URL is not defined in the environment variables');
            }
            await mongoose.connect(MONGO_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            });
            console.log(`Database connected successfully: ${MONGO_URL}`);
        } catch (error) {
            console.log(`Error connecting to database: ${error.message}`);
            process.exit(1);
        }
    }
}

const instance = new Database();
module.exports = instance;