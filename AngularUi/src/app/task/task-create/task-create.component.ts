import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent {

    task = { title: '', description: '', status: 'pending', userId: null };

    constructor(private taskService: TaskService,
                private route: ActivatedRoute,
                private router: Router
    ) {}

    ngOnInit(){    
    }
  
    createTask() : void 
    {
      if (!this.task.title || !this.task.description) 
        {
            alert('Title and Description are required.');
            return;
        }

        this.taskService.createTask(this.task).subscribe(response => {
            console.log('Task created', response);
            this.router.navigate(['/tasks']);
        }, error => {
            console.error('Error creating task', error);
        });
    }

}
