import mongoose from "mongoose"
import config from "../01-utils/config"

const connect = async (): Promise<void> => {
    try {
        const db = await mongoose.connect(config.connectionString)
        console.log("We're connected to MongoDB " + db.connections[0].name)
    } catch (error) {

    }
}

export default {
    connect
}