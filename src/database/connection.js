const mongoose = require('mongoose')

const { DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.7j1kt.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`


mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
  .then(()=>console.log("Database connected"))
  .catch(err=>console.log(err))

module.exports = mongoose