const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }
        let user = await User.findOne({ where: { email: req.body.email } });
        if (user) {
            res.status(502).send({
                message: "This user is already exist!"
            });
            return;
        }
        req.body.autherId = req.body.email;
        let userData = await User.create(req.body);

        if (!userData) {
            res.status(500).send({
                message: "Internal Server Error!"
            });
            return;
        }
        return res.send(userData);
    } catch (error) {
        return res.status(500).send({ message: error })
    }
}