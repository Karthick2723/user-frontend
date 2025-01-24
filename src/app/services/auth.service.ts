import { HttpClient } from '@angular/common/http';
import { HostListener, Injectable, OnDestroy, OnInit } from '@angular/core';
import { from, Observable, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { API_GATEWAY } from "../../environments/environment";
import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import firebase from 'firebase/compat/app';
import { BnNgIdleService } from 'bn-ng-idle';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit, OnDestroy {
  @HostListener('window:mousemove')

  private apiUrl: string;
  private timeout: any;
  private idleTime: number = 1800000;
  constructor(private http: HttpClient, private router: Router, private fireAuth: AngularFireAuth,
    private toastr: ToastrService, private afAuth: AngularFireAuth, private bnIdle: BnNgIdleService
  ) {
    this.apiUrl = API_GATEWAY.SERVER;
    this.ngOnInit()
  }

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  ngOnDestroy(): void {
    this.clearTimeout();
    this.removeMouseListeners();
  }

  checkLoginStatus() {
    const isLoggedIn = !!localStorage.getItem('token');
    if (isLoggedIn) {
      this.setupMouseListeners();
      this.resetTimeout();
    } else {
      this.removeMouseListeners();
    }
  }

  onMouseMove() {
    this.resetTimeout();
  }

  resetTimeout() {
    this.clearTimeout();
    this.timeout = setTimeout(() => this.handleTimeout(), this.idleTime);
  }

  clearTimeout() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  handleTimeout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.router.navigate(['/login']);
    localStorage.removeItem('userId');
    localStorage.removeItem(API_GATEWAY.ACCESS_TOKEN_KEY);
    this.fireLogOut();
  }

  setupMouseListeners() {
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
  }

  removeMouseListeners() {
    window.removeEventListener('mousemove', this.onMouseMove.bind(this));
  }
  encryptPassword(password: string): string {
    const secretKey = 'your-secret-key'; // Use a strong secret key
    return CryptoJS.AES.encrypt(password, secretKey).toString();
  }

  authLogin(email: string, password: string) {
    this.fireAuth.signInWithEmailAndPassword(email, password).then(
      (res) => {
        res.user?.getIdToken().then((idToken) => {
          localStorage.setItem('idToken', idToken); // Store the idToken in local storage
          const encryptedPassword = this.encryptPassword(password);
          const signInRequest = { emailId: email, password: encryptedPassword, uuid: res.user.uid };
          
          this.http.post<any>(`${this.apiUrl}/signin`, signInRequest).subscribe(
            (response) => {
              if (response && response.statusCode === 200) {
                this.setAccessToken(response.token);
                localStorage.setItem('email', response.emailId);
                localStorage.setItem('userId', response.userId);
                localStorage.setItem('token', 'true'); // Store a flag indicating successful login
                this.router.navigate(['/landing']);
                this.checkLoginStatus();
                this.toastr.success('Login Successful');
              } else {
                this.toastr.error(response.message || 'Login failed');
              }
            },
            (error) => {
              this.toastr.error(error.error.error || 'Error during sign-in');
            }
          );
        }).catch((tokenError) => {
          console.error('Error retrieving ID token:', tokenError);
          this.toastr.error('Failed to retrieve authentication token');
        });
      },
      (authError) => {
        const errorMessage = this.extractFirebaseErrorMessage(authError);
        this.toastr.error(errorMessage);
        this.router.navigate(['/login']);
      }
    );
  }
  

  fireLogOut() {
    this.fireAuth.signOut().then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('email')
      this.router.navigate(['/login']);
      localStorage.removeItem('userId');
      
    }, err => {
      this.toastr.error(err.message);
    }
    )
  }

  sendPasswordResetEmail(email: string) {
    this.afAuth.sendPasswordResetEmail(email).then(() => {
      this.router.navigate(['/login'])
    }).catch((error) => {
      this.toastr.error(error)
    })
  }

  signIn(signInRequest: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signin`, signInRequest);
  }

  setAccessToken(token: any): void {
    localStorage.setItem(API_GATEWAY.ACCESS_TOKEN_KEY, token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(API_GATEWAY.ACCESS_TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return this.getAccessToken() !== null;
  }

  isAuthorized(): Observable<boolean> {
    const isAuthorized = !!localStorage.getItem(API_GATEWAY.ACCESS_TOKEN_KEY);
    return new Observable<boolean>((observer) => {
      observer.next(isAuthorized);
      observer.complete();
    });
  }

  public logOut(msg?) {
    localStorage.removeItem(API_GATEWAY.ACCESS_TOKEN_KEY);
    if (msg === "sessionExpired") this.router.navigate(['/login']);
    else this.router.navigate(['/login']);
    this.fireLogOut();


  }

  // verfication Otp For mobile number Change
  initiatePhoneNumberVerification(phoneNumber: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
      firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(confirmationResult => {
          const verificationId = confirmationResult.verificationId;
          resolve(verificationId);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  updatePhoneNumber(newPhoneNumber: string, verificationId: string, verificationCode: string): Promise<void> {
    const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, verificationCode);
    return new Promise<void>((resolve, reject) => {
      this.afAuth.currentUser.then(user => {
        user.updatePhoneNumber(credential)
          .then(() => {
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      }).catch(error => {
        reject(error);
      });
    });
  }

  private extractFirebaseErrorMessage(error: any): string {
    if (error && error.message) {
      const messageMatch = error.message.match(/Firebase: (.+) \(auth\/.+\)/);
      return messageMatch ? messageMatch[1] : 'An unknown error occurred.';
    }
    return 'An unknown error occurred.';
  }

  refreshToken(): Observable<string> {
    return from(this.fireAuth.currentUser).pipe(
      switchMap(user => {
        if (user) {
          return from(user.getIdToken(true)); // Force refresh the token
        } else {
          return throwError('No user logged in');
        }
      })
    );
  }
}