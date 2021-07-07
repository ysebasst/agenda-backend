const Receipt = require("../models/receipt.model");

const controller = {};

// GET ALL RECEIPTS
controller.getReceipts = async (req, res) => {
  try {
    const receipts = await Receipt.find({ user_id: req.user.id });
    res.json({ error: null, message: "all receipts", data: receipts });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error, message: "error" });
  }
};

// CREATE NEW RECEIPT
controller.newReceipt = async (req, res) => {
  try {
    const body = {
      user_id: req.user.id,
      title: req.body.title,
      price: req.body.price,
      timelyPayment: req.body.timelyPayment,
      paymentMade: req.body.paymentMade,
    };
    const receipt = new Receipt(body);
    await receipt.save();
    res.json({ error: null, message: "receipt created", data: receipt });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error, message: "error" });
  }
};

// GET RECEIPT BY ID
controller.getReceipt = async (req, res) => {
  try {
    const receipt = await Receipt.findOne({
      _id: req.params.id,
      user_id: req.user.id,
    });
    if (!receipt) {
      return res.status(400).json({
        error: "receipt not found",
      });
    }
    res.json({ error: null, message: "receipt by id", data: receipt });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error, message: "error" });
  }
};

// UPDATE RECEIPT BY ID
controller.updateReceipt = async (req, res) => {
  try {
    const body = {
      user_id: req.user.id,
      title: req.body.title,
      price: req.body.price,
      timelyPayment: req.body.timelyPayment,
      paymentMade: req.body.paymentMade,
    };
    const receipt = await Receipt.findOneAndUpdate(
      {
        _id: req.params.id,
        user_id: req.user.id,
      },
      body,
      { new: true }
    );
    if (!receipt) {
      return res.status(400).json({
        error: "receipt not found",
      });
    }
    res.json({ error: null, message: "receipt updated", data: receipt });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error, message: "error" });
  }
};

// DELETE RECEIPT BY ID
controller.deleteReceipt = async (req, res) => {
  try {
    const receipt = await Receipt.findOneAndDelete({
      _id: req.params.id,
      user_id: req.user.id,
    });
    if (!receipt) {
      return res.status(400).json({
        error: "receipt not found",
      });
    }
    res.json({ error: null, message: "receipt removed", data: receipt });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error, message: "error" });
  }
};

module.exports = controller;
