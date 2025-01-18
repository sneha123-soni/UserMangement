import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { TaskCreateComponent } from './task/task-create/task-create.component';
import { TaskEditComponent } from './task/task-edit/task-edit.component';
import { TaskListComponent } from './task/task-list/task-list.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'tasks', component: TaskListComponent },
    { path: 'create-task', component: TaskCreateComponent },
    { path: 'edit-task/:id', component: TaskEditComponent },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
