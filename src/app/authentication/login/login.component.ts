import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from 'src/app/services/auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'; // Updated import
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent {
  signInRequest = { emailId: '', password: '' };
  isSubmitting = false;
  password;
  show = false;
  errorMessage: string = '';
  authmail: string;
  authPassword: string;

  constructor(private authService: AuthService, private _router: Router, private router: Router,private commonservice:CommonService
  ) { }

  ngOnInit() {
    this.authService.logOut();
  }

  loginWithGoogle() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        if (result.user) {
          result.user.getIdToken(true).then((token) => {
            localStorage.setItem('firebaseToken', token); // Store the token
          });
        }
      })
      .catch((error) => {
        console.error('Google sign-in error:', error.message);
      });
  }  

  authLogin() {

    this.isSubmitting = true;
    this.errorMessage = '';
    if (this.authmail == '' || this.authPassword == '') {
      return;
    } else {
      this.authService.authLogin(this.authmail, this.authPassword)
      this.isSubmitting = false;
    }
  }

  signIn(signInForm: NgForm) {
    this.isSubmitting = true;
    this.errorMessage = '';
    if (signInForm.invalid) {
      return;
    }
    this.authService.signIn(this.signInRequest).subscribe(
      (response) => {
        if (response && response.statusCode === 200) {
          this.authService.setAccessToken(response.token);
          localStorage.setItem('userId', response.userId);
          this._router.navigate(['/landing']);
        } else {
          this.errorMessage = 'Invalid email or password';
        }
        this.isSubmitting = false;
      },
      (error) => {
        this.isSubmitting = false;
      }
    );
  }

  toggleShow() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }
}

