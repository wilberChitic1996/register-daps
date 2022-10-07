import { Component, OnInit } from '@angular/core';
import { APIRESTService } from '../services/apirest.service';
import { Material } from '../shared/Material';

@Component({
  selector: 'app-nuevo-material',
  templateUrl: './nuevo-material.page.html',
  styleUrls: ['./nuevo-material.page.scss'],
})
export class NuevoMaterialPage implements OnInit {

  material:Material;

  constructor(private apirest:APIRESTService) {

  }

  ngOnInit() {
  }

  sendMaterial():void{
    let url="material";
    this.apirest.enviarNuevoMaterial(url, this.material).subscribe(
      materiales =>{
        console.log(materiales);
        //Esto de empujar a la lista de Materiales lo hará Soporte

      }, err => {
        // Puedes pasarle el err en caso de que mandes el mensaje desde el
        console.log('Material no ingresado');
        console.log(err);
      }
    );
  }


}
