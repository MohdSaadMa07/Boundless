// models/Visit.js
import mongoose from 'mongoose';

const visitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'], // Email format validation
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    match: [/^\+?\d{10,15}$/, 'Please use a valid phone number.'], // Basic phone number validation
  },
  selectedDate: {
    type: String, // Storing as string "YYYY-MM-DD"
    required: true,
  },
  selectedTime: {
    type: String, // Storing as string "HH:MM AM/PM"
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'], // Possible statuses for a visit
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Visit = mongoose.model('Visit', visitSchema);

export default Visit;
