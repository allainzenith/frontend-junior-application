import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { articleEntries } from "./article.entries";
import { ArticleRendererComponent } from "./article.renderer.component";
import {MatCardModule} from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        FlexLayoutModule
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
