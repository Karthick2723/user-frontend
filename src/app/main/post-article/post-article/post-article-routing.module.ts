import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostArticleComponent } from './post-article.component';

const routes: Routes = [
  {
    path: '',
    component: PostArticleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostArticleRoutingModule { }
