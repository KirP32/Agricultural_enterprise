import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-breed-edit',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, CommonModule, MatButtonModule],
  templateUrl: './breed-edit.component.html',
  styleUrl: './breed-edit.component.scss'
})
export class BreedEditComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<BreedEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

  }
  public cost = new FormGroup({
    cost_info: new FormControl<string>('', Validators.required),
    cost_section: new FormControl<number>(0, [Validators.required, Validators.min(0)]),
    cost_sex: new FormControl<string>('', Validators.required),
    cost_number: new FormControl<string>('', [Validators.required]),
    cost_job: new FormControl<string>('', [Validators.required, Validators.min(0)]),
    cost_money: new FormControl<number>(0, [Validators.required, Validators.min(0)]),
  });

  ngOnInit(): void {
    if (this.data) {
      this.cost.get('cost_info')?.setValue(this.data["Идентификатор_Родитель"]);
      this.cost.get('cost_section')?.setValue(this.data["Порода"]);
      this.cost.get('cost_sex')?.setValue(this.data["Пол"]);
      let str = this.formatDate(this.data["Дата рождения"]);
      this.cost.get('cost_number')?.setValue(str);
      this.cost.get('cost_job')?.setValue(this.data["Здоровье"]);
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onOK(): void {
    if (this.data) {
      let element = {
        id: this.data["Идентификатор"],
        info: this.cost.get("cost_info")?.value ?? '',
        section: this.cost.get("cost_section")?.value ?? '',
        sex: this.cost.get("cost_sex")?.value ?? '',
        number: this.cost.get("cost_number")?.value ?? '',
        job: this.cost.get("cost_job")?.value ?? '',
      }
      this.dialogRef.close(element);
    }
    else {
      let element = {
        info: this.cost.get("cost_info")?.value ?? '',
        section: this.cost.get("cost_section")?.value ?? '',
        sex: this.cost.get("cost_sex")?.value ?? '',
        number: this.cost.get("cost_number")?.value ?? '',
        job: this.cost.get("cost_job")?.value ?? '',
      }
      this.dialogRef.close(element);
    }
  }
  formatDate(rawDate: string): string {
    const date = new Date(rawDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
