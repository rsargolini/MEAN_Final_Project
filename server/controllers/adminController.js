var Controller = {};

// GET: http://localhost:3000/admin
Controller.getAdminPage = (req, res) =>
{
   var userID = req.session.userID;
   if (userID)
   {
      res.render('admin');
   }
   else
   {
      res.redirect('/');
   }
};

module.exports = Controller;