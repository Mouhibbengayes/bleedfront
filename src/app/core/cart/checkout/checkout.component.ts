import { Component } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';




export interface UserCheckout{
  name:String,
  gouvernorat:String,
  ville:String,
  phone:String
}


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  userCheckoutForm: FormGroup;
  userCheckout:UserCheckout={
    gouvernorat:"",
    name:"",
    phone:"",
    ville:""
  }
  errorMessage: string = '';
  tunisianCities: string[] = [
    'Tunis',
    'Sfax',
    'Sousse',
    'Ettadhamen',
    'Kairouan',
    'Gabès',
    'Bizerte',
    // Add more cities here...
  ];
  cart: any;
  listCartItems: any;

  constructor(private cartService:CartService , private router:Router,private toast:NgToastService){

  }

  ngOnInit(){
    this.cartService.myCart().subscribe( response => {
      this.cart = response;
    })
    this.cartService.getCartItems().subscribe(data => {
      this.listCartItems = data;
    })
    
  }

  formatPhoneNumber(event: any): void {
    let inputValue = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters

    // Limit to 8 digits
    if (inputValue.length > 8) {
      inputValue = inputValue.slice(0, 8);
    }

    // Format the number with spaces
    if (inputValue.length >= 3) {
      inputValue = inputValue.slice(0, 2) + ' ' + inputValue.slice(2, 5) + ' ' + inputValue.slice(5, 8);
    }

    // Update the ngModel with the formatted value
    this.userCheckout.phone = inputValue;
  }

  removeElement(event:any){
    if(event==0){
      document.getElementById("return_card").style.display="none";
    }else if(event==1){
      document.getElementById("payment_card").style.display="none";
    }
  }


  checkout(){
    this.cartService.validateCart(this.userCheckout).subscribe(data => {
      this.toast.success({detail:"SUCCESS",summary:'Your Success Message',duration:5000,position:'topCenter'}); 
      setTimeout(() => {
        this.router.navigateByUrl("/home");
    }, 3000);
    })
  }
}
