const jwt = require('jsonwebtoken');
const jwtPassword = process.env.jwtPassword;

function userMiddleware(req, res, next) {
  try {
    const token = req.headers['authorization'];
    // res.send(token);
    console.log(token);
    const decoded = jwt.verify(token, jwtPassword);
    if (decoded) {
      req.user = decoded;
      next();
    } else {
      res.status(411).json({ message: 'Invalid token' });
    }
  } catch (err) {
    res.status(500).json({
      err,
      message: 'Internal server error in authentication middleware',
    });
  }
}

module.exports = userMiddleware;
