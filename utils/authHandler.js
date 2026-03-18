let userController = require('../controllers/users')
let { verifyToken } = require('./jwtHandler')
module.exports = {
    CheckLogin: async function (req, res, next) {
        try {
            let token = req.headers.authorization;
            if (!token) {
                res.status(404).send({
                    message: "ban chua dang nhap"
                })
                return;
            }
            if (token.startsWith("Bearer ")) {
                token = token.slice(7).trim();
            }
            let result = verifyToken(token)
            let user = await userController.GetAnUserById(result.id);
            if (!user) {
                res.status(404).send({
                    message: "ban chua dang nhap"
                })
                return;
            }
            req.user = user;
            next()
        } catch (error) {
            res.status(404).send({
                message: "ban chua dang nhap"
            })
        }
    }
}
