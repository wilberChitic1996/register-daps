import { Component, OnInit } from '@angular/core';
import { APIRESTService } from '../services/apirest.service';
import { Material } from '../shared/Material';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
})
export class InventarioPage implements OnInit {



  materiales:Material[];

  constructor(private apirest:APIRESTService) { }

  ngOnInit() {
    let url="http://127.0.0.1:8000/material";
    this.apirest.obtenerMateriales(url).subscribe(
      materiales =>{this.materiales = materiales;
        console.log(this.materiales);
      }, err => {
        // Puedes pasarle el err en caso de que mandes el mensaje desde el
        console.log('No se pudieron obtener los materiales');
        console.log(err);
      }
    );

  }

}
