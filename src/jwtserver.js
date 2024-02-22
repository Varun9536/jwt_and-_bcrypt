import express from "express"
import dotenv from "dotenv"
import jwtdatabase_connection from "./database/jwtmodel.js"
import jwtuser from "./models/jwtmodel.js";
import cookieParser from "cookie-parser";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config()

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


jwtdatabase_connection()
    .then((response) => {
        console.log("connection successful with database")
    })

// to get form




app.get("/", (req, res) => {
    res.render("home.ejs")
})


// register page
app.get("/register", (req, res) => {
    res.render("index.ejs")
})

app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    const data = await jwtuser.findOne({ email })
    

    if (data === null) {
        const hashPassword = await bcrypt.hash(password, 10)
        const newuser = await jwtuser.create({ name, email, password: hashPassword })
        res.render("gotologinpage.ejs", { message: "user successfully created" })
    }

    else {
        res.render("alreadyexist.ejs", { message: "user already exist" })
    }

})

// login handler
const authentication = async (req, res, next) => {
    const { name } = await req.cookies
    if (!name) {
        res.render("login.ejs")
    }
    else {
        const decoded = Jwt.verify(name, "vgtrhkjg563467");
        const { _id } = decoded;
        req.user = await jwtuser.findById(_id)
        next()
    }

}

app.get("/login", authentication, (req, res) => {

    console.log(req.user)
    res.render("logout.ejs", { name: req.user.name, message: "your accounted is here" })
})

app.post("/login", async (req, res) => {

    const { email, password } = req.body
    const detail = await jwtuser.findOne({ email })

    if (detail === null) {
        res.send("you entered wrong credentials")
    }

    else {
        const comparePassword = await bcrypt.compare(password, detail.password)

        if (comparePassword) {
            const token = Jwt.sign({ _id: detail._id }, "vgtrhkjg563467")
            res.cookie("name", token)
            res.render("logout.ejs", { name: detail.name, message: "your account here" })
        }

        else
        {
            res.send("enter correct password")
        }

    }

    // res.redirect("/login")

    // res.redirect("/login")
})

app.get("/logout", (req, res) => {
    res.cookie("name", null, { expires: new Date(Date.now()) })
    res.redirect("/login")
})


app.listen(process.env.JWTPORT, () => {
    console.log("server listening at", process.env.JWTPORT)
})
