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

  display = 'none';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    if (!this.userService.getAuth()) {
      this.router.navigate(['login']);
    }

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
    if (this.email == '') {
      this.errMsg = 'Missing Email Address.';
      this.errorFound = true;
    } else {
      this.errorFound = false;
      this.errMsg = '';

      // Call UserService to Eidt Profile
      this.userService.updateUser(this.userid, this.email).subscribe(data => {
        if (data['errorFound']) {
          this.errMsg = 'Update unsuccessful.';
          this.errorFound = true;
        } else {
          this.userService.getUser(this.userid).subscribe(data => {
            this.username = data.USERNAME;
            this.email = data.EMAIL;
          })
        }
      });
    }
  }

  openModal(){
    this.display = "block";
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