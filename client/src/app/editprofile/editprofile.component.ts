import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from './../providers/user.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditProfileComponent implements OnInit {

  sub: any;

  userid: number = 0;
  username: string = '';
  email: string = '';

  errMsg: string = '';
  errorFound: boolean = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        this.userid = params['userid'];
      });

    this.userService.getUser(this.userid).subscribe(data => {
      this.username = data.USERNAME;
      this.email = data.EMAIL;
    })
  }

  onSave(): void {
    this.router.navigate(['filterteams'], {
      queryParams: { userid: this.userid }
    })
  }

  // Call UserService to Delete User Profile
  onDelete(): void {
    this.userService.deleteUser(this.userid).subscribe(data => {
      this.userService.setAuth(false);
      this.userService.setAdmin(false);
      this.router.navigate(['/']);
    });
  }

  onCancel(): void {
    this.router.navigate(['filterteams'], {
      queryParams: { userid: this.userid }
    })
  }
}