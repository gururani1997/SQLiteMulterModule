const {DataTypes}= require("sequelize");
module.exports=(sequelize,Sequelize)=>{
    const User=sequelize.define('user',{
        firstName:{
            type:DataTypes.STRING
        },
        lastName:{
            type:DataTypes.STRING
        },
        dateOfBirth:{
            type:DataTypes.STRING
        },
        phoneNo:{
            type:DataTypes.STRING
        },
        department:{
            type:DataTypes.STRING
        },
        autherId:{
            type:DataTypes.STRING
        },
        email:{
            type:DataTypes.STRING,
            required:true
        }

    });
    return User;
}