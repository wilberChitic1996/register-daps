import { Component, OnInit } from '@angular/core';
import { APIRESTService } from '../services/apirest.service';
import { Material } from '../shared/Material';
import { MaterialService } from '../services/proveedores/material.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-material',
  templateUrl: './nuevo-material.page.html',
  styleUrls: ['./nuevo-material.page.scss'],
})
export class NuevoMaterialPage implements OnInit {

  material:Material={Id_Material:0, Descripcion:"", Cantidad_Existente:0, Id_Tarjeta_NFC:0};

  constructor(private apirest:APIRESTService, private MaterialService:MaterialService
    , private alertController:AlertController, private router:Router) {

  }

  ngOnInit() {

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Material Ingresado',
      //subHeader: 'Important message',
      //message: 'Vuelva a iniciar sesión por favor!',
      buttons: ['OK'],
    });
    await alert.present();
  }

  sendMaterial():void{
    let url="material/guardar";
    this.apirest.enviarNuevoMaterial(url, this.material).subscribe(
      materiales =>{
        console.log(materiales);
        this.MaterialService.materiales.push(this.material);
        this.presentAlert();
        this.router.navigate(['/menu']);

        //Esto de empujar a la lista de Materiales lo hará Soporte

      }, err => {
        // Puedes pasarle el err en caso de que mandes el mensaje desde el
        console.log('Material no ingresado');
        console.log(err);
      }
    );
  }

  generarNFC():void{
    this.material.Id_Tarjeta_NFC=this.MaterialService.materiales.length+1;
  }

}
