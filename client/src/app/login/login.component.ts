import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../providers/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  title: string = 'Login';

  ngOnInit() { }

  userName: string = '';
  password: string = '';
  errMsg: string = '';
  loginError: boolean = false;

  onLogin(): void {
    if (this.userName === '' || this.password === '') {
      this.errMsg = 'User Name and Password are required.';
      this.loginError = true;       
    } else {
      // call login() method in AuthService to validate login creds
      if (this.authService.login(this.userName, this.password)) {
        this.loginError = false;
        this.router.navigate(['users'], { queryParams: { username: this.userName } });
      } else {
        this.errMsg = 'Login unsuccessful.';
        this.loginError = true;
      }
    }
  }
}  
