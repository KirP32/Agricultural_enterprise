import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { EmployeEditComponent } from '../Dialogs/employe-edit/employe-edit.component';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-career',
  standalone: true,
  imports: [MatButtonModule, CommonModule],
  templateUrl: './career.component.html',
  styleUrl: './career.component.scss'
})
export class CareerComponent {
  array = <any>[];
  array_employe = <any>[];
  flag1 = false;
  constructor(private httpClient: HttpClient,
    private dialog: MatDialog,) {

  }
  showCash(): void {
    this.httpClient.get<any[]>(environment.api + `entry/${8}`).subscribe(
      (response) => {
        this.array = response;
        this.array_employe = null;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  showEmploye(): void {
    this.httpClient.get<any[]>(environment.api + `entry/${9}`).subscribe(
      (response) => {
        this.array_employe = response;
        this.array = null;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  changeEmploye(item: any): void {
    if (this.flag1) {
      this.flag1 = false;
    }
    else {
      const dialogRef = this.dialog.open(EmployeEditComponent, { data: item });
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result) {
          this.edit_item_interface(result).subscribe({
            next: () => {
              this.showEmploye();
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
    return this.httpClient.put<any>(environment.api + `employe/${item.id}`, JSON.stringify(item), { headers: { 'Content-Type': 'application/json' } })
  }
  addEmploye(): void {
    const dialogRef = this.dialog.open(EmployeEditComponent);
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.create_item_interface(result).subscribe({
          next: () => {
            this.showEmploye();
          },
          error: (_: any) => {
            alert(_);
          }
        });
      }
    });

  }
  create_item_interface(item: any): any {
    return this.httpClient.post<any>(environment.api + `employe`, JSON.stringify(item), { headers: { 'Content-Type': 'application/json' } })
  }
  deleteitem(item: any): void {
    this.flag1 = true;
    let str = ``;
    str = `Вы точно хотите удалить запись? \n ${item["Фамилия"] + " " + item["Имя, отчество"]} \n Номер телефона: ${item["Номер телефона"]} \n Должность: ${item["Должность"]}`
    const verife = confirm(str);
    if (verife) {
      this.delete_help(item).subscribe({
        next: () => {
          this.showEmploye();
        },
        error: (_: any) => {
          alert(_);
        }
      });
    }
  }
  delete_help(item: any): Observable<any> {
    return this.httpClient.delete(environment.api + `employe/${item["Идентификатор"]}`)
  }
}

