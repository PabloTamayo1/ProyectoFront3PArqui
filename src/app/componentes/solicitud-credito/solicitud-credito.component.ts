import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SolicitudCredito } from 'src/app/interfaces/solicitud-credito';
import { SolicitudCreditoService } from 'src/app/servicios/solicitud-credito.service';

@Component({
  selector: 'app-solicitud-credito',
  templateUrl: './solicitud-credito.component.html',
  styleUrls: ['./solicitud-credito.component.scss'],
})
export class SolicitudCreditoComponent implements OnInit {
  solicitudes: SolicitudCredito[] = [];
  newSolicitudRestForm: FormGroup;
  newSolicitudGraphQLForm: FormGroup;
  displayedColumns: string[] = [
    'usuarioId',
    'montoSolicitado',
    'fechaSolicitud',
    'estado',
    'puntajeCrediticio',
    'acciones',
  ];

  constructor(
    private fb: FormBuilder,
    private solicitudCreditoService: SolicitudCreditoService,
    private snackBar: MatSnackBar
  ) {
    this.newSolicitudRestForm = this.fb.group({
      usuarioId: [null, Validators.required],
      montoSolicitado: [null, Validators.required],
      fechaSolicitud: [null, Validators.required],
      estado: [null, Validators.required],
      puntajeCrediticio: [null, Validators.required],
    });

    this.newSolicitudGraphQLForm = this.fb.group({
      usuarioId: [null, Validators.required],
      montoSolicitado: [null, Validators.required],
      fechaSolicitud: [null, Validators.required],
      estado: [null, Validators.required],
      puntajeCrediticio: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadSolicitudes();
  }

  loadSolicitudes(): void {
    this.solicitudCreditoService.getSolicitudesREST().subscribe(
      (data) => (this.solicitudes = data),
      (error) => console.error('Error al cargar solicitudes REST', error)
    );
  }

  loadSolicitud(id: number): void {
    if (id !== undefined && id !== null) {
      this.solicitudCreditoService.getSolicitudREST(id).subscribe(
        (data) => console.log('Solicitud cargada', data),
        (error) => console.error('Error al cargar solicitud REST', error)
      );
    }
  }

  createSolicitudRest(): void {
    if (this.newSolicitudRestForm.valid) {
      const solicitud: SolicitudCredito = this.newSolicitudRestForm.value;
      this.solicitudCreditoService.createSolicitudREST(solicitud).subscribe(
        (data) => {
          console.log('Solicitud creada', data);
          this.loadSolicitudes();
        },
        (error) => console.error('Error al crear solicitud REST', error)
      );
    }
  }

  createSolicitudGraphQL(): void {
    if (this.newSolicitudGraphQLForm.valid) {
      const solicitud: SolicitudCredito = this.newSolicitudGraphQLForm.value;
      this.solicitudCreditoService.createSolicitudGraphQL(solicitud).subscribe(
        (data) => {
          console.log('Solicitud creada con GraphQL', data);
          this.loadSolicitudes();
        },
        (error) => console.error('Error al crear solicitud con GraphQL', error)
      );
    }
  }

  deleteSolicitud(id: number): void {
    if (id !== undefined && id !== null) {
      this.solicitudCreditoService.deleteSolicitudREST(id).subscribe(
        () => {
          console.log('Solicitud eliminada');
          this.loadSolicitudes();
        },
        (error) => console.error('Error al eliminar solicitud REST', error)
      );
    }
  }
}
