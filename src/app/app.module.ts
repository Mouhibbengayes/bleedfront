import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ShowAllArticleComponent } from './core/article/show-all-article/show-all-article.component';
import { DetailArticleComponent } from './core/article/detail-article/detail-article.component';
import { LandingPageComponent } from './core/landing-page/landing-page.component';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { ItemService } from './shared/services/item.service';
import { UserService } from './shared/services/user.service';
import { AuthService } from './shared/services/AuthService';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './shared/services/tokenInterceptor';
import { CartService } from './shared/services/cart.service';
import { CartComponent } from './core/cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './core/cart/checkout/checkout.component';
import { BackofficeComponent } from './backoffice/backoffice.component';
import { AuthGuard } from './shared/Guards/Authguard';
import { LoginComponent } from './shared/login/login.component';
import { ShowAllOldArticleComponent } from './core/oldArticles/show-all-article/show-all-article.component';
import { DetailOldArticleComponent } from './core/oldArticles/detail-article/detail-article.component';
import { AboutusComponent } from './shared/aboutus/aboutus.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgToastModule } from 'ng-angular-popup' // to be added


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ShowAllArticleComponent,
    DetailArticleComponent,
    LandingPageComponent,
    CartComponent,
    CheckoutComponent,
    BackofficeComponent,
    LoginComponent,
    ShowAllOldArticleComponent,
    DetailOldArticleComponent,
    AboutusComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    NgToastModule
  ],
  providers: [
    JwtHelperService,AuthService,UserService,ItemService,CartService,AuthGuard,
    {
     provide: HTTP_INTERCEPTORS,
     useClass: TokenInterceptor,
     multi: true
    },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
