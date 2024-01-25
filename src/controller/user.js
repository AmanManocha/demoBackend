const mongoose = require('mongoose');
const Role = require('../model/roles')

const createUser = async (req, res, next) => {

    let data;
    // save data in sql database as well
    try {

        // get the role id first
        const role = await Role.find()
        console.log(role,"jj")

        // if (!role.id) return next(new ErrorHandler(500));

        // const user = {
        //     uid: data.userSub,
        //     email: req.body.email,
        //     roleId: role.id
        // }

        // if (req.body.role == "child") {
        //     user.firstName = req.body.firstName
        //     user.lastName = req.body.lastName
        //     user.dob = req.body.dob
        //     user.gender = req.body.gender,
        //         user.parentId = req.body.parentId
        // }

        // await db.Users.create(user)

    }
    catch (err) {
        console.log(err);
        // delete user from cognito first
        return next(new ErrorHandler(500));
    }

    res.status(201).send({
        statusCode: 201,
        response: {
            uid: data.userSub,
            codeDeliveryDetails: data.codeDeliveryDetails,
        }
    })

}


module.exports = {
    createUser,
}
