import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransaccionInterna } from 'src/app/interfaces/transaccion-interna';
import { TransaccionInternaService } from 'src/app/servicios/transaccion-interna.service';

@Component({
  selector: 'app-transaccion-interna',
  templateUrl: './transaccion-interna.component.html',
  styleUrls: ['./transaccion-interna.component.scss'],
})
export class TransaccionInternaComponent implements OnInit {
  transacciones: TransaccionInterna[] = [];
  newTransaccionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private transaccionInternaService: TransaccionInternaService
  ) {
    this.newTransaccionForm = this.fb.group({
      origen: [null, Validators.required],
      destino: [null, Validators.required],
      monto: [null, [Validators.required, Validators.min(0)]],
      fecha: [null, Validators.required],
      descripcion: [null],
    });
  }

  ngOnInit(): void {
    this.loadTransacciones();
  }

  loadTransacciones(): void {
    this.transaccionInternaService.getTransacciones().subscribe(
      (data) => (this.transacciones = data),
      (error) => console.error('Error al cargar transacciones', error)
    );
  }

  createTransaccion(): void {
    if (this.newTransaccionForm.valid) {
      const transaccion: TransaccionInterna = this.newTransaccionForm.value;
      this.transaccionInternaService.createTransaccion(transaccion).subscribe(
        (data) => {
          console.log('Transacción creada', data);
          this.loadTransacciones();
        },
        (error) => console.error('Error al crear transacción', error)
      );
    }
  }
}
