import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule, } from '@angular/material/sidenav';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-nav-bar',
  standalone: true,
  imports: [MatSidenavModule,MatIconModule,RouterModule,RouterOutlet,
    MatListModule,CommonModule],
  templateUrl: './side-nav-bar.component.html',
  styleUrl: './side-nav-bar.component.scss'
})
export class SideNavBarComponent {
ngOnInit() {
  console.log("huuu");
  }

  @Input() isSidebarOpen: boolean = false;
}
