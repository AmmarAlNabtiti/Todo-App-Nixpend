import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoCardComponent } from '../todo-card/todo-card.component';
import { Task } from '../../../Models/task';
import { TodoService } from '../../../Services/todo.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderComponent } from '../../loader/loader.component';
import { SortByDatePipe } from '../../../Pipes/sortByDatePipe';
import { ShardDataService } from './../../../Services/shard-data.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoCardComponent, CommonModule, LoaderComponent, SortByDatePipe],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit, OnDestroy {
  todoTasks: Task[] = [];
  doingTasks: Task[] = [];
  doneTasks: Task[] = [];
  isLoading: boolean = false;
  order: 'asc' | 'desc' | undefined = 'desc';

  private subscription: Subscription = new Subscription();

  constructor(
    private todoService: TodoService,
    private shardDataService: ShardDataService
  ) {
    this.order = this.shardDataService.customPipeOrderProperty as
      | 'asc'
      | 'desc'
      | undefined;

    // Subscribe to changes in order
    this.shardDataService.orderChange.subscribe((newOrder: string) => {
      this.order = newOrder as 'asc' | 'desc';
      // Fetch todos again with new order
      this.getTodos();
    });
  }

  ngOnInit(): void {
    this.getTodos();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private getTodos(): void {
    const observer = {
      next: (data: any) => {
        const allTasks: Task[] = data.data.tasks;

        // Separate tasks based on status
        this.todoTasks = allTasks.filter((task) => task.status === 'todo');
        this.doingTasks = allTasks.filter(
          (task) => task.status === 'inprogress'
        );
        this.doneTasks = allTasks.filter((task) => task.status === 'done');
      },
      error: (err: Error) => {
        console.error(err);
      },
    };
    this.isLoading = true;
    const todoSubscription = this.todoService
      .getAllTodo()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(observer);

    this.subscription.add(todoSubscription);
  }
}
