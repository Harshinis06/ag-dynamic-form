import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BooksComponent } from './dashboard/books/books.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

    { path: 'dashboard', component: DashboardComponent },
    { path: 'books', component: BooksComponent },
    { path: 'members', component: DashboardComponent },
    { path: 'borrow', component: DashboardComponent },
    { path: 'payments', component: DashboardComponent },

    { path: '**', redirectTo: 'dashboard' }
];
