const Categories = require('./categories-model');

const checkCategoryId = (req, res, next) => {
    const { id } = req.params;
    Categories.getById(id)
        .then(data => {
            if (!data) {
                next({ status: 404, message: `category with id ${id} is not found` });
            }
            else {
                req.data = data;
                next();
            }
        })
        .catch(next);
};

const checkCategoryPayload = (req, res, next) => {
    const { body, decodedToken } = req;
    body.user_id = decodedToken.id;
    if (!body.name) {
        next({ status: 400, message: 'name is missing' });
    }
    else {
        req.body = body;
        next();
    }
};

const checkCategoryUnique = (req, res, next) => {
    const { name } = req.body;
    Categories.getByFilter({ name })
        .then(data => {
            if (data) {
                next({ status: 404, message: `category named ${name} is already created` });
            }
            else {
                req.data = data;
                next();
            }
        })
        .catch(next);
};

module.exports = {
    checkCategoryId,
    checkCategoryPayload,
    checkCategoryUnique
};
