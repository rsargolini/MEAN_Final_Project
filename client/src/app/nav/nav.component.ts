import { Component, OnInit } from '@angular/core';
import { UserService } from './../providers/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  sub: any;
  userid: number = 0;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // get userid from Query Params
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        this.userid = params['userid'];
      })
  };

  isAuth(): boolean {
    return this.userService.getAuth();
  }

  isAdmin(): boolean {
    return this.userService.getAdmin();
  }

  onHome(): void {
    this.router.navigate(['/']);
  }

  onLogin(): void {
    this.router.navigate(['login']);
  }

  onRegister(): void {
    this.router.navigate(['register']);
  }

  onAddTeam(): void {
    this.router.navigate(['newteam']);
  }

  onEditProfile(): void {
    this.router.navigate(['editprofile'], {
      queryParams: { userid: this.userid }
    })
  }

  onAdmin(): void {
    this.router.navigate(['admin'], {
      queryParams: { userid: this.userid }
    })
  }

  onLogOut(): void {
    this.userService.setAuth(false);
    this.userService.setAdmin(false);
    this.router.navigate(['login']);
  }
}
