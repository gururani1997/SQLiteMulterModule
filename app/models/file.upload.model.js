const { DataTypes } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const Upload = sequelize.define("upload", {
      fileType: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      files: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      }
    });
    return Upload;
  };