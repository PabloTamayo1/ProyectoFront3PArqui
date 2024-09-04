import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent implements OnInit {
  usuarios: Usuario[] = [];
  newUsuarioRestForm: FormGroup;
  newUsuarioGraphQLForm: FormGroup;
  displayedColumns: string[] = [
    'nombre',
    'correoElectronico',
    'numeroIdentificacion',
    'ingresosMensuales',
    'direccion',
    'acciones',
  ];

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.newUsuarioRestForm = this.fb.group({
      nombre: [null, Validators.required],
      correoElectronico: [null, [Validators.required, Validators.email]],
      numeroIdentificacion: [null, Validators.required],
      ingresosMensuales: [null, Validators.required],
      direccion: [null, Validators.required],
    });

    this.newUsuarioGraphQLForm = this.fb.group({
      nombre: [null, Validators.required],
      correoElectronico: [null, [Validators.required, Validators.email]],
      numeroIdentificacion: [null, Validators.required],
      ingresosMensuales: [null, Validators.required],
      direccion: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.usuarioService.getUsuariosREST().subscribe(
      (data) => (this.usuarios = data),
      (error) => console.error('Error al cargar usuarios REST', error)
    );
  }

  loadUsuario(id: number): void {
    this.usuarioService.getUsuarioREST(id).subscribe(
      (data) => console.log('Usuario cargado', data),
      (error) => console.error('Error al cargar usuario REST', error)
    );
  }

  createUsuarioRest(): void {
    if (this.newUsuarioRestForm.valid) {
      const usuario: Usuario = this.newUsuarioRestForm.value;
      this.usuarioService.createUsuarioREST(usuario).subscribe(
        (data) => {
          console.log('Usuario creado', data);
          this.loadUsuarios();
        },
        (error) => console.error('Error al crear usuario REST', error)
      );
    }
  }

  createUsuarioGraphQL(): void {
    if (this.newUsuarioGraphQLForm.valid) {
      const usuario: Usuario = this.newUsuarioGraphQLForm.value;
      this.usuarioService.createUsuarioGraphQL(usuario).subscribe(
        (data) => {
          console.log('Usuario creado con GraphQL', data);
          this.loadUsuarios();
        },
        (error) => console.error('Error al crear usuario con GraphQL', error)
      );
    }
  }

  deleteUsuario(id: number): void {
    if (id !== undefined && id !== null) {
      this.usuarioService.deleteUsuarioREST(id).subscribe(
        () => {
          console.log('Usuario eliminado');
          this.loadUsuarios();
        },
        (error) => console.error('Error al eliminar usuario REST', error)
      );
    }
  }
}
