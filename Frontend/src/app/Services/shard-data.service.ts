import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShardDataService {
  // Used to share Order between todoList and header
  customPipeOrderProperty: string = 'desc';

  // Observable to notify components about order change
  orderChange: Subject<string> = new Subject<string>();

  onChangeTodoOrder(newOrder: string) {
    this.customPipeOrderProperty = newOrder;
    this.orderChange.next(newOrder);
  }
}
