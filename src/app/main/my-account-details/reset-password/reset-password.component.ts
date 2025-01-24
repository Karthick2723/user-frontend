import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  ForgetEmailForm: FormGroup;
  submits: boolean = true;
  edit: boolean = true;
  email: any;
  temproryEmail: any;

  constructor(private fb: FormBuilder, private authservice: AuthService, private toastr: ToastrService) {
    this.formIntialize();
  }

  ngOnInit() {
    this.temproryEmail = localStorage.getItem('email');
  }

  formIntialize() {
    this.ForgetEmailForm = this.fb.group({
      email: [''],
    });
  }
  
  submit() {
    if (this.email && this.email == this.temproryEmail) {
      this.authservice.sendPasswordResetEmail(this.email)
      this.submits = false;
      this.edit = true;
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('access_token');
      localStorage.removeItem('email')
    } else {
      this.toastr.error('Please Enter valid Email');
    }
  }
}
