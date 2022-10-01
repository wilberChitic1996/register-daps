import { Component } from '@angular/core';
import { APIRESTService } from '../services/apirest.service';
import { Registro } from '../shared/Registro';

@Component({
  selector: 'app-newregister',
  templateUrl: 'newregister.page.html',
  styleUrls: ['newregister.page.scss']
})
export class NewRegisterPage {

  NewRegistros:Registro[];

  constructor(private apirest:APIRESTService) {}

  ngOnInit() {
    this.obtenerNewRegister();
  }

  obtenerNewRegister():void {
    let url='http://127.0.0.1:8000/registro';
    this.apirest.obtenerNewRegister(url).subscribe(
      registro=>{
        console.log(registro);
        this.NewRegistros=registro;
      },
      error=>{
        console.log('No pudo guardar registro');
        console.log(error);
      }

    );

  }

}
