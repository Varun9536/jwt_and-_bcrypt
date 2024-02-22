import mongoose from "mongoose";

async function jwtdatabase_connection()
{
    try
    {
        const connectionDetail = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.JWTDATABASE_NAME}`)
        console.log("sucessfully connected at" , connectionDetail.connection.host)
    }

    catch(error)
    {
        console.log("not connected" , error)
        process.exit(1)
    }
}

export default jwtdatabase_connection