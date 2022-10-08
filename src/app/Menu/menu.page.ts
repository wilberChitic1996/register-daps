import { Component, OnInit } from '@angular/core';
import { MaterialService } from '../services/proveedores/material.service';
import { RegistroService } from '../services/proveedores/registro.service';
import { EmpleadoService } from '../services/proveedores/empleado.service';
import { UsuariosService } from '../services/proveedores/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.page.html',
  styleUrls: ['menu.page.scss']
})
export class MenuPage implements OnInit {

  MenuPrincipal = [];

  constructor(private materialservice:MaterialService,
    private registroservice:RegistroService,
    private empleadoservice:EmpleadoService,
    private usuarioservice:UsuariosService
    , private router:Router) {

      /*console.log(this.materialservice.materiales);
      console.log(this.registroservice.registros);
      console.log(this.empleadoservice.empleados);
      console.log(this.usuarioservice.usuarios);*/

  }
  ngOnInit(): void {
    console.log("Se inicializo el menu");
      this.materialservice.obtenerMateriales();
      this.registroservice.obtenerRegistros();
      this.empleadoservice.obtenerEmpleados();
      this.usuarioservice.obtenerUsuarios();
  }

  nuevoRegistro(){
    this.router.navigate(['/newregister']);
  }



}
