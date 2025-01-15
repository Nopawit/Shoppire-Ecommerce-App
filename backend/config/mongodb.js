import mongoose from "mongoose";

const connectDB = async()=>{
    mongoose.connection.on('connected',()=>{
        console.log("DB Connected")
    })

    await mongoose.connect('mongodb+srv://nopawit:nopawit0911@notesdb.2a5h0.mongodb.net/?retryWrites=true&w=majority&appName=notesDB')
}

export default connectDB;