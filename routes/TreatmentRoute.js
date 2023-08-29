const router = require('express').Router();
const TreatmentController = require('../controllers/TreatmentController');
const validateToken = require("../middlewares/validate-token");
const permissionMiddleware = require("../middlewares/permissionsMiddleware");

router.use(validateToken);
router.use(permissionMiddleware);

router.post('/create', TreatmentController.create);
router.get('/retrieve', TreatmentController.retrieve);
router.get('/retrieveOne', TreatmentController.retrieveOne);
router.put('/update', TreatmentController.update);
router.delete('/delete', TreatmentController.delete);

module.exports = router;