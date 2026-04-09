import { Component, ElementRef, inject, Input, NgModule, OnChanges, OnInit, ViewChild } from '@angular/core';
import { BookServiceService } from '../../services/books.service';
import { forkJoin, Observable } from 'rxjs';
import { Books } from '../../models/Books';
import { CommonModule, DatePipe, NgIf } from '@angular/common';
import { SummeryCardsComponent } from '../../shared/summery-cards/summery-cards.component';
import { MembersService } from '../../services/members.service';
import { Member } from '../../models/Member';
import { cards } from '../../models/cards';
import { ClientAgGridComponent } from '../../shared/client-ag-grid/client-ag-grid.component';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DeleteCellRenderer } from '../../shared/deleteRendere.component';
import { MatButtonModule } from '@angular/material/button';
import { dashboardCardDefinitions } from './dashboard-cards.config';
import { UpdateRenderer } from '../../shared/updateRenderer.component';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { ModalPopUpComponent } from '../../shared/modal-pop-up/modal-pop-up.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { UpdateDataComponent } from './update-data/update-data.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SummeryCardsComponent, ClientAgGridComponent, DeleteCellRenderer,
    FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule,
    ModalPopUpComponent, MatSelectModule, MatDatepickerModule, MatNativeDateModule,UpdateDataComponent],
  providers: [BookServiceService, MembersService, MatDatepickerModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  statusOptions = [
    { value: 'overdue', label: 'Overdue' },
    { value: 'borrowed', label: 'Borrowed' },
    { value: 'returned', label: 'Returned' },
  ]

  constructor(private bookService: BookServiceService,
    private memberService: MembersService
  ) { }
  @ViewChild('EditMember') editTemplate!: ElementRef;

  searchText: string = '';
  books: Books[] = [];
  members: Member[] = [];
  cardsData: cards[] = [];
  membersData: any[] = [];
  allData: any[] = [];
  filteredMembers: any[] = [];
  editMemberData: [] = [];

  readonly dialog = inject(MatDialog);


  ngOnInit() {
     this.getAllMembers();
  }

  private getAllMembers(): any {
    // this.memberService.getMembers().subscribe((res) => {
    //   this.books = res;
    //   console.log(res);
    // })
    // this.bookService.getBooks().subscribe((res) => {
    //   this.members = res;
    //   console.log(this.members);
    // })

    forkJoin({
      books: this.bookService.getBooks(),
      members: this.memberService.getMembers()
    }).subscribe({
      next: (res) => {
        this.books = res.books;
        this.members = res.members;
        this.cardsData = this.buildCards(this.books, this.members);

        this.membersData = this.getRowDataForGrid();
        this.allData = [...this.membersData, ...this.books];
        this.filteredMembers = this.membersData
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      }
    })
    }

  // private getAllBooks(): Observable<Books[]> {
  //   return this.bookService.getBooks();
  // }

  buildCards(books: Books[], members: Member[]): cards[] {
    const states = {
      totalBooks: books.length,
      borrowedBooks:books.filter(res=> res.status ==='Borrowed').length,
      overdueBooks: books.filter(res => res.status === 'Overdue').length,
      totalMembers: members.length
    };

    return dashboardCardDefinitions.map(def => ({
      title: def.title,
      icon: def.icon,
      value: states[def.key as keyof typeof states] || 0
    }))
  }

  getRowDataForGrid(): Member[] {
    return this.members.map((res) => ({
      ...res,
    }));
  }

  getColDefsForGrid() {
    return [
      { field: 'memberName', headerName: 'Member Name' },
      { field: 'title', headerName: 'Book Title' },
      { field: 'bookId', headerName: 'Book ID' },
      { field: 'borrowedDate', headerName: 'Borrowed Date' },
      { field: 'dueDate', headerName: 'Overdue Date' },
      { field: 'status', headerName: 'Status' },
      {
        field: 'update', headerName: 'Update',
        cellRenderer: UpdateRenderer,
        cellRendererParams: {
          onEdit: (row: any) => this.onEditRow(row)
        }
      },
      {
        field: 'delete', headerName: 'Delete',
        cellRenderer: DeleteCellRenderer,
        cellRendererParams: {
          onDelete: (row: any) => this.onDeleteRow(row)
        }
      }
    ];
  }

  search(inputEle: HTMLInputElement) {
    this.searchText = inputEle.value.toLowerCase();
    this.filteredMembers = this.filteredMembers.filter((res) =>
      res.memberName.toLowerCase().includes(this.searchText))
  }
  resetData() {
    this.filteredMembers = this.membersData;
  }

  onDeleteRow(data: any) {
    console.log(data);
    this.filteredMembers = this.filteredMembers.filter(
      (res) => res.memberId !== data.memberId);
  }

  selectedRow: [] = [];
  handleSelected(event: any) {
    this.selectedRow = event;
  }
  deleteSelectedRows() {
    this.filteredMembers = this.filteredMembers.filter((res) =>
      !this.selectedRow.some((selected: any) => selected.memberId === res.memberId));
    console.log(this.selectedRow);
  }


  onEditRow(data: any) {
    const selectedMember = this.filteredMembers.find((res) => res.memberId === data.memberId);
    this.editMemberData = { ...selectedMember };
    const dialogRef = this.dialog.open(ModalPopUpComponent, {
      data: {
        title: 'Edit Member',
        contentTemplate: this.editTemplate,
        context: this.editMemberData
      },
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      const updatedMember = result?.context;
      const formattedDueDate = updatedMember?.dueDate ? new DatePipe('en-US').transform(updatedMember.dueDate, 'yyyy-MM-dd') : undefined;
      updatedMember.dueDate = formattedDueDate;

      this.filteredMembers = updatedMember ? this.filteredMembers.map((res) =>
        res.memberId === updatedMember.memberId ? updatedMember : res) : this.filteredMembers;
      console.log(result);
    });
  }

}
