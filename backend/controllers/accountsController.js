const Account = require('../db/models/accounts');
const User = require('../db/models/users');

const createAccount = async (req, res) => {
    try {
        const { account_name, account_type, balance } = req.body;
        const user_id = req.user.id;
        const account = await Account.create({
            user_id,
            account_name,
            account_type,
            balance
        });
        res.status(201).json(account);
    } catch (error) {
        console.error('Failed to create account', error);
        res.status(500).json({ error: 'Failed to create account' });
    }
};

const getAccounts = async (req, res) => {
    try {
        const user_id = req.user.id;
        const accounts = await Account.findAll({
            where: { user_id },
            include: [{ model: User, attributes: ['id', 'username'] }]
        });
        res.json(accounts);
    } catch (error) {
        console.error('Failed to fetch accounts', error);
        res.status(500).json({ error: 'Failed to fetch accounts' });
    }
};

const updateAccount = async (req, res) => {
    try {
        const { account_name, account_type, balance } = req.body;
        const account_id = req.params.id;
        const account = await Account.findByPk(account_id);
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }
        await account.update({
            account_name,
            account_type,
            balance
        });
        res.json(account);
    } catch (error) {
        console.error('Failed to update account', error);
        res.status(500).json({ error: 'Failed to update account' });
    }
};

const deleteAccount = async (req, res) => {
    try {
        const account_id = req.params.id;
        const account = await Account.findByPk(account_id);
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }
        await account.destroy();
        res.json({ message: 'Account deleted successfully' });
    } catch (error) {
        console.error('Failed to delete account', error);
        res.status(500).json({ error: 'Failed to delete account' });
    }
};

module.exports = {
    createAccount,
    getAccounts,
    updateAccount,
    deleteAccount
};