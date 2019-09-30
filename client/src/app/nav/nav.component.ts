// Imports
import { Component, OnInit } from '@angular/core';
import { UserService } from './../providers/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {

  userid: number = 0;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() { };

  // Checks if User is Authenticated
  isAuth(): boolean {
    return this.userService.getAuth();
  }

  // Checks if User is Admin
  isAdmin(): boolean {
    return this.userService.getAdmin();
  }

  // Home Click - Navigate to Home Page
  onHome(): void {
    this.router.navigate(['/']);
  }

  // Login Click - Navigate to Login Page
  onLogin(): void {
    this.router.navigate(['login']);
  }

  // Register Click - Navigate to Register Page
  onRegister(): void {
    this.router.navigate(['register']);
  }

  // Edit Profile Click - Navigate to Edit Profile Page
  onEditProfile(): void {
    this.router.navigate(['editprofile'])
  }

  // Admin Click - Navigate to Admin Page
  onAdmin(): void {
    this.router.navigate(['admin'])
  }

  // Log Out Click - Navigate to Login Page
  onLogOut(): void {
    this.userService.setAuth(false);
    this.userService.setAdmin(false);
    this.router.navigate(['login']);
  }
}
