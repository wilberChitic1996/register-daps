import { Component } from '@angular/core';
import { APIRESTService } from '../services/apirest.service';
import { Registro } from '../shared/Registro';

@Component({
  selector: 'app-newregister',
  templateUrl: 'newregister.page.html',
  styleUrls: ['newregister.page.scss']
})
export class NewRegisterPage {

  registro:Registro;

  constructor(private apirest:APIRESTService) {}

  ngOnInit() {
    this.obtenerNewRegister();
  }

  obtenerNewRegister():void {
    let url='registro';
    this.apirest.enviarNewRegister(url, this.registro).subscribe(
      registro=>{
        console.log(registro);
        //Insertar a la nueva lista de registros
        //Lo hará Soporte

      },
      error=>{
        console.log('No pudo guardar registro');
        console.log(error);
      }

    );

  }

}
