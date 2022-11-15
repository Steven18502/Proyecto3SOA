import { Component, OnInit } from '@angular/core';
import * as internal from 'stream';
import { CargardatosService } from '../cargardatos.service'
import { first } from 'rxjs';

@Component({
  selector: 'app-cargardatos',
  templateUrl: './cargardatos.component.html',
  styleUrls: ['./cargardatos.component.css']
})
export class CargardatosComponent implements OnInit {

  // Variables vinculadas a los inputs
  monto!: number
  descripcion!: string
  responsable!: string
  departamento!: string
  // Variable de control para revisar datos completos
  datosincompletos: boolean = true

  constructor(private cargarsrv: CargardatosService) { }

  ngOnInit(): void {
  }

  //Funcion que revisa que los espacios requeridos no esten en blanco
  //Cambia la variable de datos incompletos a false en caso que todos los epsacios tengan informacion
  validarDatos() {
    if (this.monto == 0 || this.monto == undefined || this.descripcion == "" || this.descripcion == undefined || this.responsable == "" || this.responsable == undefined || this.departamento == "" || this.departamento == undefined) {
      this.datosincompletos = true
    }
    else {
      this.datosincompletos = false
    }
  }

  //Funcion que limpia los inputs luego de subir un dato de forma correcta
  refrescar() {
    this.monto = 0
    this.departamento = ""
    this.descripcion = ""
    this.responsable = ""
  }

  //Funcion para cargar datos, llamada a validar datos y en caso que los dattos esten completos genera un nuevo dato con la informacion de los inputs y lo envia al API
  cargarDatos() {
    this.validarDatos()
    if (this.datosincompletos == false) {
      const dato = { "amount": this.monto, "department": this.departamento, "description": this.descripcion, "responsable": this.responsable }
      console.log(dato)
      this.cargarsrv.postDato(dato).pipe(first()).subscribe(response => {});
      this.refrescar()
    }
  }

}
