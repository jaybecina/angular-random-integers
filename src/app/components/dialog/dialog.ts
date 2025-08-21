import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog',
  imports: [CommonModule, MatDialogModule],
  templateUrl: './dialog.html',
  styleUrl: './dialog.css',
})
export class Dialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { number: number }) {}
}
