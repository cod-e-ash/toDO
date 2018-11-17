const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log(req.headers);
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, "iLoVe@neW#ash@kEy");
        next();
    } catch(error) {
        res.status(401).json({message: 'failed'});
    }
    
}