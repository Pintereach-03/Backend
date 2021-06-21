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
    if (!body.category) {
        body.category = null;
    }
    if (!body.title) {
        next({ status: 400, message: 'title is missing' });
    }
    else if (!body.link) {
        next({ status: 400, message: 'link is missing' });
    }
    else if (!body.user_id) {
        next({ status: 400, message: 'user_id is missing' });
    }
    else {
        req.body = body;
        next();
    }
};

module.exports = {
    checkArticleId,
    checkArticlePayload
};
