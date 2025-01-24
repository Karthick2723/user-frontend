import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-service-inqruries',
  templateUrl: './service-inqruries.component.html',
  styleUrls: ['./service-inqruries.component.scss']
})
export class ServiceInqruriesComponent {
  isChecked: boolean = true;
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

  constructor(private fb: FormBuilder, private commonService: CommonService, private toastr: ToastrService,private webSocketService:WebSocketService) { }

  ngOnInit() {
    this.InitFormBuilder();
    this.getProductList();

    this.webSocketService.messages$.subscribe((message: string) => {
      if (message == "LOAD_SOLUTION") {
        this.getProductList();
      }
    });
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
      product: ['', Validators.required],
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
    const formValue = {
      ...this.VariousForm.value,
      product: {
        productId: this.VariousForm.value.product
      }
    };
    if (this.VariousForm.invalid) {
      this.VariousForm.markAllAsTouched();
      this.toastr.error("Please enter valid data in the required fields.");
      this.submit = false;
      return;
    }
    this.commonService.submitContactForm(formValue).subscribe((res) => {
      this.submit = false;
      this.disableSubmitBtn = true;
      this.toastr.success('Successfully Mail sent');
      this.VariousForm.disable();
    })
  };

  getProductList() {
    this.productsList = []; // Clear the list before populating it again
    this.commonService.getAllPublished().subscribe((res) => {
      this.productsList = res; // Assign the response directly to the productsList
    });
  }
  
  onCheckboxChange(event: any) {
    this.isChecked = event.checked;
  }
}
