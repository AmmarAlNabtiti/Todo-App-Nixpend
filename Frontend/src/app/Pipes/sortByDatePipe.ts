import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByDate',
  standalone: true,
})
export class SortByDatePipe implements PipeTransform {
  transform(tasks: any[], sortType: 'asc' | 'desc' = 'asc'): any[] {
    if (!tasks || tasks.length === 0) {
      return [];
    }

    const sortedTasks = tasks.sort((a, b) => {
      const dateA = new Date(a.updatedAt).getTime();
      const dateB = new Date(b.updatedAt).getTime();

      if (sortType === 'asc') {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });

    return sortedTasks;
  }
}
