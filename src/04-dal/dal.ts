import mongoose from "mongoose";
import config from "../01-utils/config";

async function connect(): Promise<void> {
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || config.connectionString); // step 2
        console.log("We're connected to MongoDB " + db.connections[0].name + process.env.NODE_ENV);
    }
    catch(err: any) {
        console.log(err);
    }
}

export default {
    connect
};
