import {connection} from 'mongoose';

const connectResourceDB = async() => {
    try {
        const resourceConnection = await connection.useDb("ResourceDB")
        console.log(`MongoDB connected: ResourceDB collection connected!`)
    } catch (error) {
        console.log(error);        
        process.exit(1);
    }
}

export {connectResourceDB};