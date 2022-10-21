import { Component, OnInit } from '@angular/core';
import { APIRESTService } from '../services/apirest.service';
import { Material } from '../shared/Material';
import { MaterialService } from '../services/proveedores/material.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
})
export class InventarioPage implements OnInit {



  materiales:Material[];

  constructor(private materialesservice:MaterialService) { }

  ngOnInit() {
    this.materiales=this.materialesservice.materiales;
  }

  ionViewWillEnter(){
    this.materialesservice.obtenerMateriales();
  }

  ionViewDidEnter(){
    this.materiales=this.materialesservice.materiales;
  }

  filtarRegistros():void{
    
  }
}
