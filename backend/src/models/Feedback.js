const mongoose = require("mongoose");
const { Schema } = mongoose;

const FeedbackSchema = new Schema({
  fromUser: { type: Schema.Types.ObjectId, ref: "User", required: true },
  toUser: { type: Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Feedback", FeedbackSchema);
