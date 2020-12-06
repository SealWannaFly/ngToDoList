import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Task{
  id?: number;
  text: string;
  priority: string;
  creationDate: Date;
  resultDate: Date;
  result: string;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  addTask(newTask: Task): Observable<Task>{
    return this.http.post<Task>('http://127.0.0.1:3000/items', newTask);
  }

  getTaskById(id: number): Observable<Task>{
    return this.http.get<Task>(`http://127.0.0.1:3000/items/${id}`);
  }

  getTasks(): Observable<Task[]>{
    return this.http.get<Task[]>('http://127.0.0.1:3000/items');
  }

  deleteTask(id: number): Observable<void>{
    return this.http.delete<void>(`http://127.0.0.1:3000/items/${id}`);
  }

  updateTask(id: number, text: string, priority: string): Observable<Task>{
    return this.http.put<Task>(`http://127.0.0.1:3000/items/${id}`, {
      text,
      priority,
    });
  }

  setResult(id: number, result: string, resultDate: Date): Observable<Task>{
    return this.http.put<Task>(`http://127.0.0.1:3000/items/${id}`, {
      result,
      resultDate,
    });
  }
}
