
const router = require('express').Router();

const { checkExists } = require('./users-middleware');

const Users = require('./users-model');

router.get('/', (req, res, next) => {
    Users.getAll()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(next);
});

router.get('/:id', checkExists, (req, res, next) => {
    const { id } = req.params;
    Users.getById(id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(next);
});

module.exports = router;