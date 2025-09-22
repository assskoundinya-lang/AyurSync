const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { generateDiet, getDietPlans } = require('../controllers/dietController');

// Ensure auth applied
router.post('/:id/generate-diet', authMiddleware, generateDiet);
router.get('/:id/diet-plans', authMiddleware, getDietPlans);

module.exports = router;
