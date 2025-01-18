import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

    private apiUrl = 'http://localhost:3000';

    constructor(private http: HttpClient) {}

    private getAuthHeaders(): HttpHeaders {
        const token = localStorage.getItem('token');
        return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
      }
    
      getTasks() {
        const token = localStorage.getItem('token'); // Retrieve your token
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
        return this.http.get<any[]>(`${this.apiUrl}/tasks`, { headers });
      }

      getTaskById(id: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
      }
    
      getTasksByStatus(status: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/tasks?status=${status}`, { headers: this.getAuthHeaders() });
      }
    
      createTask(task: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/tasks`, task, { headers: this.getAuthHeaders() });
      }
    
      updateTask(id: number, task: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/tasks/${id}`, task, { headers: this.getAuthHeaders() });
      }
    
      deleteTask(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/tasks/${id}`, { headers: this.getAuthHeaders() });
      }

}
