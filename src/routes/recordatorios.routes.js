const { Router } = require('express')
const router = Router()

const ctrl = require("../controller/recordatorios.controller")

router.route("/")
  .get(ctrl.getRecordatorios)
  .post(ctrl.newRecordatorio)

router.route("/:id")
  .get(ctrl.getRecordatorio)
  .put(ctrl.updateRecordatorio)
  .delete(ctrl.deleteRecordatorio)

module.exports = router