module.exports = {
    HOST: "localhost",
    USER: "pankaj",
    PASSWORD: "Neuro@123",
    DB: "tecmintdb",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };