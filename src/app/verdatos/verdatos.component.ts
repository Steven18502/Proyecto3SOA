import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verdatos',
  templateUrl: './verdatos.component.html',
  styleUrls: ['./verdatos.component.css']
})
export class VerdatosComponent implements OnInit {

  constructor() { }

  datos: Array<any> = [{ "monto": 1200, "descripcion": "datos", "responsable": "Pedro", "departamento": "logico" }, { "monto": 1200, "descripcion": "datos", "responsable": "Pedro", "departamento": "logico" }, { "monto": 1200, "descripcion": "datos", "responsable": "Pedro", "departamento": "creativo" },
    { "monto": 1200, "descripcion": "datos", "responsable": "Pedro", "departamento": "finanzas" }, { "monto": 1200, "descripcion": "datos", "responsable": "Pedro", "departamento": "ventas" }, { "monto": 1200, "descripcion": "datos", "responsable": "Pedro", "departamento": "crackheads" },
    { "monto": 1200, "descripcion": "datos", "responsable": "Pedro", "departamento": "admin" }, { "monto": 1200, "descripcion": "datos", "responsable": "Pedro", "departamento": "logico" }, { "monto": 1200, "descripcion": "datos", "responsable": "Pedro", "departamento": "crackheads" },
    { "monto": 1200, "descripcion": "datos", "responsable": "Pedro", "departamento": "admin" }, { "monto": 1200, "descripcion": "datos", "responsable": "Pedro", "departamento": "admin" }, { "monto": 1200, "descripcion": "datos", "responsable": "Pedro", "departamento": "crackheads" }, { "monto": 1200, "descripcion": "datos", "responsable": "Pedro", "departamento": "crackheads" },  ]

  departamentos: Array<any> = []
  top3Gastos: Array<any> = []
  gastoTotal: number = 0

  mes!:string 

  ngOnInit(): void {
    this.mesNombre()
    this.gastosPorDepartamento()
  }


  mesNombre() {
    const mes = new Date().getMonth()
    const meses: Array<string> = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    this.mes = meses[mes]
  }

  sumarGasto(departamento:string, gasto:number) {
    for (let dep of this.departamentos) {
      if (dep.departamento == departamento) {
        dep.gasto = dep.gasto + gasto
        this.gastoTotal = this.gastoTotal + gasto
      }
    }
  }

  estaEn(departamento: string,lista: Array<any>) {
    var resultado: boolean = false
    for (let dep of lista) {
      if (dep.departamento == departamento) {
        resultado = true
      }
    }
    return resultado
  }

  filtrarMayoresGastos() {
    var depaux = { "departamento": "", "gasto": 0 }
    while (this.top3Gastos.length < 3) {
      for (let dep of this.departamentos) {
        if (dep.gasto > depaux.gasto && this.estaEn(dep.departamento, this.top3Gastos) == false) {
          depaux = dep
        }
      }
      this.top3Gastos.push(depaux)
      depaux = { "departamento": "", "gasto": 0 }
    }

  }

  gastosPorDepartamento() {
    for (let dep of this.datos) {
      if (this.estaEn(dep.departamento, this.departamentos) == false) {
        this.departamentos.push({ "departamento": dep.departamento, "gasto": dep.monto })
        this.gastoTotal = this.gastoTotal + dep.monto
      }
      else {
        this.sumarGasto(dep.departamento,dep.monto)
      }
    }
    this.filtrarMayoresGastos()
  }

}
