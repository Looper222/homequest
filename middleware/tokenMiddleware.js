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

const decodeID = (req) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const decodedToken = jwt.decode(token);
    const userID = decodedToken.id;
    return userID;
}

const decodeToken = (refreshToken) => {
    const decodedToken = jwt.decode(refreshToken);
    const userID = decodedToken.id;
    return userID;
}

module.exports = {
    authenticate,
    decodeID,
    decodeToken
}