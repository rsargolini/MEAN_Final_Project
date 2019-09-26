import { Component, OnInit } from '@angular/core';
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
  ) { }

  ngOnInit() {
    // call getLeagues() method in LeaguesService
    this.leagueService.getLeagues().subscribe(data => {
      this.leagues = data;
    });
  }
}
