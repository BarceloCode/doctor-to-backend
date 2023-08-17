const router = require('express').Router();
const PathologicalController = require('../controllers/PathologicalController');

router.post('/create/:_id', PathologicalController.create);
router.get('/retrieve', PathologicalController.retrieve);

module.exports = router;
