import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TeamService } from './../providers/team.service';
import { LeagueService } from '../providers/league.service';
import { UserService } from './../providers/user.service';

@Component({
  selector: 'app-filterteams',
  templateUrl: './filterteams.component.html',
  styleUrls: ['./filterteams.component.css']
})
export class FilterTeamsComponent implements OnInit {

  // Array to hold Teams Objects
  teams: Array<string> = [];
  leagues: Array<string> = [];

  teamid: number = 0;
  league: string = '';
  teamname: string = '';

  errMsg: string = '';
  errorFound: boolean = false;

  // _selectedDivision = '';
  // filteredTeams: Array<string> = [];

  // get listFilter(): string {
  //   return this._selectedDivision;
  // }

  // set listFilter(value: string) {
  //   this._selectedDivision = value;
  //   this.filteredTeams = this.listFilter ? this.doFilter(this.listFilter) :this.teams;
  // }

  constructor(
    private teamService: TeamService,
    private leagueService: LeagueService,
    private userService: UserService,
    private router: Router,
    private modalService: NgbModal) { }

  // this.filteredTeams = this.teams;
  // this.listFilter = '';

  ngOnInit() {
    if (!this.userService.getAuth()) {
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

  //doFilter(filterBy: string): teams[] {
  // return this.teams.filter((team: teams) =>
  //   team.league.indexOf(filterBy) !== -1);
  // }

  onDetails(teamId): void {
    this.router.navigate(['detailsteam']);
    this.router.navigate(['detailsteam'], { queryParams: { teamid: teamId } });
  };

  onDelete(deletemodal, teamid, league, teamname): void {
    this.teamid = teamid;
    this.league = league;
    this.teamname = teamname;
    this.modalService.open(deletemodal, { ariaLabelledBy: 'modal-basic-title' })
  };

  onOkDelete(): void {
    // call deleteTeam() method in Teams Service
    this.teamService.deleteTeam(this.teamid).subscribe(data => {
        this.ngOnInit();
      }
    )
  };

  onLogOut(): void {
    this.userService.setAuth(false);
    this.userService.setAdmin(false);
    this.router.navigate(['login']);
  }
};