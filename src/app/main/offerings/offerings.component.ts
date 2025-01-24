import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-offerings',
  templateUrl: './offerings.component.html',
  styleUrls: ['./offerings.component.scss']
})

export class OfferingsComponent {
  offeringData: any;
  
  constructor(private commonservice: CommonService, private route: Router) { }

  cardData = [
    {
      title: "Product Design Solutions",
      description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
      imageUrl: "../../../assets/images/img_003.jpg",
      buttonLabel: "View More",
      buttonLink: "#"
    },
    {
      title: "Testing and Validation solution",
      description: "SOLIZE India and International Automobile Centre of Excellence (iACE) Sign Strategic ",
      imageUrl: "../../../assets/images/img_003.jpg",
      buttonLabel: "View More",
      buttonLink: "#"
    },
    {
      title: "Engineering Solutions",
      description: "SOLIZE India and International Automobile Centre of Excellence (iACE) Sign Strategic ",
      imageUrl: "../../../assets/images/img_003.jpg",
      buttonLabel: "View More",
      buttonLink: "#"
    }
  ];

  ngOnInit() {
    this.fetchOfferringdata();
  }

  viewMore(data) {
    this.route.navigate(['/category/'], {
      queryParams: {
        id: data,

      }
    });
  }
  
  fetchOfferringdata(): void {
    this.commonservice.getalloffering().subscribe(
      (response: any) => {
        this.offeringData = response;
      }
    );
  }
}
