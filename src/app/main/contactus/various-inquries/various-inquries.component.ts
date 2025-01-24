import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-various-inquries',
  templateUrl: './various-inquries.component.html',
  styleUrls: ['./various-inquries.component.scss']
})
export class VariousInquriesComponent {
  isChecked: false;
  VariousForm: FormGroup;
  isSubmitDisabled: true;
  productsList: any[] = [];
  indianStates = [
    { value: 'Andhra Pradesh', viewValue: 'Andhra Pradesh' },
    { value: 'Arunachal Pradesh', viewValue: 'Arunachal Pradesh' },
    { value: 'Assam', viewValue: 'Assam' },
    { value: 'Bihar', viewValue: 'Bihar' },
    { value: 'Chhattisgarh', viewValue: 'Chhattisgarh' },
    { value: 'Goa', viewValue: 'Goa' },
    { value: 'Gujarat', viewValue: 'Gujarat' },
    { value: 'Haryana', viewValue: 'Haryana' },
    { value: 'Himachal Pradesh', viewValue: 'Himachal Pradesh' },
    { value: 'Jharkhand', viewValue: 'Jharkhand' },
    { value: 'Karnataka', viewValue: 'Karnataka' },
    { value: 'Kerala', viewValue: 'Kerala' },
    { value: 'Madhya Pradesh', viewValue: 'Madhya Pradesh' },
    { value: 'Maharashtra', viewValue: 'Maharashtra' },
    { value: 'Manipur', viewValue: 'Manipur' },
    { value: 'Meghalaya', viewValue: 'Meghalaya' },
    { value: 'Mizoram', viewValue: 'Mizoram' },
    { value: 'Nagaland', viewValue: 'Nagaland' },
    { value: 'Odisha', viewValue: 'Odisha' },
    { value: 'Punjab', viewValue: 'Punjab' },
    { value: 'Rajasthan', viewValue: 'Rajasthan' },
    { value: 'Sikkim', viewValue: 'Sikkim' },
    { value: 'Tamil Nadu', viewValue: 'Tamil Nadu' },
    { value: 'Telangana', viewValue: 'Telangana' },
    { value: 'Tripura', viewValue: 'Tripura' },
    { value: 'Uttar Pradesh', viewValue: 'Uttar Pradesh' },
    { value: 'Uttarakhand', viewValue: 'Uttarakhand' },
    { value: 'West Bengal', viewValue: 'West Bengal' }
  ];

  selectedState: string = '';
  selectedCountry: string = 'India';
  submit: boolean = false;
  disableSubmitBtn: boolean = false;

  constructor(private fb: FormBuilder, private commonService: CommonService, private toastr: ToastrService) { }

  onCheckboxChange(event: MatCheckboxChange) {
  }

  ngOnInit() {
    this.InitFormBuilder();
  }

  InitFormBuilder() {
    this.VariousForm = this.fb.group({
      message: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      countryUi: [{ value: 'India', disabled: true }], 
      country: ['India', { value: 'India', disabled: true }, Validators.required],
      state: [''],
      company: ['', Validators.required],
      department: [''],
      title: [''],
      phoneNumber: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, Validators.email]],
      product: [],
      terms: [false, Validators.requiredTrue]

    }, {
      validator: this.emailMatchValidator
    });
  }

  emailMatchValidator(control: AbstractControl): ValidationErrors | null {
    const email = control.get('emailAddress');
    const confirmEmail = control.get('confirmEmail');
    if (email && confirmEmail && email.value !== confirmEmail.value) {
      control.get('confirmEmail')?.setErrors({ emailMismatch: true });
      return { emailMismatch: true };
    }
    return null;
  }
  
  SubmitConatactForm() {
    this.submit = true;
    if (this.VariousForm.invalid) {
      this.VariousForm.markAllAsTouched();
      this.toastr.error("Please enter valid data in the required fields.");
      this.submit = false;
      return;
    }
    this.commonService.submitContactForm(this.VariousForm.value).subscribe((res) => {
      this.toastr.success('Successfully Mail sent');
      this.submit = false;
      this.disableSubmitBtn = true;
      this.VariousForm.disable();
    })
  }
}
