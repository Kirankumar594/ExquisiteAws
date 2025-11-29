const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const dbName = process.env.MONGO_DB_NAME || 'Cluster0';
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected (db: ${conn.connection.name})`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;