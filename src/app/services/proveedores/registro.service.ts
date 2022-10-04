import { Injectable } from '@angular/core';
import { Registro } from 'src/app/shared/Registro';
import { APIRESTService } from '../apirest.service';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  registros:Registro[];

  constructor(private apirest:APIRESTService) {

  }

  obtenerRegistros(){
    let url="registro";
    this.apirest.obtenerRegistros(url).subscribe(registros => {
            // Entra aquí con respuesta del servicio correcta código http 200
            console.log(registros);
            this.registros=registros;
        }, err => {
            // Puedes pasarle el err en caso de que mandes el mensaje desde el
            console.log('Sucedio un error al obtener los Registros del RestAPI');
            console.log(err);
        }
    );
  }

}
