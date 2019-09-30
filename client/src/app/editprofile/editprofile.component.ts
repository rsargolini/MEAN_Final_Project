import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    private router: Router,
    private modalService: NgbModal) { }

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

  onSave(savemodal): void {
    if (this.email.trim() == '') {
      this.errMsg = 'Missing Email Address.';
      this.errorFound = true;
    } else {
      this.errorFound = false;
      this.errMsg = '';
      // Call UserService to Eidt Profile
      this.userService.updateUser(this.userid, this.email).subscribe(data => {
        if (data['error']) {
          this.errMsg = 'Update unsuccessful.';
          this.errorFound = true;
        } else {
          this.modalService.open(savemodal, { ariaLabelledBy: 'modal-basic-title' })
        }
      });
    }
  }

  onDelete(deletemodal): void {
    this.modalService.open(deletemodal, { ariaLabelledBy: 'modal-basic-title' })
  };

  // Call UserService to Delete User Profile
  onOkDelete(): void {
    this.userService.deleteUser(this.userid).subscribe(data => {
      if (data['error']) {
        this.errMsg = 'Update unsuccessful.';
        this.errorFound = true;
      } else {
        this.userService.setAuth(false);
        this.userService.setAdmin(false);
        this.router.navigate(['/']);
      }
    });
  }

  onBack(): void {
    this.router.navigate(['filterteams'], {
      queryParams: { userid: this.userid }
    })
  }
}