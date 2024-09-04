import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogActividad } from 'src/app/interfaces/log-actividad';
import { LogActividadService } from 'src/app/servicios/log-actividad.service';

@Component({
  selector: 'app-log-actividad',
  templateUrl: './log-actividad.component.html',
  styleUrls: ['./log-actividad.component.scss'],
})
export class LogActividadComponent implements OnInit {
  logs: LogActividad[] = [];
  newLogForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private logActividadService: LogActividadService
  ) {
    this.newLogForm = this.fb.group({
      usuarioId: [null, Validators.required],
      accion: [null, Validators.required],
      descripcion: [null, Validators.required],
      fecha: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadLogs();
  }

  loadLogs(): void {
    this.logActividadService.getLogs().subscribe(
      (data) => (this.logs = data),
      (error) => console.error('Error al cargar logs', error)
    );
  }

  createLog(): void {
    if (this.newLogForm.valid) {
      const log: LogActividad = this.newLogForm.value;
      this.logActividadService.createLog(log).subscribe(
        (data) => {
          console.log('Log creado', data);
          this.loadLogs();
        },
        (error) => console.error('Error al crear log', error)
      );
    }
  }
}
