// Imports
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

  // Error Messages
  errMsgs: Array<string> = [];
  errorFound: boolean = false;

  // Register Button Click - Validate Registration Fields
  onRegister(): void {
    this.errorFound = false;
    this.errMsgs = [];

    if (this.username.trim() == '') {
      this.errMsgs.push('Missing User Name');
    }

    if (this.password.trim() == '') {
      this.errMsgs.push('Missing Password');
    }

    if (this.email.trim() == '') {
      this.errMsgs.push('Missing Email Address');
    }

    if (this.errMsgs.length > 0) {
      this.errorFound = true;
    }
    else {
       // Register with User Name, Password and Email (UserService)
      this.userService.register(this.username, this.password, this.email).subscribe(data => {
        if (data['error']) {
          this.errMsgs.push('Registration unsuccessful');
          this.errorFound = true;
        } 
        else {
          this.router.navigate(['login']);
        }
      }, err => {
        this.errMsgs.push( 'User Name already exists');
        this.errorFound = true;
      })
    }
  }

  // Cancel Button Click - Redirect to Login Page
  onCancel(): void {
    this.router.navigate(['login']);
  }
}  
