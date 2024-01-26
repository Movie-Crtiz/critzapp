const express = require('express');
const router = express.Router();
const memberController = require('../Controllers/memberController');

// Routes
router.post('/members', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const member = await memberController.createMember(firstName, lastName, email, password);
    res.json(member);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/members/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const member = await memberController.getMemberByEmail(email);
    res.json(member);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/members', async (req, res) => {
  try {
    const allMembers = await memberController.getAllMembers();
    res.json(allMembers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
