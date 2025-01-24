import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import firebase from 'firebase/app';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent {

  accountForm: FormGroup;
  submits: boolean = false;
  edit: boolean = true;
  values: any;
  userId: any;
  verifiedemail: any;
  arialabel: any;
  datadismiss: any;
  verifiedButton: boolean = false;
  newPhoneNumber: string = '+91';
  verificationId: string;
  verificationCode: string;
  @ViewChild('myModal') myModal: any;
  imageBase64: string | null = null;
  img:string;
  constructor(private fb: FormBuilder, private CommonService: CommonService, private toastr: ToastrService,
    private authservice: AuthService) {
  }

  ngOnInit() {
    this.verifiedemail = localStorage.getItem('email');
    this.formIntialize();
    this.disableForm();
    this.getLocalUserID();
    this.getAllData();
  }
  getAllData() {
    this.CommonService.userAccountDataSubject.subscribe(res => {
      this.values = res;
      this.imageBase64 = res.photoUrl 
      this.accountForm.patchValue({
        firstName: res.firstName,
        lastName: res.lastName,
        emailId: res.emailId,
        phoneNbr: res.phoneNbr,
        clientName: res.clientName,
        address: res.address,
        photoUrl: res.photoUrl
      });
    })
  }

  formIntialize() {
    this.accountForm = this.fb.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      emailId: [''],
      phoneNbr: [Number],
      clientName: ['',Validators.required],
      address: ['',Validators.required],
      photoUrl:['']
    });
  }
  trimSpaces() {
    Object.keys(this.accountForm.controls).forEach((key) => {
      const control = this.accountForm.get(key);
      if (control && typeof control.value === 'string') {
        const trimmedValue = control.value.replace(/\s+/g, ' ').trim();
        control.setValue(trimmedValue, { emitEvent: false });
      }
    });
  }
  onImageUpdated(base64String: string) {
    this.imageBase64 = base64String;
  }
  submit() {
    this.trimSpaces();
    const data = {
      ...this.accountForm.value,
      photoUrl: this.imageBase64
    }; 
    
    if (this.accountForm.valid) {
      this.CommonService.updateall(data, this.userId).subscribe((res) => {
        if (res.statusCode == 200) {
         // this.getAllData();
          this.toastr.success("Updated Successfully");
          this.disableForm();
          this.submits = false;
          this.edit = true;
          this.verifiedButton = false;
          this.CommonService.userAccountDataSubject.next(data);
          //location.reload();
        }
      });
    } else {
      this.toastr.error('Enter Mandatory Fields');
    }
  }

  disableForm(): void {
    this.accountForm.disable();
  }

  enableForm(): void {
    this.accountForm.enable();
    this.submits = true;
    this.edit = false;
    this.verifiedButton = true;
  }

  getLocalUserID() {
    this.userId = localStorage.getItem('userId')
  }



  passwordReset() {
    this.authservice.sendPasswordResetEmail(this.verifiedemail)
    this.submits = false;
    this.edit = true;
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('access_token');
    localStorage.removeItem('email');
  };

  closeModal() {
    this.arialabel = 'Close';
    this.datadismiss = 'modal';
  }

  verifyPhoneNumber() {
    this.authservice.initiatePhoneNumberVerification(this.newPhoneNumber)
      .then(verificationId => {
        this.verificationId = verificationId;
      })
      .catch(error => {
        this.toastr.error(error.message);
      });
  };

  updatePhoneNumber() {
    this.authservice.updatePhoneNumber(this.newPhoneNumber, this.verificationId, this.verificationCode)
      .then(() => {
        this.toastr.success('Phone number updated successfully');
        this.accountForm.patchValue({
          phoneNbr: this.newPhoneNumber
        });
        this.closeModal();
      })
      .catch(error => {
        this.toastr.error(error.message);
      });
  }
  validateNumberInput(event: any) {
    const value = event.target.value;
    if (!value.startsWith('+91')) {
      event.target.value = '+91';
    } else {
      const suffix = value.slice(3).replace(/[^0-9+]/g, ''); 
      this.newPhoneNumber = '+91' + suffix;
      event.target.value = this.newPhoneNumber;
    }
  }


  closemodal(){
    this.newPhoneNumber='+91'
  }

}
