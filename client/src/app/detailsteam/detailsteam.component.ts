import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TeamService } from './../providers/team.service';
import { LeagueService } from '../providers/league.service';
import { UserService } from './../providers/user.service';

@Component({
  selector: 'app-detailsteam',
  templateUrl: './detailsteam.component.html',
  styleUrls: ['./detailsteam.component.css']
})
export class DetailsTeamComponent implements OnInit {

  // Array to hold Teams Objects
  teams: Array<string> = [];
  leagues: Array<string> = [];

  constructor(
    private teamService: TeamService, 
    private leagueService: LeagueService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    if (!this.userService.getAuth())
    {
      this.router.navigate(['login']);
    }
    
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
