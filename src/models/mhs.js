"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class mhs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  mhs.init(
    {
      nim: DataTypes.INTEGER,
      name: DataTypes.STRING,
      alamat: DataTypes.STRING,
      no_hp: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "mhs",
    }
  );
  return mhs;
};
