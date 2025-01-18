import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {

    taskId: number =0;
    task = { id:0, title: '', description: '', status: '', userId: null };
  
    constructor(
      private route: ActivatedRoute,
      private taskService: TaskService,
      private router: Router
    ) {}
  
    ngOnInit(): void {
      this.taskId = Number(this.route.snapshot.paramMap.get('id'));
      this.loadTask();
    }
  
    loadTask(): void {
      this.taskService.getTaskById(this.taskId).subscribe(task => {
        this.task = task;
        console.log(task)
      },
      (error) => {
        console.error('Error loading task:', error);
        alert('Error fetching task details');
      }
    );
    }
  
    updateTask(): void {
        this.taskService.updateTask(this.taskId, this.task).subscribe(response => {
            if (response && response.message === 'Task Updated') 
            {
                console.log('Task updated', response);
                console.log(response)
                this.router.navigate(['/tasks']);
            }
            else 
            {
                console.error('Unexpected response:', response);
                alert('Unexpected error during task update');
            }
        }, error => {
            console.error('Error updating task', error);
        });
    }
}
