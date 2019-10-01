// Imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../providers/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  userid: number = 0;

  // Array to hold Users Objects
  users: Array<User> = [];

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    
    // Redirect to Login Page if not Authenticated and Admin
    if (!this.userService.getAuth() || !this.userService.getAdmin()) {
      this.router.navigate(['login']);
    }

    this.userid = this.userService.loginUserId;

    // Get All Non-Admin Users (UserService)
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  // Back Button Click - Redirect to Filter Teams Page
  onBack(): void {
    this.router.navigate(['filterteams']);
  }
}
