import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-edit',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, CommonModule],
  templateUrl: './item-edit.component.html',
  styleUrl: './item-edit.component.scss'
})
export class ItemEditComponent implements OnInit {
  public cost = new FormGroup({
    cost_info: new FormControl<string>('', Validators.required),
    cost_price: new FormControl<number>(0, [Validators.required, Validators.min(0)]),
    cost_time: new FormControl<string>('', Validators.required),
    cost_section: new FormControl<number>(0, [Validators.required]),
    cost_animal_id: new FormControl<number>(0, [Validators.required, Validators.min(0)]),
  });
  constructor(
    public dialogRef: MatDialogRef<ItemEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.cost.get('cost_section')?.valueChanges.subscribe(value => {
      if (!this.data.indexes.includes(value)) {
        this.cost.get('cost_section')?.setErrors({ 'notInArray': true });
      } else {
        this.cost.get('cost_section')?.setErrors(null);
      }
    });
  }
  ngOnInit(): void {
    let str = "";
    if (this.data.item && this.data.item["Идентификатор"] != 9999) {
      this.cost.get('cost_info')?.setValue(this.data.item["Описание"]);
      this.cost.get('cost_price')?.setValue(this.data.item["Сумма"]);
      str = this.formatDate(this.data.item["Дата"]);
      if (str == "2030-02-03") {
        str = ``;
      }
      this.cost.get('cost_time')?.setValue(str);
      this.cost.get('cost_section')?.setValue(this.data.item["Секция_Идентификатор"]);
      this.cost.get('cost_animal_id')?.setValue(this.data.item["Животное_Идентификатор"]);
    }
  }
  onOK(): void {
    if (this.data.item["Идентификатор"] != 9999) {
      this.onEdit();
    }
    else {
      this.onOkClick();
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  formatDate(rawDate: string): string {
    const date = new Date(rawDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  onEdit(): void {
    let element = {
      id: this.data.item["Идентификатор"],
      info: this.cost.get("cost_info")?.value ?? '',
      price: this.cost.get("cost_price")?.value ?? '',
      time: this.cost.get("cost_time")?.value ?? '',
      section: this.cost.get("cost_section")?.value ?? '',
      animal: this.cost.get("cost_animal_id")?.value ?? '',
    }
    this.dialogRef.close(element);
  }
  onOkClick(): void {
    let element = {
      info: this.cost.get("cost_info")?.value ?? '',
      price: this.cost.get("cost_price")?.value ?? '',
      time: this.cost.get("cost_time")?.value ?? '',
      section: this.cost.get("cost_section")?.value ?? '',
      animal: this.cost.get("cost_animal_id")?.value ?? '',
    }
    this.dialogRef.close(element);
  }
  validateFnc(): boolean {
    if (this.data.item["Секция_Идентификатор"]) {
      return this.cost.get('cost_section')?.invalid ?? true;
    }
    else return false;
  }
}
