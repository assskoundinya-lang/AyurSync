const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  createPatient,
  listPatients,
  getPatient,
  updatePatient,
  deletePatient
} = require('../controllers/patientController');

// Protect patient routes
router.use(authMiddleware);

router.post('/', createPatient);
router.get('/', listPatients);
router.get('/:id', getPatient);
router.put('/:id', updatePatient);
router.delete('/:id', deletePatient);

module.exports = router;
