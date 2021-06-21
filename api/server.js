const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const restrict = require('./middleware/restricted');

const authRouter = require('./auth/auth-router');
const usersRouter = require('./users/users-router');
const articlesRouter = require('./articles/articles-router');
const categoriesRouter = require('./categories/categories-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/users', restrict, usersRouter);
server.use('/api/articles', restrict, articlesRouter);
server.use('/api/categories', restrict, categoriesRouter);

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack
    });
});

module.exports = server;
