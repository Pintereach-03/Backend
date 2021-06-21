const bcrypt = require('bcryptjs');
const ROUND = Number(process.env.ROUND) || 8;
const hash = bcrypt.hashSync('1234', ROUND);

const users = [
    { username: 'Test', password: hash }
];

exports.users = users;

exports.seed = (knex) => {
    return knex('users').insert(users);
};
