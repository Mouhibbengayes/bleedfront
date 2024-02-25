import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/AuthService';
import { CartService } from 'src/app/shared/services/cart.service';
import { ItemService } from 'src/app/shared/services/item.service';
import { UserService } from 'src/app/shared/services/user.service';
import { NgToastService } from 'ng-angular-popup';

export interface itemToCart{
  quantity:number,
  idUser:number,
  idItem:number,
  size:string
}

export interface User{
  email:String,
  mdp:String
}

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.css']
})
export class DetailOldArticleComponent {
  idArticle: any;
  orderSize:any=1;
  stockQuantity: number = 1; // Replace this with the actual stock quantity from your data
  showBanned: boolean = false;
  item: any;
  selectedSize: string = 'M';
  selectedSide: string = 'front'; // Initialize with the default side ('front' or 'back')

  status=1;
  user:User={
    email:"",
    mdp:""
  }

  authenticated:boolean=false;
  constructor(private activatedRoute:ActivatedRoute, private userService:UserService, private cartService:CartService,
          private router:Router,private itemService: ItemService, private authService:AuthService,private toast: NgToastService){  }

  ngOnInit(){
    
    if(this.authService.isAuthenticated()){
      this.authenticated=true;
    }
    this.switchConnectionType();
    this.activatedRoute.params.subscribe( params => {
      this.idArticle=params['idArticle'];
      this.itemService.getItem(this.idArticle).subscribe( itemData => {
        this.item = itemData;
        console.log(this.item);
      })
    })

  }

  validateCart(){
    if(this.authenticated){
      this.router.navigateByUrl("/cart");
    }else{
      document.getElementById("signin_modal").style.display="block";
    }
  }

  incrementOrder(){
    if(this.orderSize>0 && (this.orderSize<=3 && this.orderSize<=this.item.stock-1)){
      this.orderSize++;
    }
  }


  decrementOrder(){
    if(this.orderSize>=2 && (this.orderSize<=4 && this.orderSize<=this.item.stock)){
      this.orderSize--;
    }
  }

  showBannedIcon() {
    if (this.stockQuantity === 0) {
      this.showBanned = true;
    }
  }

  hideBannedIcon() {
    this.showBanned = false;
  }

  addToCart(){
    let itemToCart:itemToCart={
      idItem:this.idArticle,
      idUser:this.authService.getDecoded()['user'],
      quantity:this.orderSize,
      size: this.selectedSize // Include the selected size when adding to cart
    }
    this.cartService.addToCart(itemToCart).subscribe(data => {
      window.location.reload();
    })
  }

  switchConnectionType(){
    if(this.status==0){
      this.status=1;
      document.getElementById("modal_btn").innerHTML="Switch To LOGIN";
      document.getElementById("action_btn").innerHTML="CREATE AN ACCOUNT";
    }else{
      this.status=0;
      document.getElementById("modal_btn").innerHTML="Switch to Create An Account";
      document.getElementById("action_btn").innerHTML="LOGIN";
    }
  }

  closeModal(){
    document.getElementById("signin_modal").style.display="none";
  }


  formAction(){
    if(!this.authenticated){
      if(this.status==0){
        this.userService.authenticate(this.user).subscribe( data => {
          let jwt:any = data['jwtToken'];
          localStorage.setItem("JWT",jwt);
          this.toast.success({detail:"SUCCESS",summary:'Your Success Message',duration:5000}); 
          this.closeModal();
          this.addToCart();
        })
      }else{
        this.userService.signup(this.user).subscribe( data => {
          let jwt:any = data['jwtToken'];
          localStorage.setItem("JWT",jwt);
          this.closeModal();
          this.addToCart();
        })
      }
    }
  }
  showFrontSide() {
    this.selectedSide = 'front';
  }

  showBackSide() {
    this.selectedSide = 'back';
  }
 

}
