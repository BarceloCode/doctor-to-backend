const router = require('express').Router();
const PatientControl = require ("../controllers/PatientControl");


router.post('/create', PatientControl.create);
router.post('/update', PatientControl.update);
router.get('/retrieve', PatientControl.retrieve);
router.get('/retrieveOne/:id', PatientControl.retrieveOne);
router.delete('delete', PatientControl.delete);

module.exports = router;