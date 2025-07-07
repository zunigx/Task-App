import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Usuario, RespuestaAutenticacion } from '../../../core/models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    PasswordModule,
    InputTextModule,
    DividerModule,
    InputGroupAddonModule,
    InputGroupModule,
    RouterModule,
    ToastModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService] // Añadir MessageService como proveedor
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  cardStyles = {
    width: '25rem',
    overflow: 'hidden',
    borderRadius: '1rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    padding: '1.5rem'
  };

  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) {}

  login() {
    if (!this.username || !this.password) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Usuario y contraseña son requeridos' });
      return;
    }
    const credentials: Usuario = { username: this.username, password: this.password };
    console.log('Enviando solicitud de login con:', credentials);
    this.authService.login(credentials).subscribe({
      next: (response: RespuestaAutenticacion) => {
        console.log('Login exitoso', response);
        if (response.intData?.token) {
          this.authService.setToken(response.intData.token);
          this.router.navigate(['/tasks/task-list']);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se recibió un token' });
        }
      },
      error: (err) => {
        console.error('Error en el login:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al iniciar sesión' });
      }
    });
  }
}
