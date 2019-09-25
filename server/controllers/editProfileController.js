var Controller = {};

// GET: http://localhost:3000/users/edituserprofile
Controller.getEditProfilePage = (req, res) =>
{
  var userID = req.session.userID;
  if (userID)
  {
    res.render('editprofile');
  }
  else
  {
    res.redirect('/');
  }
};

module.exports = Controller;