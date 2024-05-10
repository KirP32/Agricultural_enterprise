import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable } from 'rxjs';
import { BreedEditComponent } from '../Dialogs/breed-edit/breed-edit.component';
@Component({
  selector: 'app-offspring',
  standalone: true,
  imports: [MatButtonModule, CommonModule, MatInputModule, FormsModule, MatFormFieldModule],
  templateUrl: './offspring.component.html',
  styleUrl: './offspring.component.scss'
})
export class OffspringComponent {
  flag = false;
  array = <any>[];
  array_good = <any>[];
  array_bad = <any>[];
  array_verylow = <any>[];
  rez1 = <any>[];
  rez2 = <any>[];
  rez3 = <any>[];
  array_age = <any>[];
  message = `/message.txt`;
  constructor(private httpClient: HttpClient, private dialog: MatDialog) {

  }
  showHealh(): void {
    this.httpClient.get<any[]>(environment.api + `entry/${10}`).subscribe(
      (response) => {
        this.array = response;
        this.array_good = this.array[0]['Здоров'].split(', ');
        this.array_bad = this.array[0]['Болен'].split(', ');
        this.array_verylow = this.array[0]['Критическое состояние'].split(', ');
        this.rez1 = this.array_good;
        this.rez2 = this.array_bad;
        this.rez3 = this.array_verylow;
        const element = document.getElementById("changemargin");
        if (element) {
          element.style.marginTop = "155px";
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );

  }
  showAge(): void {
    this.httpClient.get<any[]>(environment.api + `entry/${11}`).subscribe(
      (response) => {
        this.array = response;
        this.rez1 = this.array;
        const element = document.getElementById("changemargin");
        if (element) {
          element.style.marginTop = "85px";
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  showRedacting(): void {
    this.httpClient.get<any[]>(environment.api + `entry/${12}`).subscribe(
      (response) => {
        this.array = response;
        this.rez1 = this.array;
        const element = document.getElementById("changemargin");
        if (element) {
          element.style.marginTop = "85px";
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  addBreed(): void {
    const dialogRef = this.dialog.open(BreedEditComponent);
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.create_item_interface(result).subscribe({
          next: () => {
            this.showRedacting();
          },
          error: (_: any) => {
            alert(_);
          }
        });
      }
    });

  }
  create_item_interface(item: any): any {
    return this.httpClient.post<any>(environment.api + `breed`, JSON.stringify(item), { headers: { 'Content-Type': 'application/json' } })
  }
  handleInput(): void {
    const inputElement = document.getElementById('myInput') as HTMLInputElement;
    if (inputElement) {
      const inputText = inputElement.value;
      this.findGood(inputText);
    } else {
      console.error('input not found');
    }
  }
  findGood(string: string): void {
    string = string.toLowerCase()
    let temple = <any>[];
    let temple2 = <any>[];
    let temple3 = <any>[];
    for (let i = 0; i < this.rez1.length; i++) {
      if (this.rez1[i].split('(ID: ')[0].toLowerCase().includes(string) || parseInt(this.rez1[i].split('(ID: ')[1]) == parseInt(string)) {
        temple.push(this.rez1[i]);
      }
    }
    for (let i = 0; i < this.rez2.length; i++) {
      if (this.rez2[i].split('(ID: ')[0].toLowerCase().includes(string) || parseInt(this.rez2[i].split('(ID: ')[1]) == parseInt(string)) {
        temple2.push(this.rez2[i]);
      }
    }
    for (let i = 0; i < this.rez3.length; i++) {
      if (this.rez3[i].split('(ID: ')[0].toLowerCase().includes(string) || parseInt(this.rez3[i].split('(ID: ')[1]) == parseInt(string)) {
        temple3.push(this.rez3[i]);
      }
    }
    this.array_good = temple;
    this.array_bad = temple2;
    this.array_verylow = temple3;
  }
  breedInput(): void {
    const inputElement = document.getElementById('breedInput') as HTMLInputElement;
    if (inputElement) {
      const inputText = inputElement.value;
      this.findBreed(inputText);
    } else {
      console.error('input not found');
    }
  }
  findBreed(string: string): void {
    string = string.toLowerCase()
    let temple = <any>[];
    for (let i = 0; i < this.rez1.length; i++) {
      if (this.rez1[i]['Порода'].toLowerCase().includes(string) || parseInt(this.rez1[i]['Идентификатор']) == parseInt(string)) {
        temple.push(this.rez1[i]);
      }
    }
    if (temple.length < 1) {
      temple.push(
        {
          "Идентификатор": "Совпадений нет",
          "Идентификатор_Родитель": "Совпадений нет",
          "Дата рождения": "00",
          "Пол": "",
          "Порода": "Совпадений нет",
          "Здоровье": "Совпадений нет"
        },
      );
    }
    this.array = temple;
  }
  formatDate(rawDate: string): string {
    const date = new Date(rawDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    if (rawDate == "00") { return `Совпадений нет` }
    return `${year}-${month}-${day}`;
  }
  changebreed(item: any): void {
    if (this.flag) {
      this.flag = false;
    }
    else {
      const dialogRef = this.dialog.open(BreedEditComponent, { data: item });
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result) {
          this.edit_item_interface(result).subscribe({
            next: () => {
              this.showRedacting();
            },
            error: (_: any) => {
              alert(_);
            }
          });
        }
      });
    }

  }
  edit_item_interface(item: any): any {
    return this.httpClient.put<any>(environment.api + `breed/${item.id}`, JSON.stringify(item), { headers: { 'Content-Type': 'application/json' } })
  }
  deleteitem(item: any): void {
    this.flag = true;
    let str = ``;
    str = `Вы точно хотите удалить запись? \n ${item["Идентификатор"] + " " + item["Порода"] + `(${item["Пол"]})`} \n Идентификатор: ${item["Идентификатор"]} \n Здоровье: ${item["Здоровье"]}`
    const verife = confirm(str);
    if (verife) {
      this.delete_help(item).subscribe({
        next: () => {
          this.showRedacting();
        },
        error: (_: any) => {
          alert(_);
        }
      });
    }
  }
  delete_help(item: any): Observable<any> {
    return this.httpClient.delete(environment.api + `breed/${item["Идентификатор"]}`)
  }
  ageInput(): void {
    const inputElement = document.getElementById('ageInput') as HTMLInputElement;
    if (inputElement) {
      const inputText = inputElement.value;
      this.findAge(inputText);
    } else {
      console.error('input not found');
    }
  }
  findAge(string: string): void {
    string = string.toLowerCase()
    let temple = <any>[];
    for (let i = 0; i < this.rez1.length; i++) {
      if (this.rez1[i]['Порода'].toLowerCase().includes(string) || parseInt(this.rez1[i]['Идентификатор']) == parseInt(string)) {
        temple.push(this.rez1[i]);
      }
    }
    if (temple.length < 1) {
      temple.push(
        {
          "Идентификатор": "Совпадений нет",
          "Дата рождения": "00",
          "Порода": "Совпадений нет",
          "Лет": "нет",
          "Месяцев": "нет",
        },
      );
    }
    this.array = temple;
  }
  print_doc(): void {
    this.post_report(this.array).subscribe({
      next: () => {
        const download = (path: string, filename: string) => {
          const link = document.createElement('a');
          link.href = path;
          link.download = filename;

          link.dispatchEvent(new MouseEvent('click'));
        };
        download('/assets/report.xlsx', 'Report.xlsx');
      },
      error: (_: any) => {
        alert(_);
      }
    });
  }
  post_report(item: any): any {
    console.log('post report called');
    return this.httpClient.post<any>(environment.api + `report`, JSON.stringify(item), { headers: { 'Content-Type': 'application/json' } })
  }
}
