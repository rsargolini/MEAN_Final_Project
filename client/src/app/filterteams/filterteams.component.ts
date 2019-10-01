// Imports
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
  allTeams: Array<any> = [];
  leagues: Array<any> = [];

  filteredTeams: Array<any> = [];

  teamid: number = 0;
  league: string = '';
  teamname: string = '';
  gender: string = 'All';
  division: string = 'All';

  // Error Messages
  errMsg: string = '';
  errorFound: boolean = false;

  constructor(
    private teamService: TeamService,
    private leagueService: LeagueService,
    private userService: UserService,
    private router: Router,
    private modalService: NgbModal) { }

  ngOnInit() {

    // Redirect to Login Page if not Authenticated (UserService)
    if (!this.userService.getAuth()) {
      this.router.navigate(['login']);
    }

    // Get All Leagues (LeagueService)
    this.leagueService.getLeagues().subscribe(data => {
      this.leagues = data;
    });

    // Get All Teams (TeamService)
    this.teamService.getTeams().subscribe(data => {
      this.allTeams = data;
      this.filteredTeams = data;
    });
  }

  // Selected Division Drop-down Change - Filter All Teams Array
  onSelectedDiv(val: string): void {
    if (val == "All" && this.gender == "All") {
      this.filteredTeams = this.allTeams;
    }
    else {
      if (this.gender == "All") {
        this.filteredTeams = this.allTeams.filter(
          allTeams => allTeams.League === val);
      }
      else {
        if (val == "All") {
          this.filteredTeams = this.allTeams.filter(
            allTeams => allTeams.TeamGender === this.gender);
        }
        else {
          this.filteredTeams = this.allTeams.filter(
            allTeams => allTeams.League === val && allTeams.TeamGender === this.gender);
        }
      }
    }
  }

  // Selected Gender Drop-down Change - Filter All Teams Array
  onSelectedGender(val: string): void {
    if (val == "All" && this.division == "All") {
      this.filteredTeams = this.allTeams;
    }
    else {
      if (this.division == "All") {
        this.filteredTeams = this.allTeams.filter(
          allTeams => allTeams.TeamGender === val);
      }
      else {
        if (val == "All") {
          this.filteredTeams = this.allTeams.filter(
            allTeams => allTeams.League === this.division);
        }
        else {
          this.filteredTeams = this.allTeams.filter(
            allTeams => allTeams.TeamGender === val && allTeams.League === this.division);
        }
      }
    }
  }

  // Teams Details Button Click - Navigate to Details Team Page with Team ID (TeamService)
  onDetails(teamId): void {
    this.teamService.selectedTeamId = teamId;
    this.router.navigate(['detailsteam']);
  };

  // Teams Delete Button Click - Display Delete Confirmation Modal (ModalService)
  onDelete(deletemodal, teamid, league, teamname): void {
    this.teamid = teamid;
    this.league = league;
    this.teamname = teamname;
    this.modalService.open(deletemodal, { ariaLabelledBy: 'modal-basic-title' })
  };

  // Confirmation Delete Click - Delete Team by Team ID (TeamService)
  onOkDelete(): void {
    // call deleteTeam() method in Teams Service
    this.teamService.deleteTeam(this.teamid).subscribe(data => {
      this.ngOnInit();
    })
  };

  // Log Out Button Click - Redirect to Login Page
  onLogOut(): void {
    this.userService.setAuth(false);
    this.userService.setAdmin(false);
    this.router.navigate(['login']);
  }
};