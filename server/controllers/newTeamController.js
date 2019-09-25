var Controller = {};

// GET: http://localhost:3000/newteam
Controller.getNewTeamPage = (req, res) =>
{
    var userID = req.session.userID;
    if (userID)
    {
        res.render('newteam');
    }
    else
    {
        res.redirect('/');
    }
};


module.exports = Controller;