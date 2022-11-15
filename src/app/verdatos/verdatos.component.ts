import { Component, OnInit } from '@angular/core';
import { VerdatosService } from '../verdatos.service'
import { first } from 'rxjs';
@Component({
  selector: 'app-verdatos',
  templateUrl: './verdatos.component.html',
  styleUrls: ['./verdatos.component.css']
})
export class VerdatosComponent implements OnInit {

  constructor(private datossrv: VerdatosService) { }

  // Array donde se van a almacenar los datos obtenidos del API
  datos: Array<any> = []

  // Arrays auxiliares para desplegar la informacion en la pagina 
  departamentos: Array<any> = []
  top3Gastos: Array<any> = []

  // Variable que controla el gasto total entre todos los departamentos 
  gastoTotal: number = 0

  // Variable que controla el mes actual
  mes!:string 

  ngOnInit(): void {
    // Se obtienen los datos del API al iniciar y se inicia la logica de calculo de gastos
    this.datossrv.getDatos().pipe(first()).subscribe(response => { this.datos = response; this.gastosPorDepartamento() });
    this.mesNombre()
  }

  // Funcion que obtiene el mes actual y lo indica como nombre en lugar de numero
  mesNombre() {
    const mes = new Date().getMonth()
    const meses: Array<string> = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    this.mes = meses[mes]
  }

  // Funcion que suma los gastos de un departamento y el gasto total
  // Entradas el departamento el gasto de ese dato
  sumarGasto(departamento:string, gasto:number) {
    for (let dep of this.departamentos) {
      if (dep.departamento == departamento) {
        dep.gasto = dep.gasto + gasto
        this.gastoTotal = this.gastoTotal + gasto
      }
    }
  }

  // Funcion que verifica si un dato esta en una lista
  // Salida un valor true si esta en la lista o false si no lo esta
  estaEn(departamento: string,lista: Array<any>) {
    var resultado: boolean = false
    for (let dep of lista) {
      if (dep.departamento == departamento) {
        resultado = true
      }
    }
    return resultado
  }

  // Funcion que revisa la lista con el departamento y su gasto total y filtra los tres con mayores gastos en una nueva lista hasta que tiene los tres con mas gastos
  filtrarMayoresGastos() {
    var depaux = { "departamento": "", "gasto": 0 }
    while (this.top3Gastos.length < 3) {
      // Revisa cada departamento mientras aun no esten los tres con mas gastos, actualiza la variable auxiliar al departamento con mas gastos que no este ya en la lista
      for (let dep of this.departamentos) {
        if (dep.gasto > depaux.gasto && this.estaEn(dep.departamento, this.top3Gastos) == false) {
          depaux = dep
        }
      }
      // Al final agrega la variable auxiliar con el departamento con mas gastos a la lista de los tres con mas gastos
      this.top3Gastos.push(depaux)
      depaux = { "departamento": "", "gasto": 0 }
    }

  }

  // Funcion que inicia el proceso de sumar los gastos totales de cada departamento y llama a la que filtra los tres con mas gastos
  gastosPorDepartamento() {
    for (let dep of this.datos) {
      // Si es la primera vez que aparece el departamento lo agrega a la lista de departamentos y suma su gasto al gasto total
      if (this.estaEn(dep.department, this.departamentos) == false) {
        this.departamentos.push({ "departamento": dep.department, "gasto": dep.amount })
        this.gastoTotal = this.gastoTotal + dep.amount
      }
      // Si ya estaba el departamento en la lista suma el nuevo gasto al total del departamento 
      else {
        this.sumarGasto(dep.department,dep.amount)
      }
    }
    // Al finalizar filtra los 3 con mas gastos
    this.filtrarMayoresGastos()
  }

}
