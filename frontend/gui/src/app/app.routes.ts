import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuard } from './core/auth/auth.guard';
import { TasksGuard } from './core/tasks/tasks.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
    {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.routes').then(m => m.AUTH_ROUTES),
    canActivate: [TasksGuard]
  },
  {
    path: 'tasks',
    loadChildren: () => import('./pages/tasks/tasks.routes').then(m => m.TASKS_ROUTES),
    canActivate: [AuthGuard]
  },
  { path: '**', component: NotFoundComponent } // Redirige a login si la ruta no existe
];
