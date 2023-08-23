const router = require('express').Router();
const TreatmentController = require('../controllers/TreatmentController');

router.post('/create', TreatmentController.create);
router.get('/retrieve', TreatmentController.retrieve);
router.get('/retrieveOne', TreatmentController.retrieveOne);
router.put('/update', TreatmentController.update);
router.delete('/delete', TreatmentController.delete);

module.exports = router;