import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    rollNo: {
        type: String,
        required: true
    },

    city: {
        type: String
    }


}, {
    timestamps: true
})

const Student = mongoose.model("Student", userSchema)

export default Student;
