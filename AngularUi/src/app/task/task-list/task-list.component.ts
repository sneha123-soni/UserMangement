import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { Task } from 'src/app/models/taskModel';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
    tasks: any[] = [];
    status: string = '';
  
    constructor(private taskService: TaskService) {}
  
    ngOnInit(): void {
      this.getTasks();
    }
  
    getTasks(): void {
      this.taskService.getTasks().subscribe(
        (response:any) => {this.tasks = response},
        (error)=> {console.error('Error fetching the product',error);}
        );
    
    }
  
    filterTasksByStatus(): void {
      if (this.status) {
        this.taskService.getTasksByStatus(this.status).subscribe(tasks => {
          this.tasks = tasks;
        });
      } else {
        this.getTasks();
      }
    }
  
    deleteTask(id: number): void {
      this.taskService.deleteTask(id).subscribe((response) => {
        console.log('Task deleted:', response);
        this.tasks = this.tasks.filter(task => task.id !== id);
        alert("Task Deleted Successfully!");
      },
      (error) => {
        console.error('Error deleting task', error);
        alert('Error deleting task. Please try again.');
      }
    );
    }
}
