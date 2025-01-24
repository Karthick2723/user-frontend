import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-product-design',
  templateUrl: './product-design.component.html',
  styleUrls: ['./product-design.component.scss']
})
export class ProductDesignComponent {
  showingresultsData = [];
  categoryId: any;
  loader: boolean = false;

  img1='https://solizecorporateweb.s3.amazonaws.com/client/asset/images/3d-cad-brower-software12.jpg';
  constructor(private activatedroute: ActivatedRoute,
    private route: Router, private common_service: CommonService,private webSocketService:WebSocketService) {

  }

  ngOnInit(): void {
    this.activatedroute.queryParamMap.subscribe(res => {
      this.categoryId = res.get('categoryId');
      if (this.categoryId) {
        this.showinggetAllbycategoryId(parseInt(this.categoryId));
      }
    });

    this.webSocketService.messages$.subscribe((message: string) => {
      if (message === "LOAD_SOLUTION" && this.categoryId) {
        this.showinggetAllbycategoryId(parseInt(this.categoryId));
      }
    });
  }


  showinggetAllbycategoryId(id: any) {
    this.loader = true;
    this.common_service.getAllbycategoryId(parseInt(id)).subscribe(res => {
      this.showingresultsData = res;
      this.loader = false;
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
}