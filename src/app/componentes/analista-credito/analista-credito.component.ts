import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnalistaCredito } from 'src/app/interfaces/analista-credito';
import { AnalistaCreditoService } from 'src/app/servicios/analista-credito.service';

@Component({
  selector: 'app-analista-credito',
  templateUrl: './analista-credito.component.html',
  styleUrls: ['./analista-credito.component.scss'],
})
export class AnalistaCreditoComponent implements OnInit {
  analistas: AnalistaCredito[] = [];
  selectedAnalista: AnalistaCredito | null = null;
  newAnalistaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private analistaService: AnalistaCreditoService
  ) {
    this.newAnalistaForm = this.fb.group({
      nombre: [null, Validators.required],
      correoElectronico: [null, [Validators.required, Validators.email]],
      telefono: [null, Validators.required],
      fechaContratacion: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.cargarAnalistas();
  }

  cargarAnalistas(): void {
    this.analistaService.listarAnalistas().subscribe((data) => {
      this.analistas = data;
    });
  }

  obtenerAnalista(id: number): void {
    this.analistaService.obtenerAnalistaPorId(id).subscribe((data) => {
      this.selectedAnalista = data;
    });
  }

  crearAnalista(): void {
    if (this.newAnalistaForm.valid) {
      const analista: AnalistaCredito = {
        id: 0,
        ...this.newAnalistaForm.value,
      };
      this.analistaService.crearAnalista(analista).subscribe(() => {
        this.cargarAnalistas();
        this.newAnalistaForm.reset();
      });
    }
  }

  eliminarAnalista(id: number): void {
    this.analistaService.eliminarAnalista(id).subscribe(() => {
      this.cargarAnalistas();
    });
  }
}
