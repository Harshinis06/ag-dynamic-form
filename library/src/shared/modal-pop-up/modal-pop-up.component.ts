import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-modal-pop-up',
  standalone: true,
  imports: [
    MatLabel,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,MatDialogActions,CommonModule,MatInputModule],
  templateUrl: './modal-pop-up.component.html',
  styleUrl: './modal-pop-up.component.scss'
})
export class ModalPopUpComponent {
  readonly dialogRef = inject(MatDialogRef<ModalPopUpComponent>);
  readonly data = inject(MAT_DIALOG_DATA);
  
  close(){
    this.dialogRef.close({context:this.data.context});
  }
  save(){
    this.dialogRef.close({context:this.data.context});
  }
}
