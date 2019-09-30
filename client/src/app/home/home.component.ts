// Imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeagueService } from '../providers/league.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  // Array to hold Leagues Objects
  leagues: Array<string> = [];

  constructor(
    private leagueService: LeagueService,
    private router: Router
  ) { }

  ngOnInit() {

    // Get All Leagues
    this.leagueService.getLeagues().subscribe(data => {
      this.leagues = data;
    });
  }

  // Log On Button Click - Redirect to Login Page
  onLogin(): void {
    this.router.navigate(['login']);
  }

  // Register Button Click - Redirect to Register Page
  onRegister(): void {
    this.router.navigate(['register']);
  }
}
