const express = require('express');
const router = express.Router();
const items = require('../controllers/itemController');
const { ensureAuth } = require('../middleware/authMiddleware');

router.get('/', ensureAuth, items.list);
router.get('/:id', ensureAuth, items.get);
router.post('/', ensureAuth, items.create);
router.put('/:id', ensureAuth, items.update);
router.delete('/:id', ensureAuth, items.remove);

module.exports = router;
