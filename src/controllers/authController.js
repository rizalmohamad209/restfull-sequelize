const { user, sequelize, Sequelize } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const op = Sequelize.Op;
module.exports = {
  signUp: (req, res) => {
    const { body } = req;
    const saltRounds = 10;

    body.password = bcrypt.hashSync(body.password, saltRounds);

    user
      .create(body)
      .then((data) => {
        res.send({
          msg: "Sign-up is Successful",
          status: 200,
          data,
        });
      })
      .catch((err) => {
        res.send({
          msg: "Error While Sign-up",
          status: 500,
          err,
        });
      });
  },
  signIn: async (req, res) => {
    const { body } = req;
    let findUser = await user.findOne({
      where: {
        [op.or]: [{ username: body.username }, { email: body.username }],
      },
    });

    if (!findUser) {
      res.status(404).send({
        msg: "Sign-in is error",
        status: 404,
        error: "User Not Found",
      });
    }

    const isValidPassword = bcrypt.compareSync(
      body.password,
      findUser.dataValues.password
    );

    if (!isValidPassword) {
      res.status(403).send({
        msg: "Sign-in is Error",
        status: 403,
        error: "Password is Invalid",
      });
    }
    const payload = {
      id: findUser.dataValues.id,
      username: findUser.dataValues.username,
      email: findUser.dataValues.email,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: 86400,
    });

    delete findUser.dataValues.password;

    res.status(200).send({
      msg: "Sign-in Successful",
      status: 200,
      data: { ...findUser.dataValues, token },
    });
  },
};
