var Controller = {};

// GET: http://localhost:3000/filterteams
Controller.getFilterTeamsPage = (req, res) =>
{
  var userID = req.session.userID;
  if (userID)
  {
    res.render('filterteams');
  }
  else
  {
    res.redirect('/');
  }
};

module.exports = Controller;