const express = require('express');
const router = express.Router();
const accountsController = require('./../controllers/accountsController');

router.get('/', accountsController.getAccounts);
router.post('/', accountsController.createAccount);
router.put('/:id', accountsController.updateAccount);
router.delete('/:id', accountsController.deleteAccount);

module.exports = router;