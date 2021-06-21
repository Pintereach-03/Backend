const db = require('../../data/database');

const getAll = () => {
    return db('users');
};

const getById = (id) => {
    return db('users')
        .where({ id })
        .first();
};

module.exports = {
    getAll,
    getById
};
