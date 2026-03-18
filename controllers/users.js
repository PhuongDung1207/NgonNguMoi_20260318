let userModel = require('../schemas/users')
let bcrypt = require('bcrypt')
module.exports = {
    CreateAnUser: async function (username, password, email, role,
        fullName, avatarUrl, status, loginCount) {
        let newItem = new userModel({
            username: username,
            password: password,
            email: email,
            fullName: fullName,
            avatarUrl: avatarUrl,
            status: status,
            role: role,
            loginCount: loginCount
        });
        await newItem.save();
        return newItem;
    },
    GetAnUserByUsername: async function (username) {
        return await userModel.findOne({
            isDeleted: false,
            username: username
        })
    }, GetAnUserById: async function (id) {
        return await userModel.findOne({
            isDeleted: false,
            _id: id
        })
    },
    ChangePassword: async function (userId, oldPassword, newPassword) {
        let user = await userModel.findOne({
            _id: userId,
            isDeleted: false
        })
        if (!user) {
            let error = new Error("nguoi dung khong ton tai")
            error.status = 404
            throw error
        }

        if (!bcrypt.compareSync(oldPassword, user.password)) {
            let error = new Error("oldpassword khong dung")
            error.status = 400
            throw error
        }

        if (bcrypt.compareSync(newPassword, user.password)) {
            let error = new Error("newpassword khong duoc trung oldpassword")
            error.status = 400
            throw error
        }

        user.password = newPassword
        await user.save()
        return user
    }
}
