import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { SideNavBarComponent } from './side-nav-bar/side-nav-bar.component';
import {HeaderComponent} from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SideNavBarComponent,HeaderComponent
    ,HttpClientModule,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'library';

  isSidebarOpen = false;
  toggleSidebar(){
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
