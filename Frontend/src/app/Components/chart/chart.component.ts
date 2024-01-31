// chart.component.ts
import { Component, OnInit } from '@angular/core';
import { TodoService } from './../../Services/todo.service';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  standalone: true,
  imports: [NgChartsModule],
})
export class ChartComponent implements OnInit {
  chartData: any;
  chartOptions: any;
  chartPlugins: any;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getAllTodo().subscribe((response: any) => {
      const tasks = response.data.tasks;
      const todoCounts = this.countTodoStatus(tasks);

      this.chartData = {
        labels: Object.keys(todoCounts),
        datasets: [
          {
            label: 'My Todo Progress',
            data: Object.values(todoCounts),
            backgroundColor: ['#6561BB', '#FE6F99', '#FF9377'],
          },
        ],
      };

      this.chartOptions = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };

      this.chartPlugins = [];
    });
  }

  private countTodoStatus(tasks: any[]): { [key: string]: number } {
    const todoCounts: { [key: string]: number } = {};

    tasks.forEach((task) => {
      const status = task.status.toLowerCase();
      if (todoCounts[status]) {
        todoCounts[status]++;
      } else {
        todoCounts[status] = 1;
      }
    });

    return todoCounts;
  }
}
