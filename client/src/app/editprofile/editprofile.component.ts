// Imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './../providers/user.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})

export class EditProfileComponent implements OnInit {

  userid: number = 0;
  username: string = '';
  email: string = '';

  // Error Messages
  errMsg: string = '';
  errorFound: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private modalService: NgbModal) { }

  ngOnInit() {

    // Redirect to Login Page if not Authenticated (UserService)
    if (!this.userService.getAuth()) {
      this.router.navigate(['login']);
    }

    this.userid = this.userService.loginUserId;

    // Get User Details by User ID (UserService)
    this.userService.getUser(this.userid).subscribe(data => {
      this.username = data.USERNAME;
      this.email = data.EMAIL;
    })
  }

  // Save Button Click - Validate Updates and Update Profile
  onSave(savemodal): void {
    if (this.email.trim() == '') {
      this.errMsg = 'Missing Email Address.';
      this.errorFound = true;
    } else {
      this.errorFound = false;
      this.errMsg = '';
      // Put User Profile Details by Team ID (UserService)
      this.userService.updateUser(this.userid, this.email).subscribe(data => {
        if (data['error']) {
          this.errMsg = 'Update unsuccessful.';
          this.errorFound = true;
        } else {
          this.ngOnInit();
          this.modalService.open(savemodal, { ariaLabelledBy: 'modal-basic-title' })
        }
      });
    }
  }

  // Delete Button Click - Display Delete Confirmation Modal (ModalService)
  onDelete(deletemodal): void {
    this.modalService.open(deletemodal, { ariaLabelledBy: 'modal-basic-title' })
  };

  // Confirmation Delete Click - Delete User Profile by User ID (UserService)
  onOkDelete(): void {
    this.userService.deleteUser(this.userid).subscribe(data => {
      if (data['error']) {
        this.errMsg = 'Delete unsuccessful.';
        this.errorFound = true;
      } else {
        this.userService.setAuth(false);
        this.userService.setAdmin(false);
        this.router.navigate(['/']);
      }
    });
  }

  // Back Button Click - Redirect to Filter Teams Page
  onBack(): void {
    this.router.navigate(['filterteams'])
  }
}