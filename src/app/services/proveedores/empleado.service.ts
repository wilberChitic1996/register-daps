import { Injectable } from '@angular/core';
import { Empleado } from '../../shared/Empleado';
import { APIRESTService } from '../apirest.service';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  empleados:Empleado[];

  constructor(private apirest:APIRESTService) {

  }

  obtenerEmpleados(){
    let url="empleado";
    this.apirest.obtenerEmpleados(url).subscribe(empleados => {
            // Entra aquí con respuesta del servicio correcta código http 200
            console.log(empleados);
            this.empleados=empleados;
        }, err => {
            // Puedes pasarle el err en caso de que mandes el mensaje desde el
            console.log('Sucedio un error al obtener los empleados del RestAPI');
            console.log(err);
        }
    );
  }

}
