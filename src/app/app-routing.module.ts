import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowAllArticleComponent } from './core/article/show-all-article/show-all-article.component';
import { DetailArticleComponent } from './core/article/detail-article/detail-article.component';
import { LandingPageComponent } from './core/landing-page/landing-page.component';
import { CartComponent } from './core/cart/cart.component';
import { CheckoutComponent } from './core/cart/checkout/checkout.component';
import { BackofficeComponent } from './backoffice/backoffice.component';
import { AuthGuard } from './shared/Guards/Authguard';
import { LoginComponent } from './shared/login/login.component';
import { ShowAllOldArticleComponent } from './core/oldArticles/show-all-article/show-all-article.component';
import { DetailOldArticleComponent } from './core/oldArticles/detail-article/detail-article.component';
import { AboutusComponent } from './shared/aboutus/aboutus.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component:ShowAllArticleComponent},
  { path: 'detail/:idArticle', component:DetailArticleComponent},
  { path: 'cart', component:CartComponent},
  { path: 'checkout', component:CheckoutComponent},
  { path: 'landing', component: LandingPageComponent, data: { showSidebar: false } },
  { path: 'back', component: BackofficeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'articles', component: ShowAllOldArticleComponent },
  { path: 'detail/:idArticle', component:DetailOldArticleComponent},
  { path: 'Aboutus', component:AboutusComponent}




];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
