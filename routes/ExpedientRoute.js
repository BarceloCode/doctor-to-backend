const router = require('express').Router();
const ExpedientController = require('../controllers/ExpedientController');

router.post('/create', ExpedientController.create);
router.get('/retrieve', ExpedientController.retrieve);
router.post('/retrieveOne', ExpedientController.retrieveOne);
router.delete('/delete/:id', ExpedientController.delete);
router.put('/update/:id', ExpedientController.update);


module.exports = router;
