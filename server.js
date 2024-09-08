const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static('public'));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/readingProgram', {
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Define a participant schema
const participantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
});

// Create a Participant model
const Participant = mongoose.model('Participant', participantSchema);

// Handle the registration request
app.post('/api/register', async (req, res) => {
  console.log("Received registration request"); // Debugging log

  try {
    const newParticipant = new Participant(req.body);
    console.log("New participant data:", newParticipant); // Debugging log

    // Check if participant already exists
    const participantExists = await Participant.findOne({ email: newParticipant.email });
    
    if (participantExists) {
      return res.status(400).json({ message: 'A participant with this email already exists' });
    }

    // Save the new participant to the database
    await newParticipant.save();
    console.log("Participant registered successfully"); // Debugging log

    res.json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Error handling registration:', error);
    res.status(500).json({ message: 'Error processing registration' });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
