const Users = require("../db/connection").Users;

var Service = {};

// Authenticate User Login
Service.postUserLogin = (userObj) =>
{
    return Users.findOne({ returning: true, where: userObj })
        .then(user =>
        {
            return user;
        })
        .catch(error =>
        {
            throw error;
        })
};

// Get User Profile Data
Service.getUserData = (userID) =>
{
    return Users.findOne({ where: { ID: userID } })
        .then(user =>
        {
            return user;
        })
        .catch(error =>
        {
            throw error;
        })
};

// Get All Non-Admin User Profile Data
Service.getAllUserData = () =>
{
    return Users.findAll({ where: { IS_ADMIN: 0 } })
        .then(users =>
        {
            return users;
        })
        .catch(error =>
        {
            throw error;
        })
};

// Create New User Profile
Service.createUserProfile = (userObj) =>
{
    return Users.create(userObj)
        .then(user =>
        {
            return user;
        })
        .catch(error =>
        {
            throw error;
        })
};

// Update User Profile
Service.updateUserProfile = (userObj) =>
{
    return Users.update({ EMAIL: userObj.EMAIL }, { where: { ID: userObj.ID } })
        .then(user =>
        {
            return user;
        })
        .catch(error =>
        {
            throw error;
        })
};

// Delete User Profile
Service.deleteUserProfile = (userId) =>
{
    return Users.destroy({ returning: true, where: { ID: userId } })
        .then(user =>
        {
            return user;
        })
        .catch(error =>
        {
            throw error;
        })
};

module.exports = Service;