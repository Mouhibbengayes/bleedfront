import { Component, HostListener } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { CartService } from '../app/shared/services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  showSidebar: boolean = true;
  mobileSidebarShown: boolean = false;
  countItems: any = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let currentRoute = this.activatedRoute;
        while (currentRoute.firstChild) {
          currentRoute.firstChild.data.subscribe((data) => {
            this.showSidebar = data['showSidebar'] !== false;
          });
          currentRoute = currentRoute.firstChild;
        }
      }
    });
  }

  ngOnInit() {
    this.cartService.cartItemsCount().subscribe(data => {
      this.countItems = data;
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const sidebarElement = document.getElementById('sidebar');
    const toggleMenuElement = document.getElementById('toggleMenu');

    if (
      this.mobileSidebarShown &&
      sidebarElement &&
      !sidebarElement.contains(event.target as Node) &&
      toggleMenuElement &&
      !toggleMenuElement.contains(event.target as Node)
    ) {
      this.closeMenu();
    }
  }

  openMenu() {
    if (this.mobileSidebarShown) {
      this.closeMenu();
    } else {
      this.mobileSidebarShown = true;
      document.getElementById('sidebar').style.display = 'block';
      document.getElementById('sidebar').classList.add('show');
      document.getElementById('sidebar').classList.remove('hide');
      document.getElementById('toggleMenu').style.display = 'none';
      document.getElementById('closeMenu').style.display = 'block';
     
      const sidebarElements = document.querySelectorAll('.sidebar .nav-element');
      sidebarElements.forEach(element => {
      element.addEventListener('click', () => this.closeMenu());
    });
    }
  }

  closeMenu() {
    this.mobileSidebarShown = false;
    document.getElementById('sidebar').classList.add('hide');
    document.getElementById('sidebar').classList.remove('show');
    document.getElementById('toggleMenu').style.display = 'block';
    document.getElementById('closeMenu').style.display = 'none';
  }
}
