import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, of} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersEndpoint: string = 'http://localhost:3000/login/';
	private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  }; 
  
  constructor(private http: HttpClient) { }

  login(userName: string, password: string) : Observable<any> {
    return this.http.post(this.usersEndpoint, {user_name : userName, user_password : password}, this.httpOptions)
      .pipe(map(res => <any[]>res));
  }
}
