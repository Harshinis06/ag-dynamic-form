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

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SummeryCardsComponent, ClientAgGridComponent,
    FormsModule, MatFormFieldModule, MatInputModule, MatIconModule
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
        this.cardsData = this.getbuildCards();

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

  private getbuildCards(): cards[] {
    this.cardsData = [
      {
        title: 'Total Books',
        icon: 'menu_book',
        value: this.books.length
      },
      {
        title: 'Borrowed Books',
        icon: 'layers',
        value: this.books.filter(b => b.status === 'Borrowed').length
      },
      {
        title: 'Overdue Books',
        icon: 'warning',
        value: this.books.filter(b => b.status === 'Overdue').length
      },
      {
        title: 'Total Members',
        icon: 'groups',
        value: this.members.length
      }
    ];
    return this.cardsData;
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
      { field: 'delete', headerName: 'Delete' }
    ];
  }

  // search(event: any) {
  //   this.searchInputTrack = event.target.value.toLowerCase();
  //   this.filteredMembers = this.alldata.filter((res) =>
  //     res.memberName.toLowerCase().includes(this.searchInputTrack))
  // }
  search(inputEle: HTMLInputElement) {
    this.searchText = inputEle.value.toLowerCase();
    this.filteredMembers = this.alldata.filter((res) =>
      res.memberName.toLowerCase().includes(this.searchText))
  }
  resetData() {
    this.filteredMembers = this.alldata;
  }
}
