import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemService } from '../shared/services/item.service';

interface Command {
  dateCommand: string;
  gouvernerant: string;
  fullName: string;
  phone: string;
  totalPrice: number;
  ville: string;
  cartItems: CartItem[];
  isChecked: boolean; // Add isChecked property
}

interface CartItem {
  itemName: string;
  size: string;
  quantity: number;
  isChecked: boolean; // Add isChecked property
}


@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.css']
})
export class BackofficeComponent implements OnInit {
  commands: Command[] = [];
  pageSize = 5;
  currentPage = 1;
  pagedCommands: Command[] = [];
  pages: number[] = [];
  selectedSection: 'command' | 'addProduct' = 'command'; // Default selected section
  product: any = {
    idItem: 0,
    nomItem: '',
    descItem: '',
    itemPrice: 0,
    stock: 0,
    discountPercentage : 0,
  };
  discountRequest : any = {
    itemId: 0,
    discountPercentage: 0,
  }
  

  constructor(private http: HttpClient , private itemService : ItemService) {}

  ngOnInit(): void {
    this.populateTableData();
  }
  addProduct(): void {
   
    this.itemService.addItem(this.product)
      .subscribe((response: any) => {
        console.log('Product added successfully!', response);
        this.product = {
          idItem: 0,
          nomItem: '',
          descItem: '',
          itemPrice: 0,
          stock: 0,
          discountPercentage : 0
        };
      }, (error: any) => {
        console.error('Error adding product:', error);
      });
  }

  applyDiscount() : void {
    this.itemService.ApplyDiscount(this.discountRequest).
    subscribe((response: any) => {
      console.log ('discount added ', response);
      this.discountRequest = {
        itemId: 0,
        discountPercentage: 0,
      };
    }, (error : any) => {
      console.error('error adding ', error);
    });
    
  }

  populateTableData(): void {
    this.http.get<any[]>('http://localhost:8001/bleed/api/commandes')
      .subscribe(commands => {
        this.commands = commands.map(command => ({
          dateCommand: command.dateCommande,
          gouvernerant: command.gouvernorat,
          fullName: command.name,
          phone: command.phone,
          totalPrice: command.totalPrice,
          ville: command.ville,
          isChecked: false,
          cartItems: command.cartItems.map((cartItem: any) => ({
            itemName: cartItem.itemName,
            size: cartItem.size,
            quantity: cartItem.quantity,
            isChecked: false
          })),
        }));

        this.paginateData();
        this.calculatePages();
      });
  }

  paginateData(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedCommands = this.commands.slice(startIndex, endIndex);
  }

  calculatePages(): void {
    const totalPages = Math.ceil(this.commands.length / this.pageSize);
    this.pages = Array(totalPages).fill(0).map((x, i) => i + 1);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateData();
    }
  }

  nextPage(): void {
    const totalPages = Math.ceil(this.commands.length / this.pageSize);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.paginateData();
    }
  }

  setCurrentPage(page: number): void {
    this.currentPage = page;
    this.paginateData();
  }

  toggleCrossedOut(command: Command): void {
    command.isChecked = !command.isChecked;
    command.cartItems.forEach(item => {
      item.isChecked = command.isChecked;
    });
  }
  navigateTo(section: 'command' | 'addProduct'): void {
    this.selectedSection = section;
  }
}
