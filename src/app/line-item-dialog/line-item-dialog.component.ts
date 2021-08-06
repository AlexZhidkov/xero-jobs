import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-line-item-dialog',
  templateUrl: './line-item-dialog.component.html',
  styleUrls: ['./line-item-dialog.component.css']
})
export class LineItemDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<LineItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
