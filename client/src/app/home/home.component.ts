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
    // call getLeagues() method in Leagues Service
    this.leagueService.getLeagues().subscribe(data => {
      this.leagues = data;
    });
  }

  onLogin(): void {
    this.router.navigate(['login']);
  }

  onRegister(): void {
    this.router.navigate(['register']);
  }
}
