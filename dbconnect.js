require('dotenv').config();
const mongoose = require('mongoose');

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: 'issuetracker' });
  } catch (error) {
    console.error(error);
    throw new Error('Unable to connect to database');
  }
}

module.exports = main;
