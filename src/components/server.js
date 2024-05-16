const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yourDatabaseName', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define your MongoDB schema and model
const kycFormSchema = new mongoose.Schema({
  fullName: String,
  dateOfBirth: String,
  address: String,
  nationality: String,
  occupation: String,
  contactNumber: String,
  email: String,
  idProofType: String,
  idProofNumber: String,
  proofOfAddress: String,
  proofOfIdentity: String,
});

const KYCForm = mongoose.model('KYCForm', kycFormSchema);

// API endpoint for handling form submissions
app.post('/submitForm', async (req, res) => {
  try {
    const formData = req.body;

    // Save the form data to MongoDB
    const newForm = new KYCForm(formData);
    await newForm.save();

    res.status(201).json({ message: 'Form submitted and saved to MongoDB' });
  } catch (error) {
    console.error('Error submitting form to MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
