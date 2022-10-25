import { Component, ViewChild } from '@angular/core';
import { APIRESTService } from '../services/apirest.service';
import { Registro } from '../shared/Registro';
import { Material } from '../shared/Material';
import { MaterialService } from '../services/proveedores/material.service';
import { RegistroService } from '../services/proveedores/registro.service';
import { Router } from '@angular/router';
import { angularMath } from 'angular-ts-math/dist/angular-ts-math/angular-ts-math';
import { AlertController } from '@ionic/angular';
import { DatePipe } from '@angular/common';

import { AbstractControl, FormBuilder, FormGroup,  ValidationErrors,  ValidatorFn,  Validators } from '@angular/forms';
import { NfcService } from '../services/nfc.service';
@Component({
  selector: 'app-newregister',
  templateUrl: 'newregister.page.html',
  styleUrls: ['newregister.page.scss']
})
export class NewRegisterPage {

  registro:Registro={Id_Usuario:0, Id_Material:0, Descripcion:"", Cantidad_Existente:0
          ,Cantidad_Entregada:0, Ficha:0, Id_Registro:0};


  registroForm: FormGroup;

  formErrors={
    'Id_Usuario':"",
    'Id_Material':"",
    'Descripcion':"",
    'Cantidad_Existente':"",
    'Cantidad_Entregada':"",
    'Ficha':""
  };

  validationMessages={
    'Id_Usuario':{
      'required':'El Id Usuario es requerido',
      'valorZero':'El Id Usuario No Puede ser 0'
    },

    'Id_Material':{
      'required':'El Id Material es requerido',
      'valorZero':'El Id Material No Puede ser 0'
    },

    'Descripcion':{
      'required':'La descripcion del material es requerida'
    },

    'Cantidad_Existente':{
      'required':'La cantidad existente del material es requerida',
      'valorZero':'La cantidad existente No Puede ser 0'
    },

    'Cantidad_Entregada':{
      'required':'La cantidad a entregar del material es requerida',
      'valorZero':'La cantidad a entregar No Puede ser 0',
      'cantidadmenor':'La cantidad a entregar del material tiene que ser menor a la cantidad existente'
    },

    'Ficha':{
      'required':'El Numero de Ficha del empleado es requerido',
      'valorZero':'El Numero de Ficha No Puede ser 0'
    }

  }





  @ViewChild('fform') registroFormDirective:any;



  public valorZero: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const valor = control.value;
        //console.log('Valor obtenido en el validador: '+valor);
        if(valor===0){
          return {valorZero:{value: control.value}};
        }
      return null;
  };

  public cantidadentregadamenor: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const cantidadexistente = control.get('Cantidad_Existente');
        const cantidadentregada = control.get('Cantidad_Entregada');
        //console.log('Cantidad Existente: '+cantidadexistente.value);
        //console.log('Cantidad Entregada: '+cantidadentregada.value);
        if(cantidadentregada.value>cantidadexistente.value){
          //console.log('La cantidad a entregar es mayor');
          return {cantidadmenor:{value:false}};
        }
      return null;
  };

  constructor(private apirest:APIRESTService
    ,private materialservice:MaterialService
    ,private registroservice:RegistroService
    ,private router:Router
    ,private alertController:AlertController
    ,public datepipe:DatePipe
    ,private fb:FormBuilder
    ,private nfc:NfcService) {
      this.createForm();
    }

  ngOnInit() {
    this.valoresIniciales();
  }


  createForm(): void {
    this.registroForm=this.fb.group({
      Id_Usuario: [0, [Validators.required, this.valorZero]],
      Id_Material: [0, [Validators.required, this.valorZero]],
      Descripcion: ['', [Validators.required]],
      Cantidad_Existente: [0, [Validators.required, this.valorZero]],
      Cantidad_Entregada: [0, [Validators.required, this.valorZero]],
      Ficha: [0, [Validators.required, this.valorZero]]
    }, {validators:this.cantidadentregadamenor});

    this.registroForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); //Resetear los mensajes de validacion

  }




  onValueChanged(data?:any):void{
    if(!this.registroForm){
      return;
    }



    const form = this.registroForm;


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

    const errors=this.registroForm.errors;
    for(const error in errors){
      console.log('Error: '+error);
      if(error==='cantidadmenor'){
        console.log('Entro al If');
        console.log(this.formErrors['Cantidad_Entregada']);
        this.formErrors['Cantidad_Entregada']+='La cantidad a entregar del material tiene que ser menor o igual a la cantidad existente'+' ';
        console.log(this.formErrors['Cantidad_Entregada']);
      }
    }

  }

  private valoresIniciales():void{
    this.registro.Id_Usuario=this.apirest.usuario.Id_Usuario;
    this.generarNFC();

  }

  private generarNFC():void{
    let idmaterial:number;
    //let idNFC:number=angularMath.getIntegerRandomRange(1, this.materialservice.materiales.length);
    let idNFC:number;
    try {
      this.nfc.leerNFC().subscribe((etiqueta) => {
        console.log('Respuesta obtenida en Nuevo Registro: '+etiqueta);
        console.log(etiqueta);

        //this.material.Id_Tarjeta_NFC = this.MaterialService.materiales.length + 1;
        idNFC=+etiqueta;
        this.nfc.closeNFC();
        this.materialservice.materiales.forEach(material => {
          if(material.Id_Tarjeta_NFC===idNFC){
            idmaterial=material.Id_Material;
          }
        });
        this.registro.Id_Material=idmaterial;
        this.registro.Descripcion=this.generarDescripcion(this.registro.Id_Material);
        this.registro.Cantidad_Existente=this.generarExistencia(this.registro.Id_Material);
        this.registroForm.controls['Id_Usuario'].setValue(this.registro.Id_Usuario);
        this.registroForm.controls['Id_Material'].setValue(this.registro.Id_Material);
        this.registroForm.controls['Descripcion'].setValue(this.registro.Descripcion);
        this.registroForm.controls['Cantidad_Existente'].setValue(this.registro.Cantidad_Existente);
      },
        (error) => {
          console.log('Error capturado al leer tarjeta NFC');
          console.log(error);
          this.nfc.presentAlert();
        }
      );
    } catch (error) {
      console.log('Error capturado al suscribirse al observable que obtiene el IdNFC');
      console.log(error);
    }
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
    console.log("Enviara el Nuevo Registro");
    let url='registro/guardar';
    this.registro = this.registroForm.value;
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

  resetearForm():void{
    this.registroForm.reset({
      Id_Usuario: 0,
      Id_Material: 0,
      Descripcion: '',
      Cantidad_Existente: 0,
      Cantidad_Entregada: 0,
      Ficha: 0
    });
    this.registroFormDirective.resetForm();
  }

}
