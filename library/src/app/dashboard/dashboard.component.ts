import { Component, OnInit } from '@angular/core';
import { BookServiceService } from '../../services/books.service';
import { Observable } from 'rxjs';
import { Books } from '../../models/Books';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  providers: [BookServiceService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  constructor(private bookService: BookServiceService) {}

  ngOnInit() {
    this.getAllBooks().subscribe((res)=>{
      console.log(res);
    })
  }

 private getAllBooks():Observable<Books[]> {
    return this.bookService.getBooks();
  }
}
