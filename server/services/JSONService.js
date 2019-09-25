const fs = require('fs');
const dataPath = './data/';

var Service = {};

// Read Leagues JSON File
Service.readLeaguesFile = (res) =>
{
    res.end(fs.readFileSync(dataPath + 'leagues.json'));
};

// Read Teams JSON File
Service.readTeamsFile = (res) =>
{   
    return fs.readFileSync(dataPath + 'teams.json');
};

// Write Teams JSON File
Service.writeTeamsFile = (data) =>
{   
    fs.writeFileSync(dataPath + 'teams.json', JSON.stringify(data));
};

// Read Counters JSON File
Service.readCountersFile = (req, res) =>
{   
    return fs.readFileSync(dataPath + 'counters.json');
};

// Write Counters JSON File
Service.writeCountersFile = (data) =>
{   
    fs.writeFileSync(dataPath + 'counters.json', JSON.stringify(data));
};

module.exports = Service;