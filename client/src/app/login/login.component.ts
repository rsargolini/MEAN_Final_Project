import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './../providers/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() { }

  username: string = '';
  password: string = '';

  errMsg: string = '';
  errorFound: boolean = false;

  onLogin(): void {
    if (this.username == '') {
      this.errMsg = 'Missing User Name.';
      this.errorFound = true;
    } else if (this.password == '') {
      this.errMsg = 'Missing Password.';
      this.errorFound = true;
    } else if (this.password.length < 8) {
      this.errMsg = 'Password is at least 8 chars.';
      this.errorFound = true;
    } else {
      this.errorFound = false;
      this.errMsg = '';

      // Call UserService to authenticate
      this.userService.login(this.username, this.password).subscribe(data => {
        if (data['error']) {
          this.errMsg = 'Login unsuccessful.';
          this.errorFound = true;
          this.userService.setAuth(false);
          this.userService.setAdmin(false);
        } else if (data.isAdmin) {
          this.userService.setAdmin(true);
          this.userService.setAuth(true);
          this.router.navigate(['filterteams']);
        } else {
          this.userService.setAuth(true);
          this.router.navigate(['filterteams']);
        }
      });
    }
  }
}
