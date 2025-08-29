// controllers/visitController.js
import Visit from '../models/visit.js'; // Import your Visit model

// Controller function to schedule a new visit
export const scheduleVisit = async (req, res) => {
  try {
    const { name, email, phone, selectedDate, selectedTime } = req.body;
    console.log("1. Received scheduleVisit request for:", { selectedDate, selectedTime, name });
    // Basic validation
    if (!name || !email || !phone || !selectedDate || !selectedTime) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // ✅ Check if an appointment with the same date and time already exists
    const existingVisit = await Visit.findOne({
      selectedDate,
      selectedTime,
      status: { $ne: 'cancelled' } // Consider 'pending' and 'confirmed' as unique
    });

    if (existingVisit) {
      return res.status(409).json({ message: 'This time slot is already booked. Please choose another.' });
    }

    const newVisit = new Visit({
      name,
      email,
      phone,
      selectedDate,
      selectedTime,
    });

    await newVisit.save();

    res.status(201).json({
      message: 'Visit scheduled successfully!',
      visit: newVisit,
    });

  } catch (error) {
    console.error('Error scheduling visit:', error);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
};

// Controller function to fetch available time slots
// This is a placeholder; you'd implement actual logic to check available slots
export const getAvailability = async (req, res) => {
  try {
    const { date } = req.query; // Date might be passed as a query parameter

    // In a real application, you'd query your database
    // to determine available slots for the given date, taking into account
    // already booked slots.
    const dummyAvailableSlots = [
      '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'
    ];

    res.status(200).json({
      date,
      availableSlots: dummyAvailableSlots,
    });
  } catch (error) {
    console.error('Error fetching availability:', error);
    res.status(500).json({ message: 'Server error, could not fetch availability.' });
  }
};
