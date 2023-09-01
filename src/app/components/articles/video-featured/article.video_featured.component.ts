import { Component, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

import { VideoArticle } from "src/app/model/article";
import { AbstractArticleComponent } from "../abstract.article.component";

@Component({
    selector: 'article-video_featured-component',
    templateUrl: './article.video_featured.component.html',
    styleUrls: ['./article.video_featured.component.scss']
})
export class ArticleVideoFeaturedComponent extends AbstractArticleComponent {

    @Input() article: VideoArticle;

    get safeVideoUrl() {
        return this.domSanitize.bypassSecurityTrustResourceUrl(this.article.videoUrl);
    }

    constructor(
        private readonly domSanitize: DomSanitizer
    ) {
        super();
    }

}