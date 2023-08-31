import { Component, Input } from "@angular/core";

import { FeaturedAdArticle, NormalArticle } from "src/app/model/article";
import { AbstractArticleComponent } from "../abstract.article.component";

@Component({
    selector: 'article-featured_ad-component',
    templateUrl: './article.featured_ad.component.html'
})
export class ArticleFeaturedAdComponent extends AbstractArticleComponent {
    @Input() article: FeaturedAdArticle;

}
