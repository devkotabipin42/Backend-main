const mongoose = require('mongoose');

async function ConnectDb() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('connected to db');
}
module.exports = ConnectDb;