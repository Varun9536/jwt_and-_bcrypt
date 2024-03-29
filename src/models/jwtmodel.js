import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

}, {
    timestamps: true
})

const jwtuser = mongoose.model("jwtuser", userSchema)

export default jwtuser;
