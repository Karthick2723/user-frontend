import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent {
  values: any;
  userId: any;
  userLoginId: any;
  emailId: any
  firstName: any;
  lastName: any;
  phoneNbr: any
  clientId: any;
  clientName: any;
  address: any;
  photoUrl: any;
  @Input() user: any;
  @Output() imageUpdated = new EventEmitter<string>();  // Emit Base64 string
  @Input() ImageSelect :boolean;
  imageUrl: string | ArrayBuffer = '';
  constructor(private CommonService: CommonService) {
    this.getAllData();
  }

  
  getAllData() {
    this.CommonService.userAccountDataSubject.subscribe(res => {
      this.values = res;
      this.userId = res.userId;
      this.userLoginId = res.userLoginId
      this.emailId = res.emailId;
      this.firstName = res.firstName;
      this.lastName = res.lastName;
      this.phoneNbr = res.phoneNbr;
      this.clientId = res.clientId;
      this.clientName = res.clientName
      this.address = res.address;
      this.imageUrl = res.photoUrl;
    })
  };
  ngOnChanges() {
    if (this.user && this.user.image) {
      this.imageUrl = this.user.image; // Assuming image is Base64 string
    }
  }
  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        this.imageUrl = base64String;
        this.imageUpdated.emit(base64String);
      };
      reader.readAsDataURL(file);
    } else {
      console.warn('No file selected.');
    }
  }

  getProfileImageFileName(): string {
    const firstLetterFirstName = this.firstName.charAt(0).toUpperCase();
    const firstLetterLastName = this.lastName.charAt(0).toUpperCase();
    const fileName = `${firstLetterFirstName}${firstLetterLastName}`;
    return fileName;
  }
  onImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.photoUrl = reader.result;         
      };
      reader.readAsDataURL(fileInput.files[0]);
    }
  }
}
