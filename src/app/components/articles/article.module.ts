import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { articleEntries } from "./article.entries";
import { ArticleRendererComponent } from "./article.renderer.component";
import {MatCardModule} from '@angular/material/card';

@NgModule({
    imports: [
        CommonModule,
        MatCardModule
    ],
    declarations: [
        ...articleEntries,
        ArticleRendererComponent
    ],
    exports: [
        ArticleRendererComponent,
        ...articleEntries
    ]
})


export class ArticleModule { }
