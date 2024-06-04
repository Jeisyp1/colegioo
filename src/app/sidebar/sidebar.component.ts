import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isOpen = false;

  openNav() {
    this.isOpen = true;
  }

  closeNav() {
    this.isOpen = false;
  }
}
