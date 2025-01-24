import { animate, state, style, stagger, keyframes, transition, trigger, query } from '@angular/animations';
import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { WebSocketService } from 'src/app/services/web-socket.service';
const style1 = style({
  opacity: 1,
  transform: "translateY(0)"
})

const style2 = style({
  opacity: 0,
  transform: "translateY(100%)"
})

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
 // @HostListener('window:scroll', ['$event'])
  @Input() scrollAnimationTrigger: boolean = false;
  @ViewChild('tagsContainer') tagsContainer: ElementRef;

  EventTitile: any[] = [];
  categoryList: any[] = [];
  state = 0;
  currentCount = 0;
  endValue = 30; 
  duration = 2000; 
  endValue2 = 17000;
  duration2 = 2000;
  currentCount2 = 0;
  loader: boolean = false;
  apiDataLoaded: boolean = false;
  currentSlide = 0;
  postArticles: any;
  showAllTags = false;
  private tagContainer: HTMLElement;

  constructor(private commonService: CommonService,private route: ActivatedRoute, private router: Router, public el: ElementRef, private webSocketService: WebSocketService) {
  }

  checkScroll() {
    const componentPosition = this.el.nativeElement.offsetTop;
    const scrollPosition = window.pageYOffset + window.innerHeight;
    if (scrollPosition >= componentPosition) {
      this.scrollAnimationTrigger = true;
    } else {
      this.scrollAnimationTrigger = false;
    }
  }

  ngOnInit() {
    //this.getEvents();
    this.getAllCategory();
    this.startCountUp();
    this.startCountUp2();
    this.getFeatureList();
    this.webSocketService.messages$.subscribe((message: string) => {      
      if(message == "LOAD_CATEGORY"){
        this.getAllCategory();
      }
    });
    this.webSocketService.messages$.subscribe((message: string) => {      
      if(message == "LOAD_ARTICLE"){
        this.getFeatureList();
      }
    });
    this.loadData().then(() => {
      this.apiDataLoaded = true;
      // Scroll to the fragment if the data is loaded
      this.route.fragment.subscribe(fragment => {
        this.scrollToFragment(fragment);
      });
    });
  }

  getFeatureList(){
    this.commonService.getTopThreeArticle().subscribe(
      data => {        
        this.postArticles = data.map(article => ({
          id: article.articleId,
          title: article.organizationName,
          description:article.articleName,
          image: article.articleImage,
          tags: article.articlesTagDTOs ? article.articlesTagDTOs.map(tag => tag.articleTagName) : [],
          date: article.createdAt
        }));
      },
      error => {
        console.error('Error fetching articles', error);
      }
    );
  }
  navigateToDetail(ProudctId: number) {
    this.router.navigate(['post-detail/'], {
      queryParams: {
        id: ProudctId,
        action: 'views'
      }
    });
  }
  scrollToFragment(fragment: string | null): void {
    if (fragment && this.apiDataLoaded) {
      const element = document.getElementById(fragment);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  async loadData(): Promise<void> {
    // Simulate API data loading
    return new Promise(resolve => {
      setTimeout(() => {
        // Your API data loading logic here
        resolve();
      }, 1000); // Simulated delay for API call
    });
  }

  scrollDone() {
    this.state++;
  }

  getEvents() {
    this.commonService.getEvents().subscribe((res) => {
      res.forEach((e, i) => {
        this.EventTitile.push(e);
      });
    })
  };

  scrollToTarget() {
    setTimeout(() => {
      const target = document.getElementById('serviceTechnology');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);
  }


  getAllCategory(): void {
    this.loader = true;
    this.commonService.getAllCategoryPublished().subscribe((res) => {
      this.categoryList = [];
      res.forEach((e) => {
        this.categoryList.push(e);
      });
      this.loader = false;
    });
  }

  clickSolutions(id: number) {
    this.router.navigate(['product-design'], {
      queryParams: {
        categoryId: id,
        tag: null,
        vendor: null

      }
    })
  };

  // count Value 30
  startCountUp() {
    const interval = this.duration / this.endValue;
    const countUp = () => {
      this.currentCount += 1;
      if (this.currentCount < this.endValue) {
        setTimeout(countUp, interval);
      }
    };
    countUp();
  }

  // count Value 17,000
  startCountUp2() {
    const interval = this.duration2 / this.endValue2;
    const countUp = () => {
      this.currentCount2 += 100;
      if (this.currentCount2 < this.endValue2) {
        setTimeout(countUp, interval);
      }
    };
    countUp();
  }
  toggleTags() {
    this.showAllTags = !this.showAllTags;
  }

}
