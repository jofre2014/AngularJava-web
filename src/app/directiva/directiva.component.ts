import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.css']
})
export class DirectivaComponent implements OnInit {
  
  listaCurso: string[] = ['TypeScript','JavaScript', 'Java', 'PHP', 'RubyOnRails','Angular'];

  habilitado: boolean = true;
  constructor() { }

  ngOnInit() {
  }

  setHabilitar(){
    this.habilitado = (this.habilitado == true)? false:true;
  }

}
