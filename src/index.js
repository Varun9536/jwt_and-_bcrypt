import express from "express"
import dotenv from "dotenv"
import database_connection from "./database/db.js"
import Student from "./models/model.js"
import cookieParser from "cookie-parser"

dotenv.config()

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


database_connection()
    .then((response) => {
        console.log("connection successful with database")
    })

// to get form
app.get("/", (req, res) => {
    res.render("index.ejs")
})

// save data to database
app.post("/", async (req, res) => {
    await Student.create({ name: req.body.name, rollNo: req.body.rollNo, city: req.body.city })
    res.send("successfully complete")
})

// get data from data base
app.get("/getdata", async (req, res) => {
    const detail = await Student.find({})
    res.send(detail)
})




// login handler
const authentication = (req, res, next) => {
    const { name } = req.cookies
    if (name) {
        res.render("logout.ejs")
    }
    else {
        next()
    }

}

// login page
app.get("/login", authentication, (req, res) => {

    res.render("login.ejs")
})

app.post("/login", (req, res) => {
    res.cookie("name", "varun", { httpOnly: true, expires: new Date(Date.now() + 6 * 12000) })
    res.redirect("/login")
})

app.get("/logout", (req, res) => {
    res.cookie("name", null, { expires: new Date(Date.now()) })
    res.redirect("/login")
})


app.listen(process.env.PORT, () => {
    console.log("server listening at", process.env.PORT)
})
