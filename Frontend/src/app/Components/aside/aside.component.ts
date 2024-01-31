import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css',
})
export class AsideComponent {
  isSidebarHidden: boolean = false;
  fakeDarkMode() {
    window.document.body.classList.toggle('dark-mode');
  }
  hideSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }
}
