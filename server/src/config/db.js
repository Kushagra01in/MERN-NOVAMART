const mongoose = require('mongoose');

let mongod = null;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/novamart';
  
  try {
    // Attempt standard connection with 3000ms timeout
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`[MongoDB] Connected to database: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (err) {
    console.log(`[MongoDB] Could not connect to local/configured MongoDB (${err.message}).`);
    console.log(`[MongoDB] Initializing embedded MongoDB server for instant out-of-the-box execution...`);
    
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      mongod = await MongoMemoryServer.create({
        instance: {
          dbName: 'novamart'
        }
      });
      const memoryUri = mongod.getUri();
      const conn = await mongoose.connect(memoryUri);
      console.log(`[MongoDB] Embedded In-Memory MongoDB active at ${memoryUri}`);
      return conn;
    } catch (memErr) {
      console.error(`[MongoDB] Critical: Failed to initialize embedded MongoDB:`, memErr);
      process.exit(1);
    }
  }
};

const disconnectDB = async () => {
  await mongoose.disconnect();
  if (mongod) {
    await mongod.stop();
  }
};

module.exports = { connectDB, disconnectDB };
