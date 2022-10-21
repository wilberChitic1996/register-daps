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


  filtro:string='';
  materialesBackup:Material[];
  materiales:Material[];

  constructor(private materialesservice:MaterialService) { }

  ngOnInit() {
    this.materiales=this.materialesservice.materiales;
    this.materialesBackup=this.materiales;
  }

  ionViewWillEnter(){
    this.materialesservice.obtenerMateriales();
  }

  ionViewDidEnter(){
    this.materiales=this.materialesservice.materiales;
    this.materialesBackup=this.materiales;
  }

  filtarRegistros():void{
    if(this.filtro.length===0){
      this.materiales=this.materialesBackup;
    }else{
      this.materiales=this.materialesBackup.filter(material=>{
        if(material.Descripcion.toUpperCase().startsWith(this.filtro.toUpperCase())){
          return true;
        }
        return false;
      });
    }
  }
}
