import { Component, ElementRef, HostListener, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  @HostListener('window:resize')
  @ViewChildren('carouselInner') carouselInners: QueryList<ElementRef>;

  currentCarouselItem: any;
  currentCarouselIndex: number = 0;
  categoryData: any;
  vendors: any;
  disablePrevButton: boolean = true;
  disableNextButton: boolean = false;
  categoryId: any;
  products: any;
  categoryName: any;
  constructor(private elementRef: ElementRef, private commonserice: CommonService, private route: Router, private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(res => {
      this.categoryId = res.get('id');
      localStorage.setItem('categoryId', this.categoryId)
    })
    this.updateItemsHeight();
    this.fetchcategorydata();
  }

  onResize() {
    this.updateItemsHeight();
  }

  fetchcategorydata(): void {
    this.commonserice.getCategoryById(this.categoryId).subscribe(
      (response: any) => {
        this.commonserice.categorydataSubject.next(response);
        this.categoryName = response.categoryName;
        localStorage.setItem('CategoryName', response.categoryName)
        if (response) {
          this.categoryData = response;
          this.vendors = this.categoryData.vendors;
          this.products = this.categoryData.products;
          this.vendors.forEach(item => {
            let product = [];
            this.products.forEach(prod => {
              if (prod.vendorId == item.vendorId) {
                product.push(prod);
              }
            })
            item.products = product;

          })
          this.currentCarouselItem = this.vendors ? this.vendors[0] : '';
        }
      }
    );
  }

  updateButtonStates(): void {
    if (this.currentCarouselIndex === 0) {
      this.disablePrevButton = true;
    } else {
      this.disablePrevButton = false;
    }
    if (this.currentCarouselIndex === this.vendors.length - 1) {
      this.disableNextButton = true;
    } else {
      this.disableNextButton = false;
    }
  }

  updateItemsHeight() {
    if (this.carouselInners) {
      this.carouselInners.forEach(carouselInner => {
        const carouselItems = carouselInner.nativeElement.querySelectorAll('.carousel-item');
        let maxHeight = 0;

        carouselItems.forEach(carouselItem => {
          carouselItem.style.height = 'auto';
          maxHeight = Math.max(maxHeight, carouselItem.offsetHeight);
        });
        carouselItems.forEach(carouselItem => {
          carouselItem.style.height = maxHeight + 'px';
        });
      });
    }
  }

  setCurrentCarouselItem(index: number) {
    this.currentCarouselItem = this.vendors[index];
    this.currentCarouselIndex = index;
  }

  prevItem() {
    if (this.currentCarouselIndex > 0) {
      this.setCurrentCarouselItem(this.currentCarouselIndex - 1);
    } else {
      this.setCurrentCarouselItem(this.vendors.length - 1);
    }
    this.updateButtonStates();
  }

  nextItem() {
    if (this.currentCarouselIndex < this.vendors.length - 1) {
      this.setCurrentCarouselItem(this.currentCarouselIndex + 1);
    } else {
      this.setCurrentCarouselItem(0);
    }
    this.updateButtonStates();
  }

  getTotalSlides(): number {
    if (this.vendors && this.vendors.length) {
      return this.vendors.length;
    } else {
      return 0;
    }
  }

  viewData(id: any) {
    this.route.navigate(['lob-desc/'], {
      queryParams: {
        id: id,
      }
    });
  }
  
  viewProduct(id: any) {
    this.route.navigate(['product-desc/'], {
      queryParams: {
        id: id,
      }
    });
  }
}
