import mongoose from "mongoose";

export default function connect() {

    try {
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection
        connection.on('connected',() =>{
            console.log("MongoDB database connected successfully!")
        })

        connection.on('error',(error) =>{
            console.log("MongoDB connecdtion error, please make sure that DB is up & running" + error)
            process.exit()
        })

    } catch (error) {
        console.log("Something went wrong in connecting to DB")
        console.log(error)
    }
}