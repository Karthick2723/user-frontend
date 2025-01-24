import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-my-account-details',
  templateUrl: './my-account-details.component.html',
  styleUrls: ['./my-account-details.component.scss']
})
export class MyAccountDetailsComponent implements OnInit, OnDestroy {

  navLinks = [
    { label: 'My Account' },
    { label: 'Orders' },
  ];

  userId: any;
  selectedLink: string;
  subscription: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private commonservice: CommonService,
    private webSocketService: WebSocketService
  ) {
    this.subscription = this.commonservice.selectedLink$.subscribe(link => {
      this.selectedLink = link;
    });    
  }

  ngOnInit(): void {
    this.getLocalUserID();
    this.retrieveSelectedLink();
    this.webSocketService.messages$.subscribe((message: string) => {
      if (message == "LOAD_USERS") {
        this.getAllData();
      } else if (message === "USER_UPDATED") {
        this.authService.logOut();
      }
    });
  }

  selectLink(link: string): void {
    this.selectedLink = link;
    localStorage.setItem('selectedLink', link);
  }

  retrieveSelectedLink(): void {
    const storedLink = localStorage.getItem('selectedLink');
    if (storedLink) {
      this.selectedLink = storedLink;
    }
  }

  getLocalUserID() {
    this.userId = localStorage.getItem('userId');
  }

  getAllData() {
    if (!this.userId) {
      return;
    }
    this.commonservice.getOrderDeatils(this.userId).subscribe(res => {
      this.commonservice.userAccountDataSubject.next(res);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    localStorage.removeItem('selectedLink');
  }
}
