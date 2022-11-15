import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VerdatosService {

  constructor(private http: HttpClient) { }

  // Metodo que se comunica con el backend para obetener la informacion de la base de datos
  getDatos() {
    return this.http.get<Array<any>>('http://34.173.45.52:5000/');
  }
}
