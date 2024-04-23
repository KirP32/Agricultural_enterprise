import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'

interface carouselImages {
  imageSrc: string,
}

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent implements OnInit {
  @Input() images: carouselImages[] = []
  selectedIndex = 0;
  ngOnInit(): void {
    
  }
  leftClicked() : void {
    if (this.selectedIndex === 0) this.selectedIndex = this.images.length - 1;
    else {this.selectedIndex--;}
  }
  rightClicked() : void {
    if (this.selectedIndex === this.images.length - 1) this.selectedIndex = 0;
    else {this.selectedIndex++;}
  } 
  dotClicked(index: number): void {
    this.selectedIndex = index;
  }
}
