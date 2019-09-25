var JSONService = require('../services/JSONService');
const dataPath = './data/';
const fs = require('fs');


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

// POST: http://localhost:3000/teams/data
Controller.addTeamData = (req, res) =>
{
    // Assemble Team information so we can validate it
    let team = {
        TeamId: getNextId(req, res, "team"),  // assign id to team
        TeamName: req.body.teamname,
        League: req.body.leaguecode,
        ManagerName: req.body.managername,
        ManagerPhone: req.body.managerphone,
        ManagerEmail: req.body.manageremail,
        MaxTeamMembers: Number(req.body.maxteammembers),
        MinMemberAge: Number(req.body.minmemberage),
        MaxMemberAge: Number(req.body.maxmemberage),
        TeamGender: req.body.teamgender,
        Members: []
    };

    if (!isValidTeam(team))
    {
        res.status(400).send("Bad Request - Incorrect or Missing Data");
    }

    let data = JSONService.readTeamsFile(res);

    data = JSON.parse(data);

    // Add the Team
    data[data.length] = team;

    JSONService.writeTeamsFile(data);

    res.end(JSON.stringify(team));
};

// POST: http://localhost:3000/teams/data
Controller.addPlayerData = (req, res) =>
{
    let teamId = req.params.id;

    // Assemble Player Information so we can validate it
    let member = {
        MemberId: getNextId(req, res, "member"),   // assign new id
        Email: req.body.email,
        MemberName: req.body.membername,
        ContactName: req.body.contactname,
        Age: Number(req.body.age),
        Gender: req.body.gender,
        Phone: req.body.phone,
        Position: req.body.position,
        Shoots: req.body.shoots
    };

    if (!isValidMember(member))
    {
        res.status(400).send("Bad Request - Incorrect or Missing Data");
        return;
    }

    let data = JSONService.readTeamsFile(res);

    data = JSON.parse(data);

    let match = data.find(t => t.TeamId == teamId);
    if (match == null)
    {
        res.status(404).send("Team Not Found");
        return;
    }

    // Make sure assignment doesn't violate Team rules
    if (member.Age < match.MinMemberAge || member.Age > match.MaxMemberAge)
    {
        res.status(409).send("Member's age is outside of bounds of team age rules");
        return;
    }

    if (match.TeamGender != "Any" && member.Gender != match.TeamGender)
    {
        res.status(409).send("Member's gender does not conform to team gender rules");
        return;
    }

    // Add Player
    match.Members[match.Members.length] = member;

    JSONService.writeTeamsFile(data);

    res.status(200).send();
};

// Get Next Team ID
function getNextId(req, res, counterType)
{
    // Read the Counter File
    let data = JSONService.readCountersFile(res);

    data = JSON.parse(data);

    // Find the next Id from the Counters File and then increment the
    // counter in the file to indicate that Id was used
    let id = -1;

    switch (counterType.toLowerCase())
    {
        case "team":
            id = data.nextTeam;
            data.nextTeam++;
            break;
        case "member":
            id = data.nextTeam;
            data.nextTeam++;
            break;
    }

    // Save the Updated Counter
    JSONService.writeCountersFile(data);

    return id;
}

// New Team Validation
function isValidTeam(team)
{
    if (team.TeamName == undefined || team.TeamName.trim() == "")
        return false;
    if (team.League == undefined || team.League.trim() == "")
        return false;
    if (team.ManagerName == undefined || team.ManagerName.trim() == "")
        return false;
    if (team.ManagerPhone == undefined || team.ManagerPhone.trim() == "")
        return false;
    if (team.ManagerEmail == undefined || team.ManagerEmail.trim() == "")
        return false;
    if (team.MaxTeamMembers == undefined || isNaN(team.MaxTeamMembers))
        return false;
    if (team.MinMemberAge == undefined || isNaN(team.MinMemberAge))
        return false;
    if (team.MaxMemberAge == undefined || isNaN(team.MaxMemberAge))
        return false;
    if (team.TeamGender == undefined || team.TeamGender.trim() == "")
        return false;
    if (team.TeamGender != "Any" && team.TeamGender != "Male" && team.TeamGender != "Female")
        return false;

    return true;
}

// New Player Validation
function isValidMember(member)
{
    if (member.Email == undefined || member.Email.trim() == "")
        return false;
    if (member.MemberName == undefined || member.MemberName.trim() == "")
        return false;
    if (member.ContactName == undefined || member.ContactName.trim() == "")
        return false;
    if (member.Phone == undefined || member.Phone.trim() == "")
        return false;
    if (member.Age == undefined || isNaN(member.Age))
        return false;
    if (member.Gender == undefined || member.Gender.trim() == "")
        return false;
    if (member.Gender != "Any" && member.Gender != "Male" && member.Gender != "Female");
    if (member.Position == undefined || member.Position.trim() == "")
        return false;
    if (member.Shoots == undefined || member.Shoots.trim() == "")
        return false;

    return true;
}

module.exports = Controller;