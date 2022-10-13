import { Component } from '@angular/core';
import { APIRESTService } from '../services/apirest.service';
import { Registro } from '../shared/Registro';
import { Material } from '../shared/Material';
import { MaterialService } from '../services/proveedores/material.service';
import { RegistroService } from '../services/proveedores/registro.service';
import { Router } from '@angular/router';
import { angularMath } from 'angular-ts-math/dist/angular-ts-math/angular-ts-math';
import { AlertController } from '@ionic/angular';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-newregister',
  templateUrl: 'newregister.page.html',
  styleUrls: ['newregister.page.scss']
})
export class NewRegisterPage {

  registro:Registro={Id_Usuario:0, Id_Material:0, Descripcion:"", Cantidad_Existente:0
          ,Cantidad_Entregada:0, Ficha:0, Id_Registro:0};

  constructor(private apirest:APIRESTService
    ,private materialservice:MaterialService
    ,private registroservice:RegistroService
    ,private router:Router
    ,private alertController:AlertController
    ,public datepipe:DatePipe) {}

  ngOnInit() {
    this.valoresIniciales();
  }

  private valoresIniciales():void{
    this.registro.Id_Usuario=this.apirest.usuario.Id_Usuario;
    this.registro.Id_Material=this.generarNFC();
    this.registro.Descripcion=this.generarDescripcion(this.registro.Id_Material);
    this.registro.Cantidad_Existente=this.generarExistencia(this.registro.Id_Material);

  }

  private generarNFC():number{
    let idmaterial:number;
    let idNFC:number=angularMath.getIntegerRandomRange(1, this.materialservice.materiales.length);
    this.materialservice.materiales.forEach(material => {
      if(material.Id_Tarjeta_NFC===idNFC){
        idmaterial=material.Id_Material;
      }
    });
    return idmaterial;
  }

  private generarDescripcion(idMaterial:number):string{
    let descripcion:string;
    this.materialservice.materiales.forEach(material => {
      if(material.Id_Material===idMaterial){
        descripcion=material.Descripcion;
      }
    });
    return descripcion;
  }

  private generarExistencia(idMaterial:number):number{
    let existencia:number;
    this.materialservice.materiales.forEach(material => {
      if(material.Id_Material===idMaterial){
        existencia=material.Cantidad_Existente;
      }
    });
    return existencia;
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Registro Ingresado',
      subHeader: 'Inventario Actualizado',
      //message: 'Vuelva a iniciar sesión por favor!',
      buttons: ['OK'],
    });
    await alert.present();
  }

  sendNewRegister():void {

    let url='registro/guardar';
    let fecha:Date=new Date();
    this.registro.Fecha_Entrega=this.datepipe.transform(fecha, 'yyyy-MM-dd hh:mm:ss');
    console.log(this.registro);

    this.apirest.enviarNewRegister(url, this.registro).subscribe(
      registro=>{
        console.log(registro);
        this.registro.Id_Registro=registro.Id_Registro;
        this.modificarInventario(this.registro);

      },
      error=>{
        console.log('No pudo guardar registro');
        console.log(error);
      }

    );

  }

  modificarInventario(registro:Registro):void{
    let url="material/actualizar";
    let material:Material;
    this.materialservice.materiales.forEach(material2=>{
        if(material2.Id_Material===registro.Id_Material){
          material=material2;
        }
    });
    material.Cantidad_Existente=material.Cantidad_Existente-this.registro.Cantidad_Entregada;
    this.apirest.actualizarMaterial(url, material).subscribe(
      respuesta=>{
          console.log(respuesta);
          this.materialservice.materiales.forEach(material2=>{
            if(material2.Id_Material===material.Id_Material){
              console.log("Resto la cantidad de materiales: "+this.registro.Cantidad_Entregada);
              console.log("Al Material: "+material2.Descripcion);
              material2.Cantidad_Existente=material.Cantidad_Existente;
            }
        });
        console.log("Actualizo la informacion y agrego el registro");
        this.registroservice.registros.push(this.registro);
        this.presentAlert();
        this.router.navigate(['/menu']);
      },
      error=>{
        console.log('No pudo actualizar el material');
        console.log(error);
      }
    );

  }

}
