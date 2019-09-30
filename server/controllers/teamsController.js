var JSONService = require('../services/JSONService');

var Controller = {};

// GET: http://localhost:3000/teams/data
Controller.getTeamsData = (req, res) =>
{
    let data = JSONService.readTeamsFile(req, res);

    data = JSON.parse(data);

    res.end(JSON.stringify(data));
};

// DELETE: http://localhost:3000/teams/data/:id
Controller.deleteTeamData = (req, res) =>
{
    let id = req.params.id;

    let data = JSONService.readTeamsFile(res);

    data = JSON.parse(data);

    // Find Index Number of the Team in the array
    let foundAt = data.findIndex(t => t.TeamId == id);

    // Delete Team if found
    if (foundAt != -1)
    {
        match = data.splice(foundAt, 1);
    }

    JSONService.writeTeamsFile(data);

    // Note:  even if we didn't find them, send a 200 because they are gone
    res.status(200).send();
};

// GET: http://localhost:3000/teams/data/:id
Controller.getTeamData = (req, res) =>
{
    let id = req.params.id;

    let data = JSONService.readTeamsFile(req, res);

    data = JSON.parse(data);

    let match = data.find(t => t.TeamId == id);

    if (match == null)
    {
        res.status(404).send("Not Found");
        return;
    }

    res.end(JSON.stringify(match));
};

module.exports = Controller;