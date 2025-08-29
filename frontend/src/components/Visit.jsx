import React, { useState } from 'react';
import axios from 'axios'; // ✅ Import Axios

const Visit = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState(''); // ✅ New state for phone error
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // For success or error messages

  // Dummy time slots for demonstration. In a real app, these would come from a backend.
  const availableTimeSlots = [
    '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  // ✅ New handler for phone number input
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);

    // Basic client-side validation for phone number
    // Matches backend regex: optional '+', then 10-15 digits
    const phoneRegex = /^\+?\d{10,15}$/;
    if (!phoneRegex.test(value) && value.length > 0) {
      setPhoneError('Phone number must be 10-15 digits long, optionally starting with "+".');
    } else {
      setPhoneError('');
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    // ✅ Include phoneError in the validation check
    if (!selectedDate || !selectedTime || !name || !email || !phone || phoneError) {
      setMessage({ type: 'error', text: 'Please fill in all required fields and correct any errors.' });
      setLoading(false);
      return;
    }

    // ✅ This is where the actual API call to your backend happens
    console.log('Attempting to send visit data to backend:', { selectedDate, selectedTime, name, email, phone });

    try {
      // ✅ CORRECTED: Changed port from 5001 to 5000 to match your server.js
      const response = await axios.post('http://localhost:5000/api/visits/schedule', {
        name,
        email,
        phone,
        selectedDate,
        selectedTime,
      });

      if (response.status === 201) {
        setMessage({ type: 'success', text: response.data.message }); // Use message from backend
        // Reset form fields after successful submission
        setSelectedDate('');
        setSelectedTime('');
        setName('');
        setEmail('');
        setPhone('');
        setPhoneError(''); // Clear phone error on success
      }

    } catch (error) {
      console.error('Error scheduling visit (frontend):', error);
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to schedule visit. Please try again later.'
      });
      // Optionally, set specific error for phone if backend returns it
      if (error.response?.data?.message?.includes('phone')) {
        setPhoneError(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Get today's date in YYYY-MM-DD format for min attribute
  const getMinDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.card}>
        <h1 style={styles.title}>Visit Our Bookstore</h1>
        <p style={styles.subtitle}>We'd love to welcome you!</p>

        {/* Visit Information Section */}
        <div style={styles.infoSection}>
          <h2 style={styles.sectionTitle}>Our Location</h2>
          <p style={styles.infoText}>
            123 Bookworm Lane, Storyville, Literatia - 54321
          </p>
          <p style={styles.infoText}>
            <a href="https://maps.google.com/?q=123+Bookworm+Lane,+Storyville,+Literatia" target="_blank" rel="noopener noreferrer" style={styles.mapLink}>
              View on Google Maps
            </a>
          </p>

          <h2 style={styles.sectionTitle}>Opening Hours</h2>
          <p style={styles.infoText}>Monday - Friday: 10:00 AM - 6:00 PM</p>
          <p style={styles.infoText}>Saturday: 11:00 AM - 5:00 PM</p>
          <p style={styles.infoText}>Sunday: Closed</p>

          <h2 style={styles.sectionTitle}>Contact Us</h2>
          <p style={styles.infoText}>Phone: (123) 456-7890</p>
          <p style={styles.infoText}>Email: info@bookstore.com</p>
        </div>

        {/* Schedule a Visit Section */}
        <div style={styles.scheduleSection}>
          <h2 style={styles.sectionTitle}>Schedule Your Visit</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            {message && (
              <div style={message.type === 'success' ? styles.successMessage : styles.errorMessage}>
                {message.text}
              </div>
            )}

            <div style={styles.formGroup}>
              <label htmlFor="visitDate" style={styles.label}>Preferred Date:</label>
              <input
                type="date"
                id="visitDate"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={getMinDate()} // Prevents selecting past dates
                required
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="visitTime" style={styles.label}>Preferred Time:</label>
              <select
                id="visitTime"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                required
                style={styles.select}
              >
                <option value="">Select a time</option>
                {availableTimeSlots.map((slot, index) => (
                  <option key={index} value={slot}>{slot}</option>
                ))}
              </select>
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="name" style={styles.label}>Your Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                required
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>Your Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                required
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="phone" style={styles.label}>Phone Number:</label>
              <input
                type="tel" // Use type="tel" for phone numbers
                id="phone"
                value={phone}
                onChange={handlePhoneChange} // ✅ Use new handler
                placeholder="(123) 456-7890"
                required
                // Apply a different border color if there's a phone error
                style={{ ...styles.input, borderColor: phoneError ? '#dc3545' : styles.input.borderColor }}
              />
              {phoneError && <p style={styles.inlineErrorMessage}>{phoneError}</p>} {/* ✅ Display error */}
            </div>

            <button type="submit" disabled={loading || phoneError} style={styles.submitButton}>
              {loading ? 'Scheduling...' : 'Schedule Visit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
    padding: '80px 20px 20px 20px', // Added top padding to account for fixed navbar
    boxSizing: 'border-box',
    fontFamily: 'Inter, sans-serif',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
    maxWidth: '700px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    border: '1px solid #e0e0e0',
  },
  title: {
    fontSize: '2.5rem',
    color: '#343a40',
    marginBottom: '10px',
    textAlign: 'center',
    fontWeight: '700',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: '20px',
  },
  infoSection: {
    paddingBottom: '25px',
    borderBottom: '1px solid #e9ecef',
  },
  scheduleSection: {
    paddingTop: '25px',
  },
  sectionTitle: {
    fontSize: '1.8rem',
    color: '#495057',
    marginBottom: '15px',
    fontWeight: '600',
    borderLeft: '4px solid #007bff',
    paddingLeft: '10px',
    marginLeft: '-14px', // Align with card content
  },
  infoText: {
    fontSize: '1.05rem',
    color: '#495057',
    lineHeight: '1.6',
    marginBottom: '8px',
  },
  mapLink: {
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: '500',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '1rem',
    fontWeight: '500',
    color: '#495057',
  },
  input: {
    padding: '12px',
    border: '1px solid #ced4da',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  },
  select: {
    padding: '12px',
    border: '1px solid #ced4da',
    borderRadius: '8px',
    fontSize: '1rem',
    backgroundColor: '#fff',
    cursor: 'pointer',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  },
  inputFocus: { // Placeholder for focus style (can be applied via CSS in real apps)
    borderColor: '#007bff',
    boxShadow: '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
  },
  submitButton: {
    padding: '14px 25px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease',
    marginTop: '15px',
    boxShadow: '0 4px 10px rgba(40, 167, 69, 0.2)',
  },
  submitButtonHover: {
    backgroundColor: '#218838',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 15px rgba(40, 167, 69, 0.3)',
  },
  submitButtonDisabled: {
    backgroundColor: '#cccccc',
    cursor: 'not-allowed',
    boxShadow: 'none',
    transform: 'translateY(0)',
  },
  successMessage: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '15px',
    border: '1px solid #c3e6cb',
    textAlign: 'center',
    fontSize: '0.95rem',
  },
  errorMessage: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '15px',
    border: '1px solid #f5c6cb',
    textAlign: 'center',
    fontSize: '0.95rem',
  },
  inlineErrorMessage: { // Style for inline field errors
    color: '#dc3545',
    fontSize: '0.85rem',
    marginTop: '4px',
    marginBottom: '0',
  },
};

export default Visit;
