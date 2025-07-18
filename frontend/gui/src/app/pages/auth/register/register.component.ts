import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Usuario, RespuestaAutenticacion } from '../../../core/models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    RouterModule,
    ToastModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService]
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  qrCode: string = '';
  secret: string = '';

  cardStyles = {
    width: '25rem',
    overflow: 'hidden',
    borderRadius: '1rem',
    boxShadow: '0 4px 12px rgba(231, 235, 237, 1)',
    background: 'rgba(55, 66, 66, 0.8)',
    textAlign: 'center',
    padding: '1.5rem'
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  register() {
    if (!this.username || !this.password || !this.confirmPassword) {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Completa todos los campos' });
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Las contraseñas no coinciden' });
      return;
    }

    const userData: Usuario = { username: this.username, password: this.password };
    this.authService.register(userData).subscribe({
      next: (response: RespuestaAutenticacion) => {
        console.log('Registro exitoso', response);
        if (response.intData?.data?.qr_code) {
          this.qrCode = response.intData.data.qr_code;
          this.secret = response.intData.data.secret || '';
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario registrado. Escanea el código QR con tu app de autenticación.' });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response.intData?.message || 'Error al registrar el usuario' });
        }
      },
      error: (err) => {
        console.error('Error en el registro:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.intData?.message || 'Error al registrar el usuario' });
      }
    });
  }
}
