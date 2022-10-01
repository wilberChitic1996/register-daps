import { Component, OnInit } from '@angular/core';
import { APIRESTService } from '../services/apirest.service';
import { Registro } from '../shared/Registro';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage implements OnInit {


  registros:Registro[];

  constructor(private apirest:APIRESTService) { 
  
  }

  ngOnInit() {
    this.obtenerRegistros();
  }

  obtenerRegistros():void {
    let url='http://127.0.0.1:8000/registro';
    this.apirest.obtenerRegistros(url).subscribe(
      registro=>{
        console.log(registro);
        this.registros=registro;
      },
      error=>{
        console.log('No pudo obtener los registros');
        console.log(error);
      }

    );


  }

}
