const { DataTypes } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define("tutorial", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      },
      editedBy:{
        type:DataTypes.INTEGER
      }
    });
    return Tutorial;
  };