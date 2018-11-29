import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClientesService } from '../services/clientes.service';
import { Router,ActivatedRoute } from '@angular/router';

import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: []
})
export class FormComponent implements OnInit {

private cliente: Cliente = new Cliente();
private titulo: string = 'Crear Cliente';
  constructor(private clienteService: ClientesService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCliente();
  }

  cargarCliente(): void{
    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id'];
        if(id){
          this.clienteService.getCliente(id).subscribe(
            response => this.cliente = response
          );
        }
      }
    )
  }


  create(): void {
    this.clienteService.create(this.cliente).subscribe(
      response => {
        this.router.navigate(['/clientes']);
        swal('Cliente Guardado', `El cliente : ${response.nombre} ha sido creado con éxito!`, 'success' );
      }
    );
  }

  update(): void {
    this.clienteService.update(this.cliente).subscribe(
      res => {
        this.router.navigate(['/clientes']);
        swal('Cliente Actualizado', `${res.mensaje} : ${res.cliente.nombre}`, 'success');
      }
    );
  }

}
