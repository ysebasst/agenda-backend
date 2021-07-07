const Reminder = require("../models/reminder.model");

const controller = {};

// GET ALL REMINDERS
controller.getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({ user_id: req.user.id });
    res.json({ error: null, message: "all reminders", data: reminders });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error, message: "error" });
  }
};

// CREATE NEW REMINDER
controller.newReminder = async (req, res) => {
  try {
    const body = {
      user_id: req.user.id,
      title: req.body.title,
      date: req.body.date,
      time: req.body.time,
    };
    const reminder = new Reminder(body);
    await reminder.save();
    res.json({ error: null, message: "reminder created", data: reminder });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error, message: "error" });
  }
};

// GET REMINDER BY ID
controller.getReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findOne({
      _id: req.params.id,
      user_id: req.user.id,
    });
    if (!reminder) {
      return res.status(400).json({
        error: "reminder not found",
      });
    }
    res.json({ error: null, message: "reminder by id", data: reminder });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error, message: "error" });
  }
};

// UPDATE REMINDER BY ID
controller.updateReminder = async (req, res) => {
  try {
    const body = {
      user_id: req.user.id,
      title: req.body.title,
      date: req.body.date,
      time: req.body.time,
    };
    const reminder = await Reminder.findOneAndUpdate(
      {
        _id: req.params.id,
        user_id: req.user.id,
      },
      body,
      { new: true }
    );
    if (!reminder) {
      return res.status(400).json({
        error: "reminder not found",
      });
    }
    res.json({ error: null, message: "reminder updated", data: reminder });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error, message: "error" });
  }
};

// DELETE REMINDER BY ID
controller.deleteReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findOneAndDelete({
      _id: req.params.id,
      user_id: req.user.id,
    });
    if (!reminder) {
      return res.status(400).json({
        error: "reminder not found",
      });
    }
    res.json({ error: null, message: "reminder removed", data: reminder });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error, message: "error" });
  }
};

module.exports = controller;
