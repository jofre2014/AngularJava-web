import { Injectable } from '@angular/core';
import { Cliente } from '../clientes/cliente';
import { CLIENTES } from '../clientes/clietnes.json';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})
export class ClientesService {

private urlEndPoint = 'http://localhost:8082/api/clientes';


private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient,
              private router: Router) { }

  getClientes(): Observable<Cliente[]>{
    // return of(CLIENTES)
    return this.http.get(this.urlEndPoint).pipe(
      map( response => response as Cliente[] ) // con map, convertimos el response devuelto a un array de Cliente
    );
  }
  
  // Método para crear cliente
  create(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpHeaders});
  }

  // Método para recuperar cliente por id
  getCliente(id): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError( e=> { // Con catchError capturamos el error y lo mostramos con SweetAlert2
        console.error(e.error.mensaje);
        this.router.navigate(['/clientes']);

        swal('Error al editar', e.error.mensaje, 'error');
        return throwError(e); // throwError permite convertir la función en un observable, que es el typo de datos que hay que devolver

      })
    );
  }

  // Método para hacer update de cliente
  update(cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders});
  }

  // Método para eliminar cliente
  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders});
  }

}
