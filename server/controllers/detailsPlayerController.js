var Controller = {};

// GET: http://localhost:3000/detailsplayer
Controller.getDetailsPlayerPage = (req, res) =>
{
  var userID = req.session.userID;

  if (userID)
  {
    res.render('detailsplayer');
  }
  else
  {
    res.redirect('/');
  }
};

module.exports = Controller;