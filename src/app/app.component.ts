import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component,
  OnInit
} from '@angular/core';

import { ZyllemApiService } from "./app.service";
import { Article, NormalArticle, VideoArticle } from './model/article';
import { ArticleType } from './model/article';
import { AbstractArticleComponent } from './components/articles/abstract.article.component';
import { Type } from "@angular/core";
import { ArticleFeatureComponent } from './components/articles/feature';
import { ArticleNormalComponent } from './components/articles/normal';
import { ArticleVideoComponent } from './components/articles/video';
import { registerArticle } from './components/articles/article.entries';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

  selectedValue: String = '';

  constructor(
    private readonly apiService: ZyllemApiService,
    private readonly cdr: ChangeDetectorRef,
  ) { }

  private results: Article[];
  filtered_results: Article[];

  videoArticleHighlight: VideoArticle;
  normalArticle: NormalArticle;

  get articles() {
    return this.results;
  }

  ngOnInit(): void {
    this.apiService.getArticles()
    .subscribe(result => {
      this.results = result;
      this.mapArticle(this.results);
      this.cdr.markForCheck();
      this.filtered_results = this.results;
    });

  }

  private mapArticle(results:Article[]){
    for (const result of results) {
      const { type } = result;
    
      let component: Type<AbstractArticleComponent>;

      switch (type) {
        case ArticleType.NORMAL:
          component = ArticleNormalComponent;
          break;
        case ArticleType.FEATURED:
          component = ArticleFeatureComponent;
          break;
        case ArticleType.VIDEO:
          component = ArticleVideoComponent;
          break;
        case ArticleType.FEATURED_AD:
            component = ArticleFeatureComponent;
            break;
        default:
          throw new Error(`Unsupported article type: ${type}`);
      }

      registerArticle(type, component);
      
    }
  }

  filterArticles(){
    if (this.selectedValue) {
      this.filtered_results = this.results.filter(item => item.type === this.selectedValue);
      console.log(this.filtered_results)
    } else {
      console.log(this.results)
    }
  }
  
}
