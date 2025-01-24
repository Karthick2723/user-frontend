import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-solutions',
  templateUrl: './solutions.component.html',
  styleUrls: ['./solutions.component.scss']
})
export class SolutionsComponent {
  productTag = '';
  vendor = '';
  categoryId = "";
  showingresultsData = [];
  filteredtags = []
  filteredvendors = []
  solutionsForm: FormGroup;
  showCategoryCondition = false;
  shownproductTag = null;
  shownvendor = null;
  showresult: boolean;
  search: boolean;
  isLoading = true;
  spinner: boolean = true;
  loader: boolean = false;

  constructor(public activatedRoute: ActivatedRoute, private route: Router, public common_service: CommonService, private fb: FormBuilder,
    private webSocketService: WebSocketService) {
    this.solutionsForm = this.fb.group({
      productTag: '',
      vendor: '',
    })
  }

  ngOnInit(): void {
    this.webSocketService.messages$.subscribe((message: string) => {
      if (message == "LOAD_SOLUTION") {
        this.getAllTagandVendor();
      }else if (message === "LOAD_CATEGORY") {
        this.getAllTagandVendor();
      }
    });

    this.activatedRoute.queryParamMap.subscribe(res => {
      this.productTag = res.get('tag');
      this.vendor = res.get('vendor');
      this.categoryId = res.get('categoryId');
      if (this.categoryId) {
        this.showinggetAllbycategoryId(this.categoryId);
        this.showCategoryCondition = true;
      } else {
        if (this.productTag || this.vendor) {
          this.showingResults(this.productTag, this.vendor);
          this.showCategoryCondition = false;
          if (this.solutionsForm) {
            this.solutionsForm.get('productTag').setValue(this.productTag);
            this.solutionsForm.get('vendor').setValue(this.vendor);
            this.shownproductTag = this.solutionsForm.get('productTag').value;
            this.shownvendor = this.solutionsForm.get('vendor').value;
          }
          this.showresult = true;
        } else {
          this.getAllTagandVendor();
          this.showresult = false;
        }
      }
    });
  }

  showingResults(producttag, vendor) {
    this.loader = true;
    this.showingresultsData = [];
    this.common_service.getAllProducts(producttag, vendor).subscribe(res => {
      this.showingresultsData = res;
      this.loader = false;
    })
  }

  clearFilter() {
    this.productTag = '';
    this.vendor = '';
    this.showingResults(this.productTag, this.vendor);
    this.showresult = false;
    this.getAllTagandVendor();
  }

  showinggetAllbycategoryId(id: any) {
    this.loader = true;
    this.common_service.getAllbycategoryId(id).subscribe(res => {
      this.showingresultsData = res;
      this.loader = false;
    })
  }

  getAllTagandVendor() {
    this.loader = true;
    this.common_service.getAllPublished().subscribe(res => {
      this.spinner = false;
      this.showingresultsData = res;
      this.loader = false;
    }, (error) => {
      console.error('Error fetching data:', error);
      this.isLoading = false;
      this.spinner = false;
      this.loader = false;
    });
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
    if ((this.solutionsForm.get('productTag').value == null && this.solutionsForm.get('vendor').value == null) || (this.solutionsForm.get('productTag').value == '' && this.solutionsForm.get('vendor').value == '')) {
    } else {
      let tag = this.solutionsForm.get('productTag').value;
      let vendor = this.solutionsForm.get('vendor').value
      this.showingResults(tag, vendor);
      this.shownproductTag = this.solutionsForm.get('productTag').value;
      this.shownvendor = this.solutionsForm.get('vendor').value;
      this.showresult = true;
    }
  }

  clickTagSearch(value: any) {
    this.solutionsForm.get('productTag').setValue(value);
    this.filteredtags = [];
  }

  clickVendorSearch(value: any) {
    this.solutionsForm.get('vendor').setValue(value);
    this.filteredvendors = [];
  }

  viewProudct(ProudctId: number) {
    this.route.navigate(['viewProduct/'], {
      queryParams: {
        id: ProudctId,
        action: 'views'
      }
    });
  }
}
