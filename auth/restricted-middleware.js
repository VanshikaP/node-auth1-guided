const jwt = require('jsonwebtoken');
const secrets = require('./secrets.js');
module.exports = (req, res, next) => {
    // verify that the token is valid
    const token = req.headers.authorization;
    const secret = secrets.jwtSecret;
    if(token) {
        jwt.verify(token, secret, (error, decodedToken) => {
            // if everything is good, error will be undefined
            if(err) {
                res.status(401).json({ message: 'You cannot pass!' });
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        });
    } else {
        res.status(400).json({ message: 'Please provide credentials' });
    }
}