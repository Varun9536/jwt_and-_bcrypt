import mongoose from "mongoose";

async function database_connection()
{
    try
    {
        const connectionDetail = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DATABASE_NAME}`)
        console.log("sucessfully connected at" , connectionDetail.connection.host)
    }

    catch(error)
    {
        console.log("not connected" , error)
        process.exit(1)
    }
}

export default database_connection