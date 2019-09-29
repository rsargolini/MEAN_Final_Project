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

  userid: number = 0;
  username: string = '';
  password: string = '';

  errMsgs: Array<string> = [];
  errorFound: boolean = false;

  onLogin(): void {
    this.errorFound = false;
    this.errMsgs = [];

    if (this.username.trim() == '') {
      this.errMsgs.push('Missing User Name.' + '<br />');
    }

    if (this.password.trim() == '') {
      this.errMsgs.push('Missing Password.' + '<br />');
    }

    if (this.errMsgs.length > 0) {
      this.errorFound = true;
    }
    else {
      // Call UserService to authenticate
      this.userService.login(this.username, this.password).subscribe(data => {
        if (data['error']) {
          this.errMsgs.push('Login unsuccessful.');
          this.errorFound = true;
          this.userService.setAuth(false);
          this.userService.setAdmin(false);
        } else if (data.IS_ADMIN) {
          this.userService.setAdmin(true);
          this.userService.setAuth(true);
          this.router.navigate(['filterteams'], { queryParams: { userid: data.ID } });
        } else {
          this.userService.setAuth(true);
          this.router.navigate(['filterteams'], { queryParams: { userid: data.ID } });
        }
      });
    }
  }

  onRegister(): void {
    this.router.navigate(['register']);
  }
}
