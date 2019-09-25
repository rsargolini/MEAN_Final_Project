var Controller = {};

// GET: http://localhost:3000/newplayer
Controller.getNewPlayerPage = (req, res) =>
{
    var userID = req.session.userID;
    if (userID)
    {
        res.render('newplayer');
    }
    else
    {
        res.redirect('/');
    }
};

module.exports = Controller;