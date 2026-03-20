import { Component, Input } from '@angular/core';
import { SummeryCardsComponent } from '../../../shared/summery-cards/summery-cards.component';
import { Books } from '../../../models/Books';
import { Observable } from 'rxjs';
import { BookServiceService } from '../../../services/books.service';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [SummeryCardsComponent],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent {
}
