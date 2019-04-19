import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'contact-dialog',
  templateUrl: 'contact-dialog.component.html',
})
export class ContactDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ContactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onCancel(): void {
    this.dialogRef.close();
  }
  onOk(): void {
    this.dialogRef.close();
  }

}
