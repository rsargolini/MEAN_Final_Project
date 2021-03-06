// Imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamService } from './../providers/team.service';
import { UserService } from './../providers/user.service';

@Component({
  selector: 'app-detailsteam',
  templateUrl: './detailsteam.component.html',
  styleUrls: ['./detailsteam.component.css']
})

export class DetailsTeamComponent implements OnInit {

  // Variables for Team Information fields
  teamid: number = 0;
  teamname: string = '';
  leaguecode: string = '';
  teamgender: string = '';
  maxteammembers: number = 0;
  minmemberage: number = 0;
  maxmemberage: number = 0;

  // Variables for Manager Information fields
  managername: string = '';
  managerphone: string = '';
  manageremail: string = '';

  players: Array<string> = [];

  teamFull: boolean = false;

  constructor(
    private teamService: TeamService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {

    // Redirect to Login Page if not Authenticated (UserService)
    if (!this.userService.getAuth()) {
      this.router.navigate(['login']);
    }

    this.teamid = this.teamService.selectedTeamId;

    // Get Team Details by Team ID (TeamService)
    this.teamService.getTeam(this.teamid).subscribe(data => {
      this.teamid = data.TeamId;
      this.teamname = data.TeamName;
      this.leaguecode = data.League;
      this.teamgender = data.TeamGender;
      this.maxteammembers = data.MaxTeamMembers;
      this.minmemberage = data.MinMemberAge;
      this.maxmemberage = data.MaxMemberAge;
      this.managername = data.ManagerName;
      this.managerphone = data.ManagerPhone;
      this.manageremail = data.ManagerEmail;
      this.players = data.Members;

      if (data.Members.length >= data.MaxTeamMembers)
      {
        this.teamFull = true;
      }
    })
  }

  // Back Button Click - Redirect to Filter Teams Page
  onBack(): void {
    this.router.navigate(['filterteams'])
  }
}
