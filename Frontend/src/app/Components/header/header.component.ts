import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShardDataService } from './../../Services/shard-data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  constructor(private shardDataService: ShardDataService) {}
  todoOrder: string = 'desc';

  handleOnchangeOrder() {
    this.shardDataService.onChangeTodoOrder(this.todoOrder);
  }
}
