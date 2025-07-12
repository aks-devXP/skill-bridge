const mongoose = require("mongoose");
const { Schema } = mongoose;

const SwapRequestSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  // Skills involved in the swap
  skillOffered: {
    type: Schema.Types.ObjectId,
    ref: "Skill",
    required: true
  },
  skillRequested: {
    type: Schema.Types.ObjectId,
    ref: "Skill",
    required: true
  },

  // Optional message from sender
  message: {
    type: String,
    default: ""
  },

  // Status Tracking
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "cancelled", "completed"],
    default: "pending"
  },

  // Lifecycle tracking
  deletedBySender: {
    type: Boolean,
    default: false
  },
  deletedByReceiver: {
    type: Boolean,
    default: false
  },
  acceptedAt: Date,
  completedAt: Date,

  // Feedback references
  feedbackFromSender: {
    type: Schema.Types.ObjectId,
    ref: "Feedback",
    default: null
  },
  feedbackFromReceiver: {
    type: Schema.Types.ObjectId,
    ref: "Feedback",
    default: null
  }

}, { timestamps: true });

module.exports = mongoose.model("SwapRequest", SwapRequestSchema);