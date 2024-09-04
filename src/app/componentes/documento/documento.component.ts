import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Documento } from 'src/app/interfaces/documento';
import { DocumentoService } from 'src/app/servicios/documento.service';

@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.scss'],
})
export class DocumentoComponent implements OnInit {
  documentos: Documento[] = [];
  selectedDocumento: Documento | null = null;
  newDocumentoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private documentoService: DocumentoService
  ) {
    this.newDocumentoForm = this.fb.group({
      titulo: [null, Validators.required],
      numero: [null, Validators.required],
      fechaEmision: [null, Validators.required],
      entidadEmisora: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.cargarDocumentos();
  }

  cargarDocumentos(): void {
    this.documentoService.listarDocumentos().subscribe((data) => {
      this.documentos = data;
    });
  }

  obtenerDocumento(id: number): void {
    this.documentoService.obtenerDocumentoPorId(id).subscribe((data) => {
      this.selectedDocumento = data;
    });
  }

  crearDocumento(): void {
    if (this.newDocumentoForm.valid) {
      const documento: Documento = {
        id: 0,
        ...this.newDocumentoForm.value,
      };
      this.documentoService.crearDocumento(documento).subscribe(() => {
        this.cargarDocumentos();
        this.newDocumentoForm.reset();
      });
    }
  }

  eliminarDocumento(id: number): void {
    this.documentoService.eliminarDocumento(id).subscribe(() => {
      this.cargarDocumentos();
    });
  }
}
