import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DropdownModule } from "ngx-dropdown";

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { AttractionsComponent } from './attractions/attractions.component';
import { ArtComponent } from './art/art.component';
import { EntertainmentsComponent } from './entertainments/entertainments.component';
import { HomeComponent } from './home/home.component';

import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { fakeBackendProvider } from './_helpers/fake-backend';

import { ErrorInterceptor } from './_helpers/error.interceptor';
import { JwtInterceptor } from './_helpers/jwt.interceptor';

import { LoginComponent } from './login/login.component';
import { SelfcareComponent } from './selfcare/selfcare.component';
import { LimitToPipe } from './pipes/LimitTo.pipe';
import { ArticleComponent } from './article/article.component';
import { PageArticlesComponent } from './page-articles/page-articles.component';

const appRoutes: Routes = [
  { path: 'news/:id', component: HomeComponent },
  { path: 'attractions/:id', component: AttractionsComponent },
  { path: 'attractions', component: AttractionsComponent },
  { path: 'art/:id', component: ArtComponent },
  { path: 'art', component: ArtComponent },
  { path: 'entertainments/:id', component: EntertainmentsComponent },
  { path: 'entertainments', component: EntertainmentsComponent },
  { path: 'selfcare', component: SelfcareComponent },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'article/:articleCategory/:articleName', component: ArticleComponent },
  { path: 'articles/:articleCategory/:articleName', component: PageArticlesComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AttractionsComponent,
    ArtComponent,
    EntertainmentsComponent,
    HomeComponent,
    LoginComponent,
    SelfcareComponent,
    LimitToPipe,
    ArticleComponent,
    PageArticlesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DropdownModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),

    ReactiveFormsModule,
    // routing
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
