import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/AuthService';
import { CartService } from 'src/app/shared/services/cart.service';
import { ItemService } from 'src/app/shared/services/item.service';
import { UserService } from 'src/app/shared/services/user.service';


export interface User{
  email:String,
  mdp:String
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  status=1;
  idArticle: any;
  orderSize:any=1;
  stockQuantity: number = 1; // Replace this with the actual stock quantity from your data
  showBanned: boolean = false;
  item: any;
  selectedSize: string = 'M';
  selectedSide: string = 'front'; // Initialize with the default side ('front' or 'back')

  user:User={
    email:"",
    mdp:""
  }

  authenticated:boolean=false;
  constructor(private activatedRoute:ActivatedRoute, private userService:UserService, private cartService:CartService,
          private router:Router,private itemService: ItemService, private authService:AuthService){  }


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
          this.closeModal();
        })
      }else{
        this.userService.signup(this.user).subscribe( data => {
          let jwt:any = data['jwtToken'];
          localStorage.setItem("JWT",jwt);
          this.closeModal();
        })
      }
    }
  }

}
