var userService = require('../services/userService');

var Controller = {};

// GET (Login Page): http://localhost:3000/users/login
Controller.getLoginPage = (req, res) =>
{
    res.render('login');
};

// GET (Register Page): http://localhost:3000/users/register
Controller.getRegisterPage = (req, res) =>
{
    res.render('register');
};

// GET: Logout
Controller.getLogout = (req, res) =>
{
    req.session.userID = null;
    req.session.isAdmin = null;
    res.redirect('/');
};

// GET (Get User Data): http://localhost:3000/users/:id
Controller.getUserData = (req, res) =>
{
    userService.getUserData(req.params.id)
        .then((user) =>
        {
            if (user)
            {   
                res.json(user);
            } else
            {
                res.end('No Users found for User ID.');
            }
        })
        .catch((err) =>
        {
            console.log(`Listing User for User ID error: ${err}`);
            res.end('Listing User for User ID error.');
        });
};

// GET (Get All Non-Admin User Data): http://localhost:3000/users
Controller.getAllUserData = (req, res) =>
{
    userService.getAllUserData()
        .then((users) =>
        {
            if (users)
            {       
                res.json(users);
            } else
            {
                res.end('No Registered Users found.');
            }
        })
        .catch((err) =>
        {
            console.log(`Listing Registered Users error: ${err}`);
            res.end('Listing Registered Users error.');
        });
};

// POST (User Login): http://localhost:3000/users/login
Controller.postUserLogin = (req, res) =>
{
    userService.postUserLogin({
        USERNAME: req.body.username,
        PASSWORD: req.body.password
    })
        .then((user) =>
        {
            if (user)
            {
                req.session.userID = user.ID;
                req.session.isAdmin = user.IS_ADMIN;
                res.statusCode = 200;
                res.json(user);
            } else
            {
                res.statusCode = 403;
                res.end('User Not Found.');
            }
        })

        .catch((err) =>
        {
            req.session.userID = null;
            req.session.isAdmin = null;
            res.statusCode = 403;
            console.log(`Login User Profile error: ${err}`);
            res.end('Login User Profile error.');
        })
};

// POST (Register User Profile): http://localhost:3000/users/register
Controller.createUserProfile = (req, res) =>
{
    userService.createUserProfile({
        USERNAME: req.body.username,
        PASSWORD: req.body.password,
        EMAIL: req.body.email
    })
        .then((user) =>
        {
            if (user)
            {
                res.statusCode = 200;
                res.json(user);
            } else
            {
                res.end('User Profile not created.');
            }
        })
        .catch((err) =>
        {
            res.statusCode = 403;
            console.log(`Creating User Profile error: ${err}`);
            res.end('Creating User Profile error.');
        });
};

// PUT (Update User Profile): http://localhost:3000/users
Controller.updateUserProfile = (req, res) =>
{
    userService.updateUserProfile({
        ID: req.params.id,
        EMAIL: req.body.email
    })
        .then((user) =>
        {
            if (user)
            {
                res.statusCode = 200;
                res.json(user);
            } else
            {
                res.end('User Profile not updated.');
            }
        })
        .catch((err) =>
        {
            res.statusCode = 403;
            console.log(`Updating User Profile error: ${err}`);
            res.end('Updating User Profile error.');
        });
};

// DELETE (Delete User Profile): http://localhost:3000/users/
Controller.deleteUserProfile = (req, res) =>
{
    userService.deleteUserProfile(req.params.id)
        .then((user) =>
        {
            if (user)
            {
                res.json(user);
            } else
            {
                res.end('User Profile not deleted.');
            }
        })
        .catch((err) =>
        {
            console.log(`Deleting User Profile error: ${err}`);
            res.end('Deleting User Profile error.');
        });
};

module.exports = Controller;