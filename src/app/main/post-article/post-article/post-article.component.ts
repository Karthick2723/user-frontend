import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-post-article',
  templateUrl: './post-article.component.html',
  styleUrls: ['./post-article.component.scss']
})
export class PostArticleComponent {
  posts: any;
  spinner: boolean;
  loader: boolean;
  isLoading: boolean;
  constructor(private router: Router,private commonService: CommonService,private webSocketService:WebSocketService) { }

  ngOnInit(): void {
    this.fetchPosts();

    this.webSocketService.messages$.subscribe((message: string) => {
      if (message == "LOAD_ARTICLE") {
        this.fetchPosts();
      }
    });
    // this.fetchPosts();
  }

  fetchPosts(): void {
    this.loader = true;
    this.commonService.getAllPublishedArticle().subscribe(
      data => {
        this.spinner = false;
        this.loader = false;
        this.posts = data.map(article => ({
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
        this.isLoading = false;
        this.loader = false;
        this.spinner = false;
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
}
