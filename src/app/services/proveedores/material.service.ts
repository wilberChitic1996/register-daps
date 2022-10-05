import { Injectable } from '@angular/core';
import { Material } from '../../shared/Material';
import { APIRESTService } from '../apirest.service';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  materiales:Material[];

  constructor(private apirest:APIRESTService) {

  }


  obtenerMateriales(){
    let url="material";
    this.apirest.obtenerMateriales(url).subscribe(materiales => {
            // Entra aquí con respuesta del servicio correcta código http 200
            console.log(materiales);
            this.materiales=materiales;
        }, err => {
            // Puedes pasarle el err en caso de que mandes el mensaje desde el
            console.log('Sucedio un error al obtener los Materiales del RestAPI');
            console.log(err);
        }
    );
  }

}
