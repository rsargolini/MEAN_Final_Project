var Controller = {};

// GET: http://localhost:3000/detailsteam
Controller.getDetailsTeamPage = (req, res) =>
{
  var userID = req.session.userID;

  if (userID)
  {
    res.render('detailsteam');
  }
  else
  {
    res.redirect('/');
  }
};

module.exports = Controller;