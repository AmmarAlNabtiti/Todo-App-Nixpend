import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../Models/task';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todo: Task[] = [];

  constructor(private httpClint: HttpClient) {}

  getAllTodo(): any {
    return this.httpClint.get(`${environment.apiURL}/api/v1/tasks`).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError)
    );
  }

  deleteTodo(todoId: string) {
    return this.httpClint
      .delete(`${environment.apiURL}/api/v1/tasks/${todoId}`)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError)
      );
  }

  createNewTodo(todo: any): Observable<any> {
    return this.httpClint
      .post<Task>(`${environment.apiURL}/api/v1/tasks`, todo)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError)
      );
  }

  getTodoById(todoId: string): Observable<Task> {
    return this.httpClint
      .get<Task>(`${environment.apiURL}/api/v1/tasks/${todoId}`)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError)
      );
  }

  updateTodo(todoId: string, updatedTodo: any): Observable<any> {
    return this.httpClint
      .patch(`${environment.apiURL}/api/v1/tasks/${todoId}`, updatedTodo)
      .pipe(retry(3), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
