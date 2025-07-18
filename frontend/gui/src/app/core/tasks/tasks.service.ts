import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, RespuestaTareas } from '../../core/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:5000/task';

  constructor(private http: HttpClient) {}

  getTasksByUser(createdBy: string): Observable<RespuestaTareas> {
    return this.http.get<RespuestaTareas>(`${this.apiUrl}/Usertasks/${createdBy}`);
  }
}
