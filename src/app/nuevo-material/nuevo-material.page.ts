import { Component, OnInit, ViewChild } from '@angular/core';
import { APIRESTService } from '../services/apirest.service';
import { Material } from '../shared/Material';
import { MaterialService } from '../services/proveedores/material.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { AbstractControl, FormBuilder, FormGroup,  ValidationErrors,  ValidatorFn,  Validators } from '@angular/forms';
import { valorZeroValidator} from '../shared/ValidarZero-Directive';

@Component({
  selector: 'app-nuevo-material',
  templateUrl: './nuevo-material.page.html',
  styleUrls: ['./nuevo-material.page.scss'],
})
export class NuevoMaterialPage implements OnInit {

  materialForm: FormGroup;

  formErrors={
    'Id_Material':"",
    'Descripcion':"",
    'Cantidad_Existente':"",
    'Id_Tarjeta_NFC':""

  };

  validationMessages={
    'Id_Material':{
      'required':'El Id Material es requerido',
      'valorZero':'El Id Material No Puede ser 0'
    },

    'Descripcion':{
      'required':'La descripción del material es requerida'
    },

    'Cantidad_Existente':{
      'required':'La cantidad existente del material es requerida',
      'valorZero':'La cantidad existente No Puede ser 0'
    },

    'Id_Tarjeta_NFC':{
      'required':'El Id de la Tarjeta NFC es requerido',
      'valorZero':'El Id de la Tarjeta NFC No Puede ser 0'
    }

  }


  @ViewChild('fform') materialFormDirective:any;

  material:Material={Id_Material:0, Descripcion:"", Cantidad_Existente:0, Id_Tarjeta_NFC:0};

  constructor(private apirest:APIRESTService, private MaterialService:MaterialService
    , private alertController:AlertController, private router:Router
    ,private fb:FormBuilder) {
      this.createForm();

  }

  ngOnInit() {

  }

  createForm(): void {
    this.materialForm=this.fb.group({
      Id_Material: [0, [Validators.required, valorZeroValidator]],
      Descripcion: ['', [Validators.required]],
      Cantidad_Existente: [0, [Validators.required, valorZeroValidator]],
      Id_Tarjeta_NFC: [0, [Validators.required, valorZeroValidator]]

    });
    this.materialForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); //Resetear los mensajes de validacion

  }

  onValueChanged(data?:any):void{
    if(!this.materialForm){
      return;
    }

    const form = this.materialForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }

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
    this.material = this.materialForm.value;
    console.log(this.material);
    this.apirest.enviarNuevoMaterial(url, this.material).subscribe(
      materiales =>{
        console.log(materiales);
        this.MaterialService.materiales.push(this.material);
        this.resetearForm();
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

  resetearForm():void{
    this.materialForm.reset({
      Id_Material: 0,
      Descripcion: '',
      Cantidad_Existente: 0,
      Id_Tarjeta_NFC: 0
    });
    this.materialFormDirective.resetForm();
  }

  generarNFC():void{
    this.material.Id_Tarjeta_NFC=this.MaterialService.materiales.length+1;
    this.materialForm.controls['Id_Tarjeta_NFC'].setValue(this.material.Id_Tarjeta_NFC);
  }

}
