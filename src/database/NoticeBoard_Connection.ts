import mongoose from "mongoose";

export const connectNoticeBoardDB = async () => {
    try {
        const connection = await mongoose.connect(
            <string>process.env.MONGO_URI_NOTICE_BOARD)

            console.log(`MongoDB connected: ${connection.connection.host}`)
    } catch (error) {
        console.log(error);        
        process.exit(1);
    }
}

