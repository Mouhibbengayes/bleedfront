import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/AuthService';
import { CartService } from 'src/app/shared/services/cart.service';
import { UserService } from 'src/app/shared/services/user.service';
import { NgToastService } from 'ng-angular-popup';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  listCartItems: any;
  authenticated:boolean=false;
  cart: any;
  constructor(private authService:AuthService, private userService:UserService, private cartService:CartService,
          private router:Router, private toast:NgToastService){}

  ngOnInit(){
    if(this.authService.isAuthenticated()){
      this.authenticated=true;
    }
    this.cartService.myCart().subscribe( response => {
      this.cart = response;
    })
    this.cartService.getCartItems().subscribe(data => {
      this.listCartItems = data;
    })
  }



  validateCart(){
    this.router.navigateByUrl("/checkout");
  }

  formAction(){
    this.router.navigateByUrl("/checkout");
  }
  cleanCart(): void {
    this.cartService.Cleancart().subscribe(
      (response: any) => {
        //  aman handly el expections
        console.log('Cart cleaned:', response);
        this.toast.success({detail:"SUCCESS",summary:'Cart cleaned',duration:5000,position:'topCenter'}); 
        setTimeout(() => {
          window.location.reload();
        }, 3000);

      },
      (error: any) => {
        // Handle error response if applicable
        console.error('Error cleaning cart:', error);
      }
    );
  }
 
}
