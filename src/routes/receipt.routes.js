const router = require("express").Router();

const ctrl = require("../controller/receipt.controller");

router.route("/").get(ctrl.getReceipts).post(ctrl.newReceipt);

router
  .route("/:id")
  .get(ctrl.getReceipt)
  .put(ctrl.updateReceipt)
  .delete(ctrl.deleteReceipt);

module.exports = router;
