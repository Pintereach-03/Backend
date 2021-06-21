const router = require('express').Router();

const { checkArticleId, checkArticlePayload } = require('./articles-middleware');

const Articles = require('./articles-model');

router.get('/', (req, res, next) => {
    return Articles.getAll()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(next);
});

router.get('/:id', checkArticleId, (req, res, next) => {
    const { id } = req.params;
    return Articles.getById(id)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(next);
});

router.post('/', checkArticlePayload, (req, res, next) => {
    const { body } = req;
    return Articles.create(body)
        .then(data => {
            res.status(201).json(data);
        })
        .catch(next);
});

router.put('/:id', checkArticleId, checkArticlePayload, (req, res, next) => {
    const { id } = req.params;
    const { body } = req;
    return Articles.updateById(id, body)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(next);
});

router.delete('/:id', checkArticleId, (req, res, next) => {
    const { id } = req.params;
    return Articles.deleteById(id)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(next);
});

module.exports = router;