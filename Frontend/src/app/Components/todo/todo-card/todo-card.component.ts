import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Task } from '../../../Models/task';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.css',
})
export class TodoCardComponent implements OnInit, OnChanges {
  @Input() todoData: Task | undefined; // Explicitly define the type

  isOpen: boolean = false;
  completedSubtasksCount: number = 0;

  ngOnInit(): void {
    this.calculateCompletedSubtasks();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['todoData'] && !changes['todoData'].firstChange) {
      this.calculateCompletedSubtasks();
      // Add any other logic for handling changes to todoData
    }
  }

  openTaskDetails(): void {
    this.isOpen = true;
  }

  private calculateCompletedSubtasks(): void {
    if (
      this.todoData &&
      this.todoData.subtasks &&
      this.todoData.subtasks.length > 0
    ) {
      this.completedSubtasksCount = this.todoData.subtasks.filter(
        (subtask) => subtask.completed
      ).length;
    } else {
      this.completedSubtasksCount = 0;
    }
  }
}
