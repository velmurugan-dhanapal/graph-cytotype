import { Injectable } from '@angular/core';
// import { TASKS } from '../mock-tasks';
import { Task } from '../Task'
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TaskService {


  private apiUrl: string = 'http://localhost:5000/tasks'
  constructor(private http: HttpClient) { }

  getTask(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  deleteTask(task: Task): Observable<Task> {
    return this.http.delete<Task>(`${this.apiUrl}/${task.id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  updateToggleTask(task: Task): Observable<Task> {
    console.log(task)
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  addTask(task: Task): Observable<Task> {

    return this.http.post<Task>(`${this.apiUrl}`, task, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
    
  }
}
