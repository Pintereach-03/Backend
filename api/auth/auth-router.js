const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('./auth-model');
const JWT_SECRET = process.env.JWT_SECRET || 'shh';
const ROUND = Number(process.env.ROUND) || 8;
const { checkPayload, checkTaken, checkInvalid } = require('./auth-middleware');

router.post('/register', checkPayload, checkTaken, (req, res, next) => {
    const { username, password } = req.body;
    const hash = bcrypt.hashSync(password, ROUND);

    auth.create({ username, password: hash })
        .then(user => {
            res.status(201).json(user);
        })
        .catch(next);
});

router.post('/login', checkPayload, checkInvalid, (req, res, next) => {
    if (bcrypt.compareSync(req.body.password, req.data.password)) {
        const token = buildToken(req.data);

        res.status(200).json({ message: `Hello, ${req.body.username}!`, token });
    }
    else {
        next({ status: 401, message: 'invalid credentials' });
    }
});

function buildToken(data) {
    const payload = {
        id: data.id,
        username: data.username
    };

    const option = {
        expiresIn: '1d'
    };

    return jwt.sign(payload, JWT_SECRET, option);
}

module.exports = router;
