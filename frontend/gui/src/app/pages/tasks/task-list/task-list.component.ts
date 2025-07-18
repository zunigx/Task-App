import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../core/tasks/tasks.service';
import { Task } from '../../../core/models/task.model';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/components/header/header.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  imports: [CommonModule, PanelModule, CardModule, HeaderComponent]
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  kanbanColumns: any[] = [];

  constructor(private TaskService: TaskService) {}

  ngOnInit(): void {
    let username: string | null = null;
    if (typeof window !== 'undefined') {
      username = localStorage.getItem('username');
    }
    if (username) {
      this.TaskService.getTasksByUser(username).subscribe({
        next: (res) => {
          this.tasks = res.intData?.data ?? [];
          this.setKanbanColumns();
        },
        error: (err) => {
          this.tasks = [];
        }
      });
    }
  }

  setKanbanColumns() {
    this.kanbanColumns = [
      { header: 'Pendiente', status: 'Incomplete', tasks: this.tasks.filter(t => t.status === 'Incomplete') },
      { header: 'En progreso', status: 'InProgress', tasks: this.tasks.filter(t => t.status === 'InProgress') },
      { header: 'Pausada', status: 'Paused', tasks: this.tasks.filter(t => t.status === 'Paused') },
      { header: 'Revisión', status: 'Revision', tasks: this.tasks.filter(t => t.status === 'Revision') },
      { header: 'Hecho', status: 'Completed', tasks: this.tasks.filter(t => t.status === 'Completed') }
    ];
  }

  getCardColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'completed':
      return '#A5D6A7'; // Verde menta suave y profesional
      case 'paused':
        return '#FFF59D'; // Amarillo dorado claro, elegante
      case 'inprogress':
        return '#FFCC80'; // Naranja durazno sobrio
      case 'revision':
        return '#90CAF9'; // Azul profesional, más suave
      case 'incomplete':
      default:
        return '#ECEFF1'; // Gris claro, elegante y profesional
    }
  }

  getStatusTextColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'completed':
      return '#A5D6A7'; // Verde menta suave y profesional
      case 'paused':
        return '#FFF59D'; // Amarillo dorado claro, elegante
      case 'inprogress':
        return '#FFCC80'; // Naranja durazno sobrio
      case 'revision':
        return '#90CAF9'; // Azul profesional, más suave
      case 'incomplete':
      default:
        return '#ECEFF1'; // Gris claro, elegante y profesional
    }
  }

  getColumnColor(status: string): { 'background-color': string } {
    switch (status.toLowerCase()) {
      case 'incomplete':
        return { 'background-color': '#546E7A' }; // Azul grisáceo profesional
      case 'inprogress':
        return { 'background-color': '#FB8C00' }; // Naranja quemado elegante
      case 'paused':
        return { 'background-color': '#FBC02D' }; // Amarillo mostaza suave
      case 'revision':
        return { 'background-color': '#1E88E5' }; // Azul moderno sobrio
      case 'completed':
        return { 'background-color': '#66BB6A' }; // Verde menta profesional
      default:
        return { 'background-color': '#757575' }; // Gris neutral
    }
  }
}
