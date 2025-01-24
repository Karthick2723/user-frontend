import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ViewportScroller } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [trigger('popOverState', [
    state('show', style({
      opacity: 1
    })),
    state('hide', style({
      opacity: 0
    })),
    transition('show => hide', animate('600ms ease-out')),
    transition('hide => show', animate('1000ms ease-in'))
  ])]
})

export class HeaderComponent implements OnInit {
  @ViewChild('profileDropdown') profileDropdown: ElementRef;

  isLoggedIn: boolean = false;
  profileLinks = [
    { route: '/myaccount', label: 'My Account' },
    { route: '/myaccount', label: 'Orders' },
   /*  { route: '/account-settings', label: 'Account Settings' }, */
    { route: '/logout', label: 'Logout' },
  ];

  isOpen = false;
  @ViewChild('dropdown') dropdown: ElementRef;
  firstName = '';
  lastName = '';
  userId: any;
  query: string = '';
  Downarrow: boolean = false;
  uparrow: boolean = true;
  results: any[] = [];
  @Input() receiveBreadcrumbs: string;
  isShowSearchForm: boolean = true;
  filteredtags = []
  filteredvendors = []
  searchForm: FormGroup;
  isEventListPage: boolean = false;
  isEventDetailsPage: boolean = false;
  getAllProductList: any;
  vendorList: any;
  vendorDetails: any;
  ProductDetails: any;
  ProductsShow: boolean = false;
  VendorShow: boolean = false;
  selectedProductIndex: number = 0;
  spinneShow: boolean = false;
  tooglebtnOpenClose: boolean = false;
  firstDiv: boolean = true;
  secDiv: boolean = false;
  isHomePage: boolean;

  constructor(private authService: AuthService,private toastr: ToastrService, private commonservice: CommonService, private eRef: ElementRef, private router: Router, private http: HttpClient,
    private fb: FormBuilder, private viewportScroller: ViewportScroller
  ) {
    // Initialize isHomePage based on the initial URL
    this.isHomePage = this.router.url === '/';

    // Subscribe to router events to update isHomePage
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isHomePage = event.url === '/';
    });
    this.searchForm = this.fb.group({
      productTag: '',
      vendor: '',
    })
  }
  @HostListener('document:hidden.bs.offcanvas', ['$event'])
  onOffcanvasHidden(event: Event): void {
    if (event.target && (event.target as HTMLElement).id === 'offcanvasRight') {
      this.searchForm.reset(); 
      this.filteredtags = []; 
      this.filteredvendors = [];  
    }
  }
  ngOnInit() {
    // Update the value of isLoggedIn based on the user's login status
    this.isLoggedIn = this.authService.isLoggedIn();
    this.getLocalUserID();
    this.getAllData();
    this.getAllDatas();
    this.getRoutingUrl();
  }

  getLocalUserID() {
    this.userId = localStorage.getItem('userId')

  };

  openEmailClient(emailId: string): void {
    const subject = 'Your Subject Here';
    const body = 'Your message here';
    const mailtoLink = `mailto:${emailId}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  }

  getAllData() {
    if (this.isLoggedIn) {
      this.commonservice.getOrderDeatils(this.userId).subscribe(res => {
        if (res) {
          // Ensure res is not null or undefined before emitting it
          this.commonservice.userAccountDataSubject.next(res);
        } else {
          // Handle the case where res is null or undefined
          this.commonservice.userAccountDataSubject.next({});
        }
      });
    }
  }

  getAllDatas() {
    this.commonservice.userAccountDataSubject.subscribe(res => {
      if (res) {
        this.firstName = res.firstName || '';
        this.lastName = res.lastName || '';
      } else {
        this.firstName = '';
        this.lastName = '';
      }
    });
  }

  logout(): void {
    // localStorage.removeItem('userId');
    // this.router.navigate(['/login']);
    this.authService.logOut();
    this.toastr.success('Logout Successful');
    setTimeout(() => {
      this.router.navigate(['/login']).then(() => {
        window.location.reload();  // Force a reload to ensure the guard is checked
      });
     
    }, 1000); // 3 seconds delay
  
    
  }

  selectLink(link: string) {
    this.commonservice.setSelectedLink(link);
      localStorage.setItem('selectedLink', link);
    

  }

  toggleProfileDropdown(event: Event) {
    event.stopPropagation(); 
    this.isOpen = !this.isOpen;
    this.uparrow = !this.uparrow;
    this.Downarrow = !this.Downarrow;
  }

  closeDropdown() {
    this.isOpen = false;
  }

  handleLinkClick(event: Event, label: string): void {
    event.preventDefault(); 
    if (label === 'Logout') {
      this.logout();
    } else {
      this.toggleProfileDropdown(event);
    }
  }

  navigateToDiv() {
    this.router.navigate(['landing'], { fragment: 'serviceTechnology' });
  }

  getProfileImageFileName(): string {
    const firstLetterFirstName = this.firstName.charAt(0).toUpperCase();
    const firstLetterLastName = this.lastName.charAt(0).toUpperCase();
    const fileName = `${firstLetterFirstName}${firstLetterLastName}`;
    return fileName;
  }

  search() {
    if (!this.query) {
      return; 
    }
    const baseUrl = 'https://www.google.co.jp/search';
    const siteToSearch = '';
    const queryWithSite = `${this.query} site:${siteToSearch}`;
    const params = new HttpParams()
      .set('c', 'Search')
      .set('clid', '1')
      .set('q', queryWithSite)
      .set('submit', 'Submit');
    const url = `${baseUrl}?${params.toString()}`;
    window.open(url, '_blank');
  }

  getRoutingUrl() {
    const currentUrl = this.router.url;
    if (currentUrl == "/events") {
      this.isEventListPage = true;
      this.isShowSearchForm = false;
    } else {
      this.isEventListPage = false;
      this.isShowSearchForm = true;
    }
  }

  searchTag(event) {
    const inputElement = event.target as HTMLInputElement;
    let searchTerm = inputElement.value;

    if (searchTerm != "") {
      this.commonservice.autoCompleteProductTag(searchTerm).subscribe(res => {
        this.filteredtags = res;
      })
    } else {
      this.filteredtags = [];
    }
  }

  searchVendor(event) {
    const inputElement = event.target as HTMLInputElement;
    let searchTerm = inputElement.value;
    if (searchTerm != "") {
      this.commonservice.autoCompleteVendor(searchTerm).subscribe(res => {
        this.filteredvendors = res;
      })
    } else {
      this.filteredvendors = [];
    }
  }

  submitForm() {
    if ((this.searchForm.get('productTag').value == null && this.searchForm.get('vendor').value == null) || (this.searchForm.get('productTag').value == '' && this.searchForm.get('vendor').value == '')) {
    } else {
      this.router.navigate(['solutions'], {
        queryParams: {
          tag: this.searchForm.get('productTag').value,
          vendor: this.searchForm.get('vendor').value,
          categoryId: null
        }
      })
    }
  }

  clickTagSearch(value: any) {
    this.searchForm.get('productTag').setValue(value);
    this.filteredtags = [];
  }

  clickVendorSearch(value: any) {
    this.searchForm.get('vendor').setValue(value);
    this.filteredvendors = [];
  }

  onRadioChange() {
    this.firstDiv = true;
    this.secDiv = false;
  }
  
  onRadioChange2() {
    this.firstDiv = false;
    this.secDiv = true;
  }
  
  
}
