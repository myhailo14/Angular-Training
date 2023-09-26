import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-rent-term-dialog',
  templateUrl: './rent-term-dialog.component.html',
  styleUrls: ['./rent-term-dialog.component.css'],
})
export class RentTermDialogComponent {
  range: FormGroup;
  start: FormControl;
  end: FormControl;
  maxDate: Date;
  minDate: Date;

  constructor(
    public dialogRef: MatDialogRef<RentTermDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {
    const currentDate = new Date();
    this.minDate = currentDate;
    this.maxDate = new Date();
    this.maxDate.setDate(currentDate.getDate() + 30);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();

    this.range = new FormGroup({
      start: new FormControl<Date | null>(new Date(year, month, day)),
      end: new FormControl<Date | null>(null),
    });
    this.start = this.range.controls['start'] as FormControl;
    this.start.addValidators(Validators.required)
    this.end = this.range.controls['end'] as FormControl;
    this.end.addValidators(Validators.required)
  }

  onOkClick(): void {
    if(this.range.invalid){
      return;
    }
    const today = new Date();
    const end = this.end.value as Date;

    const timeDifference = end.getTime() - today.getTime();
    const dayDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
    this.data = dayDifference + 2;
    console.log(this.data);
    this.dialogRef.close(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
