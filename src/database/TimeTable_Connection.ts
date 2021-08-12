import { connection } from 'mongoose';

const connectTimeTableDB = async() => {
    try {
        const resourceConnection = await connection.useDb("timetabledbs")
        console.log(`MongoDB connected: TimeTableDB collection connected!`)
    } catch (error) {
        console.log(error);        
        process.exit(1);
    }
}

export { connectTimeTableDB };