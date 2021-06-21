const db = require('../../data/database');

const getAll = () => {
    return db('articles');
};

const getById = (id) => {
    return db('articles')
        .where({ id })
        .first();
};

const create = (data) => {
    return db('articles')
        .insert(data)
        .then(ids => {
            return getById(ids[0]);
        });
};

const updateById = (id, data) => {
    return db('articles')
        .where({ id })
        .update(data)
        .then(() => {
        const updated = getById(id);
            return updated;
        });
};

const deleteById = async (id) => {
    const deleted = await getById(id);
    return db('articles')
        .where({ id })
        .del()
        .then(() => {
            return deleted;
        });
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};
