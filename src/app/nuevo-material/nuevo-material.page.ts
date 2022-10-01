import { Component, OnInit } from '@angular/core';
import { APIRESTService } from '../services/apirest.service';
import { Material } from '../shared/Material';

@Component({
  selector: 'app-nuevo-material',
  templateUrl: './nuevo-material.page.html',
  styleUrls: ['./nuevo-material.page.scss'],
})
export class NuevoMaterialPage implements OnInit {

  materiales:Material[];

  constructor(private apirest:APIRESTService) { 
    let url="http://127.0.0.1:8000/material";
    this.apirest.obtenerNuevoMaterial(url).subscribe(
      materiales =>{this.materiales = materiales;
        console.log(this.materiales);
      }, err => {
        // Puedes pasarle el err en caso de que mandes el mensaje desde el
        console.log('Material no ingresado');
        console.log(err);
      }
    );
  }

  ngOnInit() {
  }

}
