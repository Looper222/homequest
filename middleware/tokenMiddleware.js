const jwt = require('jsonwebtoken');
const yenv = require('yenv');
const env = yenv();


const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token === null) return res.sendStatus(401);

    jwt.verify(token, env.TOKEN_SECRET, (err, usr) => {
        if (err) return res.sendStatus(403);

        req.usr = usr;
        next();
    });
}

const encodeToken = () => {

}

module.exports = {
    authenticate
}