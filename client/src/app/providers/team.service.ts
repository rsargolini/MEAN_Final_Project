import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private teamsEndpoint: string = 'http://localhost:3000/teams/data';
	private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    }),
    withCredentials:true
  }; 

  constructor(private http: HttpClient) { }

  getTeams(): Observable<any> {
    return this.http.get(this.teamsEndpoint, this.httpOptions)
      .pipe(map(res => <any[]>res));
  }

  getTeam(teamId: number) : Observable<any> {
    return this.http.get(`${this.teamsEndpoint}/${teamId}`, this.httpOptions)
    .pipe(map(res => <any[]>res));
  }
}
