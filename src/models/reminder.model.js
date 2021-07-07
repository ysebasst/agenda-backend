const { Schema, model } = require("mongoose");

reminderSchema = new Schema(
  {
    user_id: String,
    title: String,
    date: String,
    time: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("reminder", reminderSchema);
