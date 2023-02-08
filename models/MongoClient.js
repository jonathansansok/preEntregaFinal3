const dotenv = require("dotenv");
dotenv.config()
const mongoose = require("mongoose")

export default class MongoClient {
    constructor() {
        mongoose.connect(process.env.MONGO_URI)
    }
}