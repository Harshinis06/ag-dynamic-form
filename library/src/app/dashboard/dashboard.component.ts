import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { BookServiceService } from '../../services/books.service';
import { forkJoin, Observable } from 'rxjs';
import { Books } from '../../models/Books';
import { CommonModule } from '@angular/common';
import { SummeryCardsComponent } from '../../shared/summery-cards/summery-cards.component';
import { MembersService } from '../../services/members.service';
import { Member } from '../../models/Member';
import { cards } from '../../models/cards';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SummeryCardsComponent],
  providers: [BookServiceService, MembersService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  constructor(private bookService: BookServiceService,
    private memberService: MembersService
  ) { }
  books: Books[] = [];
  members: Member[] = [];
  cardsData: cards[] = [];


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

}
