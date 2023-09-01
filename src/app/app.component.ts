import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component,
  OnInit
} from '@angular/core';

import { ZyllemApiService } from "./app.service";
import { Article, VideoArticle } from './model/article';
import { ArticleType } from './model/article';
import { AbstractArticleComponent } from './components/articles/abstract.article.component';
import { Type } from "@angular/core";
import { ArticleFeatureComponent } from './components/articles/feature';
import { ArticleNormalComponent } from './components/articles/normal';
import { ArticleVideoComponent } from './components/articles/video';
import { registerArticle } from './components/articles/article.entries';
import { ArticleFeaturedAdComponent } from './components/articles/featured ad';

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

  get articles() {
    return this.filtered_results;
  }


  ngOnInit() {
    this.apiService.getArticles()
      .subscribe(result => {
        this.results = result;
        this.mapArticle(this.results);
        this.cdr.markForCheck();
        this.results = this.setVideoArticleHighlight();
        this.filtered_results = this.results;
      });
  }

  filterArticles() {
    if (this.selectedValue) {
      this.filtered_results = (this.selectedValue === "") ? this.results : this.results.filter(item => item.type === this.selectedValue);
    } else {
      this.filtered_results = this.results;
    }
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
            component = ArticleFeaturedAdComponent;
            break;
        default:
          throw new Error(`Unsupported article type: ${type}`);
      }

      registerArticle(type, component);
      
    }
  }

  private setVideoArticleHighlight() {
    const videoArticle = this.results.find(
      (article) => article.type === ArticleType.VIDEO
    );

    if (videoArticle) {
      this.videoArticleHighlight = videoArticle as VideoArticle;
      console.log(this.videoArticleHighlight)
    }

    return this.results.filter((item) => item !== videoArticle);
  }






  
}
