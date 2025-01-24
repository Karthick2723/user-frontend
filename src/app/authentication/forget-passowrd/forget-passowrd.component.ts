import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forget-passowrd',
  templateUrl: './forget-passowrd.component.html',
  styleUrls: ['./forget-passowrd.component.scss']
})
export class ForgetPassowrdComponent {

  ForgetEmailForm: FormGroup;
  submits: boolean = true;
  edit: boolean = true;
  email: any;
  constructor(private fb: FormBuilder, private authservice: AuthService, private toastr: ToastrService) {
    this.formIntialize();
  }

  formIntialize() {
    this.ForgetEmailForm = this.fb.group({
      email: [''],
    });
  }

  submit() {
    if (this.email) {
      this.authservice.sendPasswordResetEmail(this.email)
      this.submits = false;
      this.edit = true;
    } else {
      this.toastr.error('Please Enter valid Email');
    }
  }
}
