const router = require('express').Router();
const PatientControl = require ("../controllers/PatientControl");



router.post('/create', PatientControl.create);
router.put('/update/:id', PatientControl.update);
router.get('/retrieve', PatientControl.retrieve);
router.get('/retrieveOne', PatientControl.retrieveOne);
router.delete('/delete/:id', PatientControl.delete);
router.delete('/softDelete/:id', PatientControl.softDeleted);

module.exports = router;