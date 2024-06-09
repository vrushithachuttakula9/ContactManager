const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');
const contactController = require('../controllers/contactController');


router.get('/', auth, contactController.getContacts);
router.post('/add', auth, contactController.addContact);
router.put('/:id', auth, contactController.updateContact);
router.delete('/:id', auth, contactController.deleteContact);

module.exports = router;
