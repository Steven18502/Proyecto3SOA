import { Component, OnInit } from '@angular/core';
import * as internal from 'stream';

@Component({
  selector: 'app-cargardatos',
  templateUrl: './cargardatos.component.html',
  styleUrls: ['./cargardatos.component.css']
})
export class CargardatosComponent implements OnInit {

  monto!: number
  descripcion!: string
  responsable!: string
  departamento!: string
  datosincompletos: boolean = true

  constructor() { }

  ngOnInit(): void {
  }


  validarDatos() {
    if (this.monto == undefined || this.descripcion == "" || this.descripcion == undefined || this.responsable == "" || this.responsable == undefined || this.departamento == "" || this.departamento == undefined) {
      this.datosincompletos = true
    }
    else {
      this.datosincompletos = false
    }

  }
  cargarDatos() {
    this.validarDatos()
    console.log(this.datosincompletos)
    if (this.datosincompletos == false) {
      console.log(this.monto)
      console.log(this.departamento)
      console.log(this.descripcion)
      console.log(this.responsable)
    }
  }

}
