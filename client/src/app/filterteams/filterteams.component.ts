import { Component, OnInit } from '@angular/core';
import { TeamService } from './../providers/team.service';
import { LeagueService } from '../providers/league.service';

@Component({
  selector: 'app-filterteams',
  templateUrl: './filterteams.component.html',
  styleUrls: ['./filterteams.component.css']
})
export class FilterTeamsComponent implements OnInit {

  // Array to hold Teams Objects
  teams: Array<string> = [];
  leagues: Array<string> = [];

  constructor(
    private teamService: TeamService, 
    private leagueService: LeagueService,
  ) { }

  ngOnInit() {
    // call getLeagues() method in Leagues Service
    this.leagueService.getLeagues().subscribe(data => {
      this.leagues = data;
    });

    // call getTeams() method in Teams Service
    this.teamService.getTeams().subscribe(data => {
      this.teams = data;
    });
  }
}
