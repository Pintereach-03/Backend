const router = require('express').Router();

const { checkCategoryId, checkCategoryPayload, checkCategoryUnique } = require('./categories-middleware');

const Categories = require('./categories-model');

router.get('/', (req, res, next) => {
    return Categories.getAll()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(next);
});

router.get('/:id', checkCategoryId, (req, res, next) => {
    const { id } = req.params;
    return Categories.getById(id)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(next);
});

router.post('/', checkCategoryPayload, checkCategoryUnique, (req, res, next) => {
    const { body } = req;
    return Categories.create(body)
        .then(data => {
            res.status(201).json(data);
        })
        .catch(next);
});

router.put('/:id', checkCategoryId, checkCategoryPayload, (req, res, next) => {
    const { id } = req.params;
    const { body } = req;
    return Categories.updateById(id, body)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(next);
});

router.delete('/:id', checkCategoryId, (req, res, next) => {
    const { id } = req.params;
    return Categories.deleteById(id)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(next);
});

module.exports = router;