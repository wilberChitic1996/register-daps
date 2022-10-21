import { Component, OnInit } from '@angular/core';
import { APIRESTService } from '../services/apirest.service';
import { Registro } from '../shared/Registro';
import { RegistroService } from '../services/proveedores/registro.service';
import { MaterialService } from '../services/proveedores/material.service';
import { Usuario } from '../shared/Usuario';
import { UsuariosService } from '../services/proveedores/usuarios.service';
import { EmpleadoService } from '../services/proveedores/empleado.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage implements OnInit {


  filtro:string='';
  registrosBackup:Registro[];
  registros:Registro[];

  constructor(private registroservice:RegistroService
    , private materialesservices:MaterialService,
    private usuarioservice:UsuariosService,
    private empleadoservice:EmpleadoService) {

  }

  ngOnInit() {
    this.obtenerRegistros();
  }

  ionViewWillEnter(){
    this.registroservice.obtenerRegistros();
  }

  ionViewDidEnter(){
    this.obtenerRegistros();
  }

  obtenerRegistros():void {
    this.registros=this.registroservice.registros;
    //Aquí hay que filtrar y obtener la descripción
    this.registros.forEach(registro => {
      this.materialesservices.materiales.forEach(
        material=>{
          if(registro.Id_Material===material.Id_Material){
            registro.Descripcion=material.Descripcion;
          }
        }
      );

      this.usuarioservice.usuarios.forEach(
        usuario=>{
          if(registro.Id_Usuario===usuario.Id_Usuario){
            registro.Usuario=usuario.Usuario;
          }
        }
      );

      this.empleadoservice.empleados.forEach(
        empleado=>{
          if(registro.Ficha===empleado.Ficha){
            registro.Empleado=empleado.Nombre;
          }
        }
      );

    });

    this.registrosBackup=this.registros;


  }

  filtarRegistros():void{
    if(this.filtro.length===0){
      this.registros=this.registrosBackup;
    }else{
      this.registros=this.registrosBackup.filter(material=>{
        if(material.Descripcion.toUpperCase().startsWith(this.filtro.toUpperCase())){
          return true;
        }
        return false;
      });
    }
  }
}
