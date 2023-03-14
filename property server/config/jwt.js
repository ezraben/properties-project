const jwt = require("jsonwebtoken");
const { token } = require("morgan");

const generateToken = (data) => {
  return new Promise((resolve, reject) => {
    jwt.sign(data, process.env.JWT_KEY, (err, token) => {
      if (err) reject(err);
      else resolve(token);
    });
  });
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_KEY, (err, dataFromToken) => {
      if (err) reject(err);
      else resolve(dataFromToken);
    });
  });
};

module.exports = {
  generateToken,
  verifyToken,
};
