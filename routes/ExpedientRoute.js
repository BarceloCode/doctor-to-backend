const router = require('express').Router();
const ExpedientController = require('../controllers/ExpedientController');

router.post('/create', ExpedientController.create);
router.get('/retrieve', ExpedientController.retrieve);
router.delete('/delete/:id', ExpedientController.delete)


module.exports = router;
