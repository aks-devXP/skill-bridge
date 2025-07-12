const mongoose = require("mongoose");
const { Schema } = mongoose;

const AdminActionsSchema = new Schema({
  actionType: { type: String, required: true },
  targetId: { type: Schema.Types.ObjectId, required: true },
  note: { type: String },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("AdminActions", AdminActionsSchema);
