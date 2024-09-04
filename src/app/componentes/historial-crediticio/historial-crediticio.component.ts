import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HistorialCrediticio } from 'src/app/interfaces/historial-crediticio';
import { HistorialCrediticioService } from 'src/app/servicios/historial-crediticio.service';

@Component({
  selector: 'app-historial-crediticio',
  templateUrl: './historial-crediticio.component.html',
  styleUrls: ['./historial-crediticio.component.scss'],
})
export class HistorialCrediticioComponent implements OnInit {
  historiales: HistorialCrediticio[] = [];
  selectedHistorial: HistorialCrediticio | null = null;
  newHistorialForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private historialService: HistorialCrediticioService
  ) {
    this.newHistorialForm = this.fb.group({
      usuarioId: [null, Validators.required],
      fecha: [null, Validators.required],
      monto: [null, [Validators.required, Validators.min(0)]],
      estado: [null, Validators.required],
      descripcion: [null],
    });
  }

  ngOnInit(): void {
    this.cargarHistoriales();
  }

  cargarHistoriales(): void {
    this.historialService.listarHistoriales().subscribe((data) => {
      this.historiales = data;
    });
  }

  obtenerHistorial(id: number): void {
    this.historialService.obtenerHistorialPorId(id).subscribe((data) => {
      this.selectedHistorial = data;
    });
  }

  crearHistorial(): void {
    if (this.newHistorialForm.valid) {
      const historial: HistorialCrediticio = {
        id: 0,
        ...this.newHistorialForm.value,
      };
      this.historialService.crearHistorial(historial).subscribe(() => {
        this.cargarHistoriales();
        this.newHistorialForm.reset();
      });
    }
  }

  eliminarHistorial(id: number): void {
    this.historialService.eliminarHistorial(id).subscribe(() => {
      this.cargarHistoriales();
    });
  }
}
