const controller = {}

const Recordatorio = require("../models/recordatorio.model")

controller.getRecordatorios = async (req, res) =>{
  try {
    const { user_id } = req.body
    const recordatorios = await Recordatorio.find({ user_id })
    res.json(recordatorios)
  } catch (error) {
    console.log(error)
    res.status(400).json({error})
  }
}
controller.newRecordatorio = async (req, res) =>{
  try {
    const { user_id, titulo, fecha, hora } = req.body;
    const body = { user_id, titulo, fecha, hora }
    const recordatorio = new Recordatorio(body)
    await recordatorio.save()
    res.json(recordatorio)
  } catch (error) {
    console.log(error)
    res.status(400).json({error})
  }
}

controller.getRecordatorio = async (req, res) =>{
  try {
    const { user_id } = req.body
    const recordatorio = await Recordatorio.findOne({ _id: req.params.id, user_id })
    res.json(recordatorio)
  } catch (error) {
    console.log(error)
    res.status(400).json({error})
  }
}
controller.updateRecordatorio = async (req, res) =>{
  try {
    const { user_id, titulo, fecha, hora } = req.body;
    const body = { user_id, titulo, fecha, hora }
    const recordatorio = await Recordatorio.findByIdAndUpdate(req.params.id,body)
    res.json({ ...recordatorio["_doc"], ...body })
  } catch (error) {
    console.log(error)
    res.status(400).json({error})
  }
}
controller.deleteRecordatorio = async (req, res) =>{
  try {
    const recordatorio = await Recordatorio.findByIdAndDelete(req.params.id)
    res.json(recordatorio)
  } catch (error) {
    console.log(error)
    res.status(400).json({error})
  }
}

module.exports = controller;