import { Component, OnInit } from '@angular/core';
import { UserService } from './../providers/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  private isAuthenticated: boolean = false;

  sub: any;
  userid: number = 0;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.isAuthenticated = this.userService.getAuth();

    // get userid from Query Params
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        this.userid = params['userid'];
      })
  };

  navEditProfile(): void {
    this.router.navigate(['editprofile'], {
      queryParams: { userid: this.userid }
    })
  }
}
