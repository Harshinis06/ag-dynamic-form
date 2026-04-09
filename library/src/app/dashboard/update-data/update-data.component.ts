import { Component, ElementRef, inject, Input, NgModule, OnChanges, OnInit, ViewChild } from '@angular/core';
import { CommonModule, DatePipe, NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ModalPopUpComponent } from '../../../shared/modal-pop-up/modal-pop-up.component';


@Component({
  selector: 'app-update-data',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule,
    MatSelectModule, MatDatepickerModule, MatNativeDateModule,NgIf,ModalPopUpComponent],
    providers: [MatDatepickerModule],
  templateUrl: './update-data.component.html',
  styleUrl: './update-data.component.scss'
})
export class UpdateDataComponent {
  ngOnChanges() {
    console.log('Filtered Member:', this.filteredMember);
    console.log('Status Options:', this.statusOptions);
  }
 @Input() filteredMember: any={};
 @Input() statusOptions: any[] = [];
}
