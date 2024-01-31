import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from './../../../Services/todo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class TodoDetailsComponent {
  cardId: string = '';
  cardDetail: any = {};
  isOpen: boolean = true;
  cardStatus: string = '';

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.cardId = params['todoId'];
      this.fetchCardDetails(this.cardId);
    });
  }

  fetchCardDetails(id: string) {
    this.todoService.getTodoById(id).subscribe((data) => {
      this.cardDetail = data;
      console.log(data);
    });
  }

  getCompletedSubtasksCount(): number {
    return (
      this.cardDetail?.data?.task?.subtasks.filter(
        (subtask: any) => subtask.completed
      ).length || 0
    );
  }

  closeModal(event: Event): void {
    if (event.target === event.currentTarget) {
      this.updateTodoDetails();
    }
  }

  updateSubtaskCompletion(subtask: any, event: any): void {
    const foundIndex = this.cardDetail.data.task.subtasks.findIndex(
      (s: any) => s._id === subtask._id
    );

    if (foundIndex !== -1) {
      const updatedSubtask = {
        ...this.cardDetail.data.task.subtasks[foundIndex],
      };
      updatedSubtask.completed = event.target.checked;

      // Remove the existing subtask from the array
      this.cardDetail.data.task.subtasks.splice(foundIndex, 1);

      // Push the updated subtask back into the array
      this.cardDetail.data.task.subtasks.push(updatedSubtask);
    }
    console.log(this.cardDetail);
  }

  updateTodoDetails(): void {
    this.todoService
      .updateTodo(this.cardId, this.cardDetail.data.task)
      .subscribe((data) => {
        console.log('Todo updated successfully:', data);
        this.router.navigate(['/todo']);
      });
  }

  deleteTodo(id: string) {
    this.todoService.deleteTodo(id).subscribe(() => {
      console.log('Todo updated successfully:');
      this.router.navigate(['/todo']);
    });
  }
  updateStatus() {
    this.cardDetail.data.task.status = this.cardStatus;
    console.log(this.cardDetail);
  }
}
