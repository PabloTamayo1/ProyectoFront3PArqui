import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard.guard';
import { LoginComponent } from './componentes/login/login.component';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';
import { AnalistaCreditoComponent } from './componentes/analista-credito/analista-credito.component';
import { DocumentoComponent } from './componentes/documento/documento.component';
import { HistorialCrediticioComponent } from './componentes/historial-crediticio/historial-crediticio.component';
import { LogActividadComponent } from './componentes/log-actividad/log-actividad.component';
import { SolicitudCreditoComponent } from './componentes/solicitud-credito/solicitud-credito.component';
import { TransaccionInternaComponent } from './componentes/transaccion-interna/transaccion-interna.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'analista-credito',
    component: AnalistaCreditoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'documento',
    component: DocumentoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'historial-crediticio',
    component: HistorialCrediticioComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'log-actividad',
    component: LogActividadComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'solicitud-credito',
    component: SolicitudCreditoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'transaccion-interna',
    component: TransaccionInternaComponent,
    canActivate: [AuthGuard],
  },
  { path: 'usuario', component: UsuarioComponent, canActivate: [AuthGuard] },
  {
    path: 'notfound',
    component: NoEncontradoComponent,
  },
  {
    path: '**',
    redirectTo: '/notfound',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
