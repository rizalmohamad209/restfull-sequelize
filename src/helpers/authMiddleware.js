const jwt = require("jsonwebtoken");

module.exports = {
  checkLogin: (req, res, next) => {
    const bearer = req.header("x-access-token");
    if (!bearer) {
      res.status(401).send({
        msg: "Please Login First",
        status: 401,
        Error: "You must e logged In",
      });
    } else {
      const token = bearer.split(" ")[1];
      try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        req.decodeToken = decodedToken;
        next();
      } catch (error) {
        res.status(401).send({
          msg: "Can't Access",
          status: 401,
          error: "Invalid Token",
        });
      }
    }
  },
};
