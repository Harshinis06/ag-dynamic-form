import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { BookServiceService } from '../../services/books.service';
import { forkJoin, Observable } from 'rxjs';
import { Books } from '../../models/Books';
import { CommonModule, NgIf } from '@angular/common';
import { SummeryCardsComponent } from '../../shared/summery-cards/summery-cards.component';
import { MembersService } from '../../services/members.service';
import { Member } from '../../models/Member';
import { cards } from '../../models/cards';
import { ClientAgGridComponent } from '../../shared/client-ag-grid/client-ag-grid.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DeleteCellRenderer } from '../../shared/deleteRendere.component';
import { MatButtonModule } from '@angular/material/button';
import { dashboardCardDefinitions } from './dashboard-cards.config';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SummeryCardsComponent, ClientAgGridComponent, DeleteCellRenderer,
    FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatInputModule, MatButtonModule
  ],
  providers: [BookServiceService, MembersService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  constructor(private bookService: BookServiceService,
    private memberService: MembersService
  ) { }

  searchText: string = '';
  books: Books[] = [];
  members: Member[] = [];
  cardsData: cards[] = [];
  alldata: any[] = [];
  filteredMembers: any[] = [];


  ngOnInit() {
    this.getAllBooks().subscribe((res) => {
      this.books = res;
      console.log(res);
    })
    this.getAllMembers().subscribe((res) => {
      this.members = res;
      console.log(this.members);
    })

    forkJoin({
      books: this.getAllBooks(),
      members: this.getAllMembers()
    }).subscribe({
      next: (res) => {
        this.books = res.books;
        this.members = res.members;
        this.cardsData = this.buildCards(this.books, this.members);

        this.alldata = this.getRowDataForGrid();
        this.filteredMembers = this.alldata;
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      }
    })

  }

  private getAllMembers(): Observable<Member[]> {
    return this.memberService.getMembers()
  }

  private getAllBooks(): Observable<Books[]> {
    return this.bookService.getBooks();
  }

  buildCards(books: Books[], members: Member[]): cards[] {
    const states = {
      totalBooks: books.length,
      borrowedBooks: books.filter(res => res.status === 'Borrowed').length,
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
      { field: 'update', headerName: 'Update' },
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
    this.filteredMembers = this.alldata;
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

}
