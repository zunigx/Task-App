import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AuthService } from '../../../core/auth/auth.service'; // Ajusta la ruta según tu estructura

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [ButtonModule, RippleModule]
})
export class HeaderComponent {
  @Input() headerTitle: string = '';

  constructor( private authService: AuthService) { }

  logout(): void {
    this.authService.logout();
    console.log('Se hizo clic en Cerrar sesión');

  }

  addTask() {
    console.log('Add task clicked');
    // Implementa la lógica para agregar una tarea aquí
  }
}
