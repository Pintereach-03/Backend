const Users = require('./users-model');

const checkExists = (req, res, next) => {
    const { id } = req.params;
    Users.getById(id)
        .then(data => {
            if (!data) {
                next({ status: 404, message: 'the user does not exist' });
            }
            else {
                next();
            }
        })
        .catch(next);
};

module.exports = {
    checkExists
};
