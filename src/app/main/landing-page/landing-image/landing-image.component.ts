import { Component, Input } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CommonService } from 'src/app/services/common.service';
import { WebSocketService } from 'src/app/services/web-socket.service';
@Component({
  selector: 'app-landing-image',
  templateUrl: './landing-image.component.html',
  styleUrls: ['./landing-image.component.scss'],
})

export class LandingImageComponent {
  @Input() receiveBreadcrumbs: string;
  isShowSearchForm: boolean = true;
  filteredtags = []
  filteredvendors = []
  searchForm: FormGroup;
  isEventListPage: boolean = false;
  isEventDetailsPage: boolean = false;
  getAllProductList: any;
  getAllProductLists:any;
  vendorList: any[] = [];
  vendorDetails: any;
  ProductDetails=[];
  categoryTagList:any[] = [];
  ProductsShow: boolean = false;
  VendorShow: boolean = false;
  selectedTagIndex: number;
  selectedCategoryIndex:number;
  spinneShow: boolean = false;
  tooglebtnOpenClose: boolean = false;
  banners: any[];
  activeBanner: any;
  search: boolean;
  selectedVendorIndex: number;
  activeMobileHeader: string = 'keywords';
  private clickSubject = new Subject<void>();
  CategoryName: any;

  constructor(private fb: FormBuilder, public route: Router, public common_service: CommonService, private webSocketService: WebSocketService) {
    this.searchForm = this.fb.group({
      productTag: '',
      vendor: '',
    });
    this.clickSubject.pipe(debounceTime(300)).subscribe(() => {
      this.toogleBtn();
    });
  }

  ngOnInit(): void {
    this.getRoutingUrl();
    this.getAllKeywords();
    this.getAllKeyword();
    this.getAllVendorList();
    this.fetchBanners();
    this.getAllCategory();
    this.webSocketService.messages$.subscribe((message: string) => {
      if (message == "LOAD_BANNER") {
        this.fetchBanners();
      }

      if (message == "LOAD_SOLUTION") {
        this.getAllKeywords();
        this.getAllKeyword();
      }
    });

  }
  getAllCategory(){
    this.common_service.categories$.subscribe((res)=>{
        this.CategoryName = res;
    })
  }

  getRoutingUrl() {
    const currentUrl = this.route.url;
    if (currentUrl == "/events") {
      this.isEventListPage = true;
      this.isShowSearchForm = false;
    } else {
      this.isEventListPage = false;
      this.isShowSearchForm = true;
    }
  }

  searchTag(event) {
    this.search = true;
    const inputElement = event.target as HTMLInputElement;
    let searchTerm = inputElement.value;
    if (searchTerm != "") {
      this.common_service.autoCompleteProductTag(searchTerm).subscribe(res => {
        this.filteredtags = res;
      })
    } else {
      this.filteredtags = [];
    }
  }

  searchVendor(event) {
    this.search = false;
    const inputElement = event.target as HTMLInputElement;
    let searchTerm = inputElement.value;
    if (searchTerm != "") {
      this.common_service.autoCompleteVendor(searchTerm).subscribe(res => {
        this.filteredvendors = res;
      })
    } else {
      this.filteredvendors = [];
    }
  }

  submitForm() {
    if ((this.searchForm.get('productTag').value == null && this.searchForm.get('vendor').value == null) || (this.searchForm.get('productTag').value == '' && this.searchForm.get('vendor').value == '')) {
    } else {
      this.route.navigate(['solutions'], {
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

  getAllKeywords() {
    this.common_service.getAllProductTag().subscribe((res) => {
      this.getAllProductLists = res;
      if (this.getAllProductLists.length > 0) {
        this.getProductId(this.getAllProductLists[0]?.productTagId, 0);
      }
    })
  };
  getAllKeyword() {
    this.common_service.getAllProductTag().subscribe((res) => {
      this.getAllProductList = res;
      if (this.getAllProductList.length > 0) {
        this.getCategoryId(this.getAllProductList[0]?.productTagId, 0);
      }
    })
  };

  getAllVendorList() {
    this.selectedCategoryIndex = -1;
    this.ProductsShow =false;
    this.VendorShow =true;
    this.common_service.getAllVendor().subscribe((res) => {
      this.vendorList = res;
      if (this.vendorList.length > 0) {
        this.getVendorId(this.vendorList[0]?.vendorId, 0);
      }
    })
  }

  getVendorId(id: any, index: number) {
    this.ProductsShow = false;
    this.VendorShow = true;
    this.spinneShow = true;
    this.selectedVendorIndex = index;
    this.common_service.getProductsByVendorId(id).subscribe((res) => {
      if (res) {
        this.vendorDetails = res;
        this.spinneShow = false;
      }
    })
  };
  getCategoryId(id:any, index:number){
    this.spinneShow = true;
    this.selectedCategoryIndex =index;
    this.ProductsShow =true;
    this.VendorShow =false;
    this.common_service.productTagsByCategoryId(id).subscribe((res)=>{
      if (res) {
        this.categoryTagList = res;
        this.spinneShow = false;
        this.getAllProductLists =res
        if (this.getAllProductLists.length > 0) {
          this.getProductId(this.getAllProductLists[0]?.productTagId, 0);
        }
      }
    })

  }

  getProductId(id: any, index: number) {
    this.ProductsShow = true;
    this.VendorShow = false;
    this.selectedTagIndex = index;
    this.spinneShow = true;
    this.common_service.getProdcutsByTagId(id).subscribe((res) => {
      if (res) {
        this.ProductDetails = res;
        this.spinneShow = false;
      }
    })
  };

  viewProudct(ProudctId: number) {
    this.route.navigate(['viewProduct/'], {
      queryParams: {
        id: ProudctId,
        action: 'views'
      }
    });
  }

  toogleBtn() {
    this.tooglebtnOpenClose = !this.tooglebtnOpenClose;
    this.selectedCategoryIndex = 0;
  }

  fetchBanners() {
    this.common_service.getActiveBanners().subscribe(data => {
      if (data && data.length) {
        this.activeBanner = data.find(banner => banner.status === 'true');
      }
    });
  }

  setActiveHeader(header: string) {
    this.activeMobileHeader = header;
  }
  getVendorsTag(){}
}
