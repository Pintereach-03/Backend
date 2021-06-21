const db = require('../../data/database');

const getAll = () => {
    return db('users');
};

const getById = (id) => {
    return db('users')
        .where({ id })
        .first();
};

const getByFilter = (filter) => {
    return db('users')
        .where(filter)
        .first();
};

const create = (user) => {
    return db('users')
        .insert(user)
        .then(ids => {
            return getById(ids[0]);
        });
};

module.exports = {
    getAll,
    getById,
    getByFilter,
    create
};
