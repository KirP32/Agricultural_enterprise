import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
@Component({
  selector: 'app-finances',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatButtonToggleModule],
  templateUrl: './finances.component.html',
  styleUrl: './finances.component.scss'
})
export class FinancesComponent implements OnInit {
  constructor(private httpClient: HttpClient) { }
  containerWidth: number = 0;
  isAnimated: boolean = false;
  array = <any>[];

  ngOnInit(): void {
    const buttons = document.querySelectorAll('.item__container__button');
   buttons.forEach((button, index) => {
    button.addEventListener('click', () => this.showChoosen(index));
   });
  }
  showChoosen(i: number): void {
    this.httpClient.get<any[]>(environment.api + `entry/${i}`).subscribe(
      (response) => {
        this.array = response;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
    this.loadElements(i);
  }
  loadElements(i: number): void {
    let string = "";
    switch (i) {
      case 0:
      case 1:
        string = "Затраты";
        break;
      case 2:
      case 3:
        string = "Выручка";
        break;
      case 4:
        string = "Прибыль";
    }
  }
  edit_item(item: any): void {

  }
 
}
