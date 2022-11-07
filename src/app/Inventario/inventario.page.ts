import { Component, OnInit } from '@angular/core';
import { APIRESTService } from '../services/apirest.service';
import { Material } from '../shared/Material';
import { MaterialService } from '../services/proveedores/material.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
})
export class InventarioPage implements OnInit {



  filtro:string='';
  materialesBackup:Material[];
  material:Material;
  materiales:Material[];

  constructor(private materialesservice:MaterialService,
    private apirest:APIRESTService
    ,private MaterialService:MaterialService
    ,private alertController:AlertController
    ,private router: Router) { }

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




  async materialAlert() {
    const alert = await this.alertController.create({
      header: 'Material No Pudo ser Eliminado',
      subHeader: 'Vuelva a Intentarlo Por favor!!!',
      //message: 'Asegurese de utilizar un Id Material que no exista en el Sistema!',
      buttons: ['OK'],
    });
    await alert.present();
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Material Eliminado',
      subHeader: 'Material Eliminado del Inventario',
      //message: 'Asegurese de utilizar un Id Material que no exista en el Sistema!',
      buttons: ['OK'],
    });
    await alert.present();
  }

  eliminarMaterial(IdMaterial:number): void {
    if(this.apirest.validarRolUsuario()){
      let url = "material/eliminar";
      console.log('MaterialID recibido: '+IdMaterial);
      this.materialesservice.materiales.forEach(material=>{
        if(material.Id_Material==IdMaterial){
          console.log('Encontro el Material a eliminar');
          this.material=material;
          console.log(this.material);
        }
      });

      //this.material = this.materialForm.value;
      console.log(this.material);
      this.apirest.eliminarMaterial(url, this.material).subscribe(
        materiales => {
          console.log(materiales);
          //Eliminamos el material localmente
          this.MaterialService.materiales=this.MaterialService.materiales.filter(material=>{
            return material.Id_Material!==this.material.Id_Material;
          })

          this.presentAlert();
          this.router.navigate(['/menu']);

          //Esto de empujar a la lista de Materiales lo hará Soporte

        }, err => {
          // Puedes pasarle el err en caso de que mandes el mensaje desde el
          console.log('Material no pudo ser eliminado');
          console.log(err);
          this.materialAlert();
        }
      );
    }
  }

}
