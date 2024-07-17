const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header is missing.' });
  }

  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).send('Token is missing');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Invalid token:', error);
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = { auth };
