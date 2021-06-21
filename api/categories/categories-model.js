const db = require('../../data/database');

const getAll = () => {
    return db('categories');
};

const getById = (id) => {
    return db('categories')
        .where({ id })
        .first();
};

const getByFilter = (filter) => {
    return db('categories')
      .where(filter)
      .first();
};

const create = (data) => {
    return db('categories')
        .insert(data)
        .then(ids => {
            return getById(ids[0]);
        });
};

const updateById = (id, data) => {
    return db('categories')
        .where({ id })
        .update(data)
        .then(() => {
            const updated = getById(id);
            return updated;
        });
};

const deleteById = async (id) => {
    const deleted = await getById(id);
    return db('categories')
        .where({ id })
        .del()
        .then(() => {
            return deleted;
        });
};

module.exports = {
    getAll,
    getById,
    getByFilter,
    create,
    updateById,
    deleteById
};
