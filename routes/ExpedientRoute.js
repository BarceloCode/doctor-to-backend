const router = require('express').Router();
const ExpedientController = require('../controllers/ExpedientController');

router.post('/create', ExpedientController.create);
router.get('/retrieve', ExpedientController.retrieve);
router.get('/retrieveOne', ExpedientController.retrieveOne);
router.delete('/delete', ExpedientController.delete);
router.put('/update', ExpedientController.update);


module.exports = router;
