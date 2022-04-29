module.exports = app => {
    const userController = require('../controllers/user.controller');
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/", userController.create);
    app.use('/api/users', router)

}