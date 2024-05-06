import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-employe-edit',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, CommonModule],
  templateUrl: './employe-edit.component.html',
  styleUrl: './employe-edit.component.scss'
})
export class EmployeEditComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EmployeEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

  }
  public cost = new FormGroup({
    cost_info: new FormControl<string>('', Validators.required),
    cost_section: new FormControl<number>(0, [Validators.required, Validators.min(0)]),
    cost_sex: new FormControl<string>('', Validators.required),
    cost_number: new FormControl<number>(0, [Validators.required]),
    cost_job: new FormControl<string>('', [Validators.required, Validators.min(0)]),
    cost_money: new FormControl<number>(0, [Validators.required, Validators.min(0)]),
  });

  ngOnInit(): void {
    if (this.data) {
      this.cost.get('cost_info')?.setValue(this.data["Фамилия"] + " " + this.data["Имя, отчество"]);
      this.cost.get('cost_section')?.setValue(this.data["Секция"]);
      this.cost.get('cost_sex')?.setValue(this.data["Пол"]);
      this.cost.get('cost_number')?.setValue(this.data["Номер телефона"]);
      this.cost.get('cost_job')?.setValue(this.data["Должность"]);
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

}
