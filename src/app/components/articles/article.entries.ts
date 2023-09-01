import { Type } from "@angular/core";
import { ArticleType } from "src/app/model/article";
import { AbstractArticleComponent } from "./abstract.article.component";
import { articleMapper } from "./article.mapper";
import { ArticleFeatureComponent } from "./feature/article.feature.component";
import { ArticleNormalComponent } from "./normal/article.normal.component";
import { ArticleVideoComponent } from "./video/article.video.component";
import { ArticleFeaturedAdComponent } from "./featured ad";
import { ArticleVideoFeaturedComponent } from "./video-featured";

export const articleEntries: Type<AbstractArticleComponent>[] = [
    ArticleFeatureComponent,
    ArticleNormalComponent,
    ArticleVideoComponent,
    ArticleFeaturedAdComponent,
    ArticleVideoFeaturedComponent
];

export const registerArticle = (articleType: ArticleType, component: Type<AbstractArticleComponent>) => {
    if (!articleEntries.includes(component)) {
        throw new Error(`${component} is not yet registered.`);
    }

    articleMapper.set(articleType, component);
};



