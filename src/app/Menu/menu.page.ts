import { Component } from '@angular/core';
import { MaterialService } from '../services/proveedores/material.service';
import { RegistroService } from '../services/proveedores/registro.service';
import { EmpleadoService } from '../services/proveedores/empleado.service';
import { UsuariosService } from '../services/proveedores/usuarios.service';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.page.html',
  styleUrls: ['menu.page.scss']
})
export class MenuPage {

  MenuPrincipal = [];

  constructor(private materialservice:MaterialService,
    private registroservice:RegistroService,
    private empleadoservice:EmpleadoService,
    private usuarioservice:UsuariosService) {
      this.materialservice.obtenerMateriales();
      this.registroservice.obtenerRegistros();
      this.empleadoservice.obtenerEmpleados();
      this.usuarioservice.obtenerUsuarios();
      /*console.log(this.materialservice.materiales);
      console.log(this.registroservice.registros);
      console.log(this.empleadoservice.empleados);
      console.log(this.usuarioservice.usuarios);*/
  }


}
