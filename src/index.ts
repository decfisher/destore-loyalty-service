import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import { LoyaltyDao } from './dao/LoyaltyDao';
import { LoyaltyRecordModel } from './models/loyalty';
import { LoyaltyController } from './controllers/LoyaltyController';

// Get environment variables
const port = process.env.PORT || 3003;
const MONGO_DB_URI: string = process.env.DB_URI!;

// Connect to inventory database
mongoose.connect(MONGO_DB_URI)
  .then(() => console.log('✅ Connected to additional charges database'))
  .catch(error => {
    console.log('❌ Failed to connect to additional charges database');
    console.error(error);
  });

// Initialise data accessors
const loyaltyDao = new LoyaltyDao(LoyaltyRecordModel);

// Initialise controllers
const loyaltyController = new LoyaltyController(loyaltyDao);

// Initialise application server
const app = express();

// Allow JSON
app.use(express.json());

app.get('/all', loyaltyController.getAllSchemes);

app.patch('/activate', loyaltyController.activateScheme);

app.patch('/deactivate', loyaltyController.deactivateScheme);

// Start the server
app.listen(port, () => {
    console.log(`🛜 Loyalty service running on port ${port}...`);
});