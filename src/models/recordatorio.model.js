const { Schema, model } = require("mongoose")

recordatorioSchema = new Schema({
  user_id: String,
  titulo: String,
  fecha: String,
  hora: String,
},{
  timestamps: true
})

module.exports = model("recodatorios", recordatorioSchema)