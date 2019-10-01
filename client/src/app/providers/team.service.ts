// Imports
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TeamService {

  selectedTeamId: number = 0;

  private teamsEndpoint: string = 'http://localhost:3000/teams/data';
	private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    }),
    withCredentials:true
  }; 

  constructor(private http: HttpClient) { }

  // Get All Teams 
  getTeams(): Observable<any> {
    return this.http.get(this.teamsEndpoint, this.httpOptions)
      .pipe(map(res => <any[]>res));
  }

  // Get One Team by Team ID 
  getTeam(teamId: number) : Observable<any> {
    return this.http.get(`${this.teamsEndpoint}/${teamId}`, this.httpOptions)
    .pipe(map(res => <any[]>res));
  }

  // Delete One Team by Team ID 
  deleteTeam(teamId: number) : Observable<any> {
    return this.http.delete(`${this.teamsEndpoint}/${teamId}`, this.httpOptions)
      .pipe(map(res => <any[]>res));
  }
}
