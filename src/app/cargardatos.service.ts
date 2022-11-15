import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CargardatosService {

  constructor(private http: HttpClient) { }

  // Funcion para hacer un post al API usa la URL publica de la VM donde esta el backend y recibe un dato con la informacion a enviar
  // Este dato es de tipo objeto con amount, description, department, responsable
  postDato(dato: any) {
    return this.http.post('http://34.173.45.52:5000/', dato);
  }
}
