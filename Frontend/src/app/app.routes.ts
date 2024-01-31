import { Routes } from '@angular/router';
import { ChartComponent } from './Components/chart/chart.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { TodoListComponent } from './Components/todo/todo-list/todo-list.component';
import { TodoFormComponent } from './Components/todo/todo-form/todo-form.component';
import { TodoDetailsComponent } from './Components/todo/todo-details/todo-details.component';

export const routes: Routes = [
  {
    path: '',
    // component: MainComponent,
    children: [
      { path: '', redirectTo: 'todo', pathMatch: 'full' },
      { path: 'todo', component: TodoListComponent },
      { path: 'chart', component: ChartComponent },
      { path: 'todo-form', component: TodoFormComponent },
      { path: 'todo-details/:todoId', component: TodoDetailsComponent },
    ],
  },

  { path: '**', component: NotFoundComponent },
];
