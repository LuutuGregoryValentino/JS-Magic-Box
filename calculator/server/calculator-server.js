// calculator-server.js

const express = require('express');
const { Low, JSONFile } = require('lowdb');
const cors = require('cors');

const app = express();
const PORT = 3001; // Use a new port to avoid conflicts

// Use a file to persist data
const file = './db.json';
const adapter = new JSONFile(file);
const db = new Low(adapter);

// Middleware to parse JSON and allow CORS
app.use(express.json());
app.use(cors());

// Set default data if the file doesn't exist
const initializeDB = async () => {
  await db.read();
  db.data ||= { memory: 0 };
  await db.write();
};

// --- API Routes for Memory ---

// Endpoint to save the current number to memory
app.post('/memory', async (req, res) => {
  try {
    const { value } = req.body;
    db.data.memory = value;
    await db.write();
    res.status(200).send({ message: 'Value saved to memory.', memory: db.data.memory });
  } catch (error) {
    res.status(500).send({ message: 'Failed to save to memory.', error: error.message });
  }
});

// Endpoint to get the number from memory
app.get('/memory', async (req, res) => {
  try {
    await db.read();
    res.status(200).send({ memory: db.data.memory });
  } catch (error) {
    res.status(500).send({ message: 'Failed to retrieve memory.', error: error.message });
  }
});

// Endpoint to clear the memory
app.delete('/memory', async (req, res) => {
  try {
    db.data.memory = 0;
    await db.write();
    res.status(200).send({ message: 'Memory cleared.', memory: db.data.memory });
  } catch (error) {
    res.status(500).send({ message: 'Failed to clear memory.', error: error.message });
  }
});


// Start the server
const startServer = async () => {
  await initializeDB();
  app.listen(PORT, () => {
    console.log(`Calculator server running on http://localhost:${PORT}`);
  });
};

startServer();
