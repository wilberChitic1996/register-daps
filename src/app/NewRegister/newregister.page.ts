import { Component } from '@angular/core';
import { APIRESTService } from '../services/apirest.service';
import { Registro } from '../shared/Registro';
import { MaterialService } from '../services/proveedores/material.service';
import { RegistroService } from '../services/proveedores/registro.service';
import { EmpleadoService } from '../services/proveedores/empleado.service';
import { UsuariosService } from '../services/proveedores/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newregister',
  templateUrl: 'newregister.page.html',
  styleUrls: ['newregister.page.scss']
})
export class NewRegisterPage {

  registro:Registro;

  constructor(private apirest:APIRESTService,
    private materialservice:MaterialService,
    private registroservice:RegistroService,
    private empleadoservice:EmpleadoService,
    private usuarioservice:UsuariosService
    , private router:Router) {}

  ngOnInit() {

  }

  valoresIniciales():void{
    this.usuarioservice.usuarios.forEach(usuario =>{
      if(usuario.Usuario===this.apirest.usuario.Usuario){
        this.registro.Id_Usuario=usuario.Id_Usuario;
      }

    });

    this.registro.Id_Usuario;
  }



  sendNewRegister():void {
    let url='registro';
    this.apirest.enviarNewRegister(url, this.registro).subscribe(
      registro=>{
        console.log(registro);
        //Insertar a la nueva lista de registros
        //Lo hará Soporte

      },
      error=>{
        console.log('No pudo guardar registro');
        console.log(error);
      }

    );

  }

}
