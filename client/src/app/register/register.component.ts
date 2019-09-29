import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './../providers/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private router: Router, 
    private userService: UserService
  ) { }

  ngOnInit() { }

  username: string = '';
  password: string = '';
  email: string = '';

  errMsg: string = '';
  errorFound: boolean = false;

  onRegister(): void {
    if (this.username == '') {
      this.errMsg = 'Missing User Name.';
      this.errorFound = true;
    } else if (this.password == '') {
      this.errMsg = 'Missing Password.';
      this.errorFound = true;
    } else if (this.password.length < 8) {
      this.errMsg = 'Password must be at least 8 chars.';
      this.errorFound = true;
    } else if (this.email == '') {
      this.errMsg = 'Missing Email Address.';
      this.errorFound = true;
    } else {
      this.errorFound = false;
      this.errMsg = '';
    
      // Call UserService to Register
      this.userService.register(this.username, this.password, this.email).subscribe(data => {
        if (data['errorFound']) {
          this.errMsg = 'Registration unsuccessful.';
          this.errorFound = true;
        } else {
          this.router.navigate(['login']);
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['login']);
  }
}  
