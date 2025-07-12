const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth');
const swapController = require('../controller/swap');

router.post('/create', auth, swapController.createSwapRequest);
router.get('/my-requests', auth, swapController.getMySwapRequests);
router.get('/admin/all', auth, adminAuth, swapController.getAllSwapRequests);
router.delete('/admin/:id', auth, adminAuth, swapController.deleteSwapRequest);

module.exports = router;
