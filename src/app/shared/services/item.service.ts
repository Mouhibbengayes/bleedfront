import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private http: HttpClient) {}

  addItem(item:any){
    return this.http.post("http://localhost:8001/bleed/item/add",item) .pipe(map((response: Response) => response))
  }

  getItems(){
    return this.http.get("http://localhost:8001/bleed/item/browse") .pipe(map((response: Response) => response))
  }

  getItem(idArticle: any) {
    return this.http.get("http://localhost:8001/bleed/item/detail/"+idArticle) .pipe(map((response: Response) => response))
  }

  ApplyDiscount (discountRequest: any) {
    return this.http.post('http://localhost:8001/bleed/item/applyDiscount', discountRequest, { responseType: 'text' });  }
  


}
