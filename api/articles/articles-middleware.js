const Articles = require('./articles-model');

const checkArticleId = (req, res, next) => {
    const { id } = req.params;
    Articles.getById(id)
        .then(data => {
            if (!data) {
                next({ status: 404, message: `article with id ${id} is not found` });
            }
            else {
                req.data = data;
                next();
            }
        })
        .catch(next);
};

const checkArticlePayload = (req, res, next) => {
    const { body, decodedToken } = req;
    body.user_id = decodedToken.id;
    if (!body.link) {
        body.link = null;
    }
    if (!body.category) {
        body.category = null;
    }
    if (!body.title) {
        next({ status: 400, message: 'title is missing' });
    }
    else if (!body.description) {
        next({ status: 400, message: 'description is missing' });
    }
    else {
        req.body = body;
        next();
    }
};

const checkCategoryExists = (req, res, next) => {
    const { body } = req;
    Articles.getByCategory({ name: body.category })
        .then(data => {
            if (!data) {
                body.category = null;
                next();
            }
            else {
                body.category = data.name;
                next();
            }
        })
        .catch(next);
};

module.exports = {
    checkArticleId,
    checkArticlePayload,
    checkCategoryExists
};
