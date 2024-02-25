import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http: HttpClient) {}

  getCartItems(){
    return this.http.get("http://localhost:8001/bleed/cart/items") .pipe(map((response: Response) => response))
  }

  validateCart(userCheckout:any){
    return this.http.post("http://localhost:8001/bleed/cart/validate",userCheckout) .pipe(map((response: Response) => response))
  }

  myCart() {
    return this.http.get("http://localhost:8001/bleed/cart/mycart") .pipe(map((response: Response) => response))
  }

  cartItemsCount() {
    return this.http.get("http://localhost:8001/bleed/cart/itemsincart") .pipe(map((response: Response) => response))
  }

  addToCart(itemToCart:any) {
    return this.http.post("http://localhost:8001/bleed/panier/add",itemToCart) .pipe(map((response: Response) => response))
  }

  GetCommand(){
    return this.http.get ("http://localhost:8001/bleed/api/commandes/") .pipe(map((response: Response) => response))
  }
  Cleancart(){
    return this.http.get ("http://localhost:8001/bleed/cart/emptycart") .pipe(map((response: Response) => response))
  }
}
