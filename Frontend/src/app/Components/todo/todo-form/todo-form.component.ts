import { Component } from '@angular/core';
import { TodoService } from './../../../Services/todo.service';
import { Task } from '../../../Models/task';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css',
})
export class TodoFormComponent {
  todo: Task = {} as Task;

  // MODEL
  isOpen: boolean = true;

  closeModal(event: Event): void {
    if (event.target === event.currentTarget) {
      this.router.navigate(['/todo']);
    }
  }

  constructor(private router: Router, private todoService: TodoService) {}

  // FORM LOGIC
  taskForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [
      Validators.minLength(3),
      Validators.required,
    ]),
    subtasks: new FormArray([]),
    status: new FormControl('todo'),
  });

  get subtasksFormArray() {
    return this.taskForm.get('subtasks') as FormArray;
  }

  addSubtask() {
    this.subtasksFormArray.push(
      new FormGroup({
        title: new FormControl('', [
          Validators.minLength(2),
          Validators.required,
        ]),
        completed: new FormControl(false),
      })
    );
  }

  removeSubtask(index: number) {
    this.subtasksFormArray.removeAt(index);
  }

  onSubmit() {
    this.todoService.createNewTodo(this.taskForm.value).subscribe(() => {
      this.router.navigate(['/todo']);
    });
  }
}
