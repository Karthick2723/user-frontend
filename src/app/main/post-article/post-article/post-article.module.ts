import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PostArticleRoutingModule } from './post-article-routing.module';
import { PostArticleComponent } from './post-article.component';


@NgModule({
  declarations: [PostArticleComponent],
  imports: [
    CommonModule,
    PostArticleRoutingModule,
    ReactiveFormsModule
  ]
})
export class PostArticleModule { }
