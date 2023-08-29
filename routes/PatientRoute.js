const router = require('express').Router();
const PatientControl = require ("../controllers/PatientControl");
const validateToken = require("../middlewares/validate-token");
const permissionMiddleware = require("../middlewares/permissionsMiddleware");

router.use(validateToken);
router.use(permissionMiddleware);


router.post('/create', PatientControl.create);
router.put('/update', PatientControl.update);
router.get('/retrieve', PatientControl.retrieve);
router.get('/retrieveOne', PatientControl.retrieveOne);
router.delete('/delete', PatientControl.delete);

module.exports = router;