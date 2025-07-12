const mongoose = require('mongoose');
const User = require('C:/hackathon/skill-bridge/backend/src/models/User.js');
require('dotenv').config();

const makeAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const email = '1@a.com'; // 🔁 Change to the user’s email

    const user = await User.findOneAndUpdate(
      { email },
      { isAdmin: true },
      { new: true }
    );

    if (user) {
      console.log(`✅ ${user.email} is now an admin.`);
    } else {
      console.log('❌ User not found.');
    }

    mongoose.disconnect();
  } catch (err) {
    console.error(err);
    mongoose.disconnect();
  }
};

makeAdmin();
