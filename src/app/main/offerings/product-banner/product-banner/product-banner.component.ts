import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-product-banner',
  templateUrl: './product-banner.component.html',
  styleUrls: ['./product-banner.component.scss']
})
export class ProductBannerComponent {
  categoryName: any;
  private subscription: Subscription;

  constructor(private CommonService: CommonService) {
  }

  ngOnInit() {
    this.subscription = this.CommonService.categorydataSubject.subscribe(res => {

    });
  }
  
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
