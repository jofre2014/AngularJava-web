import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';

import { ClientesService } from '../services/clientes.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: []
})
export class ClientesComponent implements OnInit {
  
  clientes: Cliente[];
  constructor(private clienteService: ClientesService) { }

  ngOnInit() {
    this.clienteService.getClientes().subscribe(
      clientesDevueltos => this.clientes = clientesDevueltos
    );
  }

  delete(cliente: Cliente): void {


    const swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
    })
    
    swalWithBootstrapButtons({
      title: '¿Está seguro?',
      text: `¿Está seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.clienteService.delete(cliente.id).subscribe(
          response => {
                        
            // Actualizamos la lista de clientes que se muestra en pantalla, filtrando por los clientes que sean distintos al eliminado.
            this.clientes = this.clientes.filter(cli => cli !== cliente);
            swalWithBootstrapButtons(
              'Cliente Eliminado!',
              `Cliente ${cliente.nombre} ${cliente.apellido} eliminado con éxito!`,
              'success'
            );
          }
        );
      }
    });
  }

}
