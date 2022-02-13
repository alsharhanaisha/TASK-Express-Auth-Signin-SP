const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
  const PASSWORD = process.env.PASSWORD;
  const DATABASE_NAME = process.env.DATABASE_NAME;
  const CONNECTION_URL = `mongodb+srv://alsharhanaisha:${PASSWORD}@coded.qe21j.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`;
  const conn = await mongoose.connect(CONNECTION_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log(`mongo connected: ${conn.connection.host}`);
};
module.exports = connectDB;
