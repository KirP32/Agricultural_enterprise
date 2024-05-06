import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CarouselComponent } from "../carousel.component";

@Component({
  selector: 'app-my-component',
  standalone: true,
  templateUrl: './my-component.component.html',
  styleUrl: './my-component.component.scss',
  imports: [
    FormsModule,
    CommonModule,
    CarouselComponent
  ]
})
export class MyComponentComponent implements OnInit {
  items: any[] = [];
  inputValue: string = '';
  message: string = '';
  images = [
    {
      imageSrc: "../assets/images/ambar.jpg"
    },
    {
      imageSrc: "../assets/images/chikens.jpg"
    },
    {
      imageSrc: "../assets/images/cows.webp"
    },
    {
      imageSrc: "../assets/images/cows.jpg"
    }
  ]
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    //this.getItems();
  }

  showMessage(): void {
    this.message = this.inputValue;
  }

  getItems(): void {
    console.log("getItems Called");
    this.loadElements().subscribe(
      (response) => {
        this.items = response;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  public loadElements(): Observable<any[]> {
    console.log("loadElements called");
    return this.httpClient.get<any[]>(environment.api + 'items');
  }

}