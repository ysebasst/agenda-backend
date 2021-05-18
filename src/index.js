require("dotenv").config()
const mongoose = require('./database/connection')

const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')

/**
 * CONFIG 
 */
app.set("port", process.env.PORT || 4000)
app.set("view engine", "ejs")
app.set("views", path.join(__dirname,"views"))
app.use(cors())
app.use(express.urlencoded({ extended: false}))
app.use(express.json())
app.use(morgan("dev"))

/**
 * ROUTES
 */
app.use("/api/v1/recordatorios", require("./routes/recordatorios.routes"))
app.get("*", (req, res) =>{
  res.render("404")
})

/**
 * RUN SERVER
 */
app.listen(app.get('port'), ()=>{
  console.log("Server listening in:", `http://localhost:${app.get('port')}`);
})