const JWT_SECRET = process.env.JWT_SECRET || 'shh';
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.includes('Bearer ') ? req.headers.authorization.replace('Bearer ', '') : req.headers.authorization;
    if (!token) {
        next({ status: 401, message: 'token required' });
    }
    else {
        jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
        if (err) {
            next({ status: 401, message: 'token invalid' });
        }
        else {
            req.decodedToken = decodedToken;
            next();
        }
        });
  }
};
