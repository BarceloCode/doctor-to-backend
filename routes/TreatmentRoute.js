const router = require('express').Router();
const TreatmentController = require('../controllers/TreatmentController');

router.post('/create', TreatmentController.create);
router.get('/retrieve', TreatmentController.retrieve);

module.exports = router;