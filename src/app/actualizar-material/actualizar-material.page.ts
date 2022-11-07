import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { APIRESTService } from '../services/apirest.service';
import { Material } from '../shared/Material';
import { MaterialService } from '../services/proveedores/material.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Params, ActivatedRoute } from '@angular/router';

import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { valorZeroValidator } from '../shared/ValidarZero-Directive';
import { NfcService } from '../services/nfc.service';


@Component({
  selector: 'app-actualizar-material',
  templateUrl: './actualizar-material.page.html',
  styleUrls: ['./actualizar-material.page.scss'],
})
export class ActualizarMaterialPage implements OnInit {


  @Input()
  materialId: number;

  materialForm: FormGroup;
  material: Material = { Id_Material: 0, Descripcion: "", Cantidad_Existente: 0, Id_Tarjeta_NFC: 0 };
  formErrors = {
    'Id_Material': "",
    'Descripcion': "",
    'Cantidad_Existente': "",
    'Id_Tarjeta_NFC': ""

  };

  validationMessages = {
    'Id_Material': {
      'required': 'El Id Material es requerido',
      'valorZero': 'El Id Material No Puede ser 0',
    },

    'Descripcion': {
      'required': 'La descripción del material es requerida'
    },

    'Cantidad_Existente': {
      'required': 'La cantidad existente del material es requerida',
      'valorZero': 'La cantidad existente No Puede ser 0'
    },

    'Id_Tarjeta_NFC': {
      'required': 'El Id de la Tarjeta NFC es requerido',
      'valorZero': 'El Id de la Tarjeta NFC No Puede ser 0'
    }

  }


  @ViewChild('fform') materialFormDirective: any;



  constructor(
    private apirest: APIRESTService, private MaterialService: MaterialService
    , private alertController: AlertController, private router: Router
    , private fb: FormBuilder
    , private nfc: NfcService
    ,private route:ActivatedRoute
  ) {
    
    this.apirest.validarRolUsuario();
    let materialId=this.route.snapshot.params['id'];
    console.log('Id Material Recibido: '+materialId);

    this.createForm(materialId);
  }

  ngOnInit() {
  }


  public valorZero: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const valor = control.value;
    //console.log('Valor obtenido en el validador: '+valor);
    if (valor === 0) {
      return { valorZero: { value: control.value } };
    }
    return null;
  };

  createForm(materialId:number): void {
    console.log('Id Material Recibido: '+materialId);
    this.MaterialService.materiales.forEach(material=>{
      console.log('Id Material a comparar: '+material.Id_Material);
      if(material.Id_Material==materialId){
        console.log('Logro encontrar el material: '+materialId);
        this.material=material;
      }
    });
    console.log('Creara el formulario');
    this.materialForm = this.fb.group({
      Id_Material: [this.material.Id_Material, [Validators.required, this.valorZero]],
      Descripcion: [this.material.Descripcion, [Validators.required]],
      Cantidad_Existente: [this.material.Cantidad_Existente, [Validators.required, valorZeroValidator]],
      Id_Tarjeta_NFC: [this.material.Id_Tarjeta_NFC, [Validators.required, valorZeroValidator]]

    });
    this.materialForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); //Resetear los mensajes de validacion

  }

  onValueChanged(data?: any): void {
    if (!this.materialForm) {
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
      header: 'Material Actualizado',
      //subHeader: 'Important message',
      //message: 'Vuelva a iniciar sesión por favor!',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async materialAlert() {
    const alert = await this.alertController.create({
      header: 'Material No Actualizado',
      subHeader: 'Vuelva a Ingresar la información del Material a Actulizar',
      //message: 'Asegurese de utilizar un Id Material que no exista en el Sistema!',
      buttons: ['OK'],
    });
    await alert.present();
  }

  resetearForm(): void {
    this.materialForm.reset({
      Id_Material: 0,
      Descripcion: '',
      Cantidad_Existente: 0,
      Id_Tarjeta_NFC: 0
    });
    this.materialFormDirective.resetForm();
  }

  generarNFC(): void {
    try {
      this.nfc.leerNFC().subscribe((etiqueta) => {
        console.log('Respuesta obtenida en Nuevo Material: '+etiqueta);
        console.log(etiqueta);

        //this.material.Id_Tarjeta_NFC = this.MaterialService.materiales.length + 1;
        this.material.Id_Tarjeta_NFC = +etiqueta;
        this.materialForm.controls['Id_Tarjeta_NFC'].setValue(this.material.Id_Tarjeta_NFC);
        this.nfc.closeNFC();
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


  actualizarMaterial(): void {
    let url = "material/actualizar";
    this.material = this.materialForm.value;
    console.log(this.material);
    this.apirest.actualizarMaterial(url, this.material).subscribe(
      materiales => {
        console.log(materiales);
        this.MaterialService.materiales.forEach(material=>{
          if(material.Id_Material===this.material.Id_Material){
            material=this.material;
          }
        });
        this.resetearForm();
        this.presentAlert();
        this.router.navigate(['/menu']);

        //Esto de empujar a la lista de Materiales lo hará Soporte

      }, err => {
        // Puedes pasarle el err en caso de que mandes el mensaje desde el
        console.log('Material no actualizado');
        console.log(err);
        this.materialAlert();
      }
    );
  }


}
