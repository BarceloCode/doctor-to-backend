const router = require('express').Router();
const ExpedientController = require('../controllers/ExpedientController');
const validateToken = require("../middlewares/validate-token");
const permissionMiddleware = require("../middlewares/permissionsMiddleware");

router.use(validateToken);
router.use(permissionMiddleware);

router.post('/create', ExpedientController.create);
router.get('/retrieve', ExpedientController.retrieve);
router.get('/retrieveOne', ExpedientController.retrieveOne);
router.delete('/delete', ExpedientController.delete);
router.put('/update', ExpedientController.update);


module.exports = router;
