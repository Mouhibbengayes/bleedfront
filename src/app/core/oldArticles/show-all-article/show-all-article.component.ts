import { Component, HostListener, ElementRef, ViewEncapsulation  } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from 'src/app/shared/services/item.service';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-show-all-article',
  templateUrl: './show-all-article.component.html',
  styleUrls: ['./show-all-article.component.css'],
})
export class ShowAllOldArticleComponent {

  isTitleVisible: boolean = false;
  isShopVisible: boolean = false;
  isPhraseVisible: boolean = false;
  videoPlayed: boolean = false;
  items: any;
  isArrowRotated: boolean = false;
  filteredItems: any[] = []; // Adjust the type based on your actual data type
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private elRef: ElementRef,private itemService:ItemService
    ) {

  }


  ngOnInit() {
    
    this.itemService.getItems().subscribe( data => {
      this.items = data;
      this.filterItems();
    })

    window.scrollTo(0, 0);
    this.play();
  }
  filterItems() {
    // Filter items where idItem > 7
    this.filteredItems = this.items.filter(item => item.idItem < 8);
  }

  
  
   
  play() {
    const videoElement = this.elRef.nativeElement.querySelector('#vid');
    if (videoElement) {
      videoElement.muted = true; // Set the video to be muted
      videoElement.play();
    }
  }

  navigateToArticle(idArticle: number) {
    this.router.navigate(['/detail', idArticle]);
  }



  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const scrollPosition = window.pageYOffset;
    const targetPosition = 400;


    if (scrollPosition >= targetPosition) {
      this.isArrowRotated = true;
    } else {
      this.isArrowRotated = false;
    }

    if (scrollPosition >= targetPosition) {
      document.getElementById("knife").classList.add("active");

    }else{
    }

    



    const targetPositionDTitle = 50;
    if (scrollPosition >= targetPositionDTitle) {
      this.isTitleVisible = true;
    }else{
    }

    const targetPositionDShop = 200;
    if (scrollPosition >= targetPositionDShop) {
      this.isShopVisible = true;
    }else{
    }

    const targetPositionDesc = 100;
    if (scrollPosition >= targetPositionDesc) {
      this.isPhraseVisible = true;
    }else{
    }

}



  showBackside(event: MouseEvent): void {
    const frontImage = (event.target as HTMLElement).closest('.element')?.querySelector('.front-image') as HTMLImageElement;
    const backImage = frontImage.nextElementSibling as HTMLImageElement;
    backImage.style.display = 'block';
  }
  
  hideBackside(event: MouseEvent): void {
    const frontImage = (event.target as HTMLElement).closest('.element')?.querySelector('.front-image') as HTMLImageElement;
    const backImage = frontImage.nextElementSibling as HTMLImageElement;
    backImage.style.display = 'none';
  }
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  onArrowClick(): void {
    if (this.isArrowRotated) {
      // Scroll to the top of the page
      this.scrollToTop();
    } else {
      // Scroll to the bottom of the page
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  }
}
