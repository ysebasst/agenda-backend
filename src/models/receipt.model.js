const { Schema, model } = require("mongoose");

receiptSchema = new Schema(
  {
    user_id: String,
    title: String,
    price: String,
    timelyPayment: Date,
    paymentMade: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = model("receipt", receiptSchema);
