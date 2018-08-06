import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import { AsyncComponent } from './async.component';
import { ObservComponent } from './observ.component';

const paths = [
  {path: 'observ', component: ObservComponent},
  {path: 'async', component: AsyncComponent},
  {path: '', redirectTo: 'observ', pathMatch: 'full'},
  {path: '**', redirectTo: 'observ', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    AsyncComponent,
    ObservComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(paths)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
