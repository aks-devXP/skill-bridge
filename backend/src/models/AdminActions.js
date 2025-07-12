const mongoose = require("mongoose");
const { Schema } = mongoose;

const AdminActionsSchema = new Schema({
  actionType: {
    type: String,
    enum: [
      "ban_user",
      "unban_user",
      "delete_skill",
      "warn_user",
      "reject_swap",
      "approve_skill",
      "broadcast_message",
      "download_report"
    ],
    required: true
  },

  // Who performed the action (admin)
  performedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",  // Or "Admin" if you have a separate Admin model
    required: true
  },

  // Target user or object
  targetModel: {
    type: String,
    enum: ["User", "Skill", "SwapRequest", "Feedback"],
    required: true
  },
  targetId: {
    type: Schema.Types.ObjectId,
    required: true
  },

  // Optional explanation or context
  note: {
    type: String,
    default: ""
  },

  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("AdminActions", AdminActionsSchema);
