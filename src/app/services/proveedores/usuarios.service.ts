import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/shared/Usuario';
import { APIRESTService } from '../apirest.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  usuarios:Usuario[];

  constructor(private apirest:APIRESTService) { }

  obtenerUsuarios(){
    let url="usuario";
    this.apirest.obtenerUsuarios(url).subscribe(usuarios => {
            // Entra aquí con respuesta del servicio correcta código http 200
            console.log(usuarios);
            this.usuarios=usuarios;
        }, err => {
            // Puedes pasarle el err en caso de que mandes el mensaje desde el
            console.log('Sucedio un error al obtener los Usuarios del RestAPI');
            console.log(err);
        }
    );
  }
}
