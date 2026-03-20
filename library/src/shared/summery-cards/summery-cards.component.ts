import { Component, Input, OnChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { cards } from '../../models/cards';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-summery-cards',
  standalone: true,
  imports: [MatCardModule, MatIconModule, NgFor],
  templateUrl: './summery-cards.component.html',
  styleUrl: './summery-cards.component.scss'
})
export class SummeryCardsComponent implements OnChanges {
  @Input() data: cards[] = [];
  ngOnChanges() {
   if (this.data && this.data.length) {
    console.log(this.data);  
    console.log(this.data.map(card => card.title));
  }
  }
}
