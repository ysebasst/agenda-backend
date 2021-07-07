const { Router } = require("express");
const router = Router();

const ctrl = require("../controller/reminder.controller");

router.route("/").get(ctrl.getReminders).post(ctrl.newReminder);

router
  .route("/:id")
  .get(ctrl.getReminder)
  .put(ctrl.updateReminder)
  .delete(ctrl.deleteReminder);

module.exports = router;
