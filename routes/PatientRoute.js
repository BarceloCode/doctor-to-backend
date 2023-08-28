const router = require('express').Router();
const PatientControl = require ("../controllers/PatientControl");


router.post('/create', PatientControl.create);
router.put('/update', PatientControl.update);
router.get('/retrieve', PatientControl.retrieve);
router.get('/retrieveOne', PatientControl.retrieveOne);
router.delete('/delete', PatientControl.delete);

module.exports = router;