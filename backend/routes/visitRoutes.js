// routes/visitRoutes.js
import express from 'express';
// ✅ Import the controller functions
import { scheduleVisit, getAvailability } from '../controllers/visitController.js';

const router = express.Router();

// POST /api/visits/schedule - Route now uses the imported scheduleVisit controller
router.post('/schedule', scheduleVisit);

// GET /api/visits/availability - Route now uses the imported getAvailability controller
router.get('/availability', getAvailability);

export default router;
