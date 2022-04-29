const  { Sequelize } = require('sequelize');

const sequelize = new Sequelize('tecmintdb', 'pankaj', 'Neuro@123', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

sequelize.authenticate().then(() => console.log("<DB connected successfully!>")).catch(err => console.log('Error: unable to connect to the database!', err));