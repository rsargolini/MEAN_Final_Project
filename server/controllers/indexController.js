var Controller = {};

// GET: http://localhost:3000
Controller.getIndexPage = (req, res) =>
{
    res.render('index');
};

module.exports = Controller;