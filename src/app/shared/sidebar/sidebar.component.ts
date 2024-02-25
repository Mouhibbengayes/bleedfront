import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  itemsInCart=0;
  cart: any;
  countItems: any=0;
  isDropDownVisible: boolean = false;

  constructor(private cartService:CartService){

  }

  ngOnInit(){
    this.cartService.cartItemsCount().subscribe(data => {
      this.countItems = data;
    })
  }
  toggleDropDown(event: MouseEvent): void {
    event.stopPropagation();
    this.isDropDownVisible = !this.isDropDownVisible;
  }

}
