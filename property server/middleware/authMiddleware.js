const jwt = require("../config/jwt");
const usersModel = require("../models/users.model");
const CustomResponse = require("../classes/CustomResponse");

module.exports = async (req, res, next) => {
  try {
    let dataFromToken = await jwt.verifyToken(req.headers["x-auth-token"]);

    let userData = await usersModel.selectUserByMail(dataFromToken.email);

    if (userData.length <= 0) {
      throw new CustomResponse(CustomResponse.STATUSES.failed, "invalid token");
    }
    req.userData = userData[0];
    next();
  } catch (err) {
    console.log("error from mw", err);
    res.status(401).json(err);
  }
};
