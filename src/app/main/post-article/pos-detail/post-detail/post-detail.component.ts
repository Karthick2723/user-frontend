import { Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent {
  @ViewChild('dataToExport') dataToExport: ElementRef;
  apiDelayResponse: string;
  id: any;
  htmlContent: SafeHtml;
  domContent: any;
  articleData: any;
  action: string;
  constructor(private activatedRoute: ActivatedRoute, private commonservice: CommonService, private sanitizer: DomSanitizer,
    private router:Router,    private webSocketService: WebSocketService

  ) { }
  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(res => {
      this.id = res.get('id');
      this.action = res.get('action');
    })
    this.getArticleById();
  
    this.webSocketService.messages$.subscribe((message: string) => {
      if (message == "LOAD_ARTICLE") {
        this.getArticleById();
      }
    });
  }
  getArticleById(): void {
    this.apiDelayResponse = 'Loading...';
    this.commonservice.getArticleById(this.id).subscribe(
      (res) => {
        if (res) {
          if (!res.isPublished) {
            this.apiDelayResponse = 'Post/Article is unpublished';
            this.router.navigate(['/landing']); // Redirect to product list
          } else {
            this.apiDelayResponse = 'No Data';
            const decodedHtml = res?.domFullContent == null || !res?.domFullContent ? '' : res?.domFullContent;
            this.domContent = decodedHtml;
            this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(decodedHtml);
            this.articleData = res;           
          }
        } else {
          this.apiDelayResponse = 'Post/Article not found';
        }
      },
      (error) => {
        this.apiDelayResponse = 'Error loading Post/Article details';
      }
    );
  }
}
