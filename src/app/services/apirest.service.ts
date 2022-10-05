import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from "@angular/common/http";
import { Observable, throwError, from  } from "rxjs";
import { catchError } from "rxjs/operators";
import { Usuario } from '../shared/Usuario';
import { Material } from '../shared/Material';
import { Registro } from '../shared/Registro';
import { Empleado } from '../shared/Empleado';

import { Platform } from '@ionic/angular';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { of } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class APIRESTService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'
  })
  };

  token:string;

  url:string="http://172.24.178.155/";



  constructor(private http: HttpClient, public platform: Platform
    ,private httpnative:HTTP) {
    console.log('Servicio HTTP:');
  }


    setToken(token:string):void{
      console.log("Token recibido en el setToken: "+token);
      this.token=token;
      console.log('Seteo el token al servicio APIREST: '+this.token);
    }

    getAuthorizationToken():string{
      return 'Bearer ' + this.token;
    }



    //Bro, te podes basar en este metodo
    obtenerMateriales(url:string): Observable<Material[]>{
      url=this.url+url;
      return this.http.get<Material[]>(url, this.httpOptions).pipe(
        catchError(err => {
            // onError
            console.log("Error capturado al obtener materiales del servidor");
            console.log(err);
            return throwError(err);
          }
        )
      );
    }

    obtenerRegistros(url:string): Observable<Registro[]>{
      url=this.url+url;
      return this.http.get<Registro[]>(url, this.httpOptions).pipe(
        catchError(err => {
            // onError
            console.log("Error capturado al obtener registros del servidor");
            console.log(err);
            return throwError(err);
          }
        )
      );
    }

    obtenerEmpleados(url:string): Observable<Empleado[]>{
      url=this.url+url;
      return this.http.get<Empleado[]>(url, this.httpOptions).pipe(
        catchError(err => {
            // onError
            console.log("Error capturado al obtener Empleados del servidor");
            console.log(err);
            return throwError(err);
          }
        )
      );
    }

    obtenerUsuarios(url:string): Observable<Usuario[]>{
      url=this.url+url;
      return this.http.get<Usuario[]>(url, this.httpOptions).pipe(
        catchError(err => {
            // onError
            console.log("Error capturado al obtener Usuarios del servidor");
            console.log(err);
            return throwError(err);
          }
        )
      );
    }

    login(url:string , usuario: Usuario): Observable<Usuario> {
      url=this.url+url;
      console.log("Url: "+url);
      console.log("Usuario: "+usuario.Usuario+"  "+usuario.Password);
      let usuarioAuxiliar;
      if (this.platform.is('hybrid')) {

        this.httpnative.post(url, usuario, this.httpOptions).then(data => {
          console.log(data.status);
          console.log(data.data); // data received by server
          console.log(data.headers);
          usuarioAuxiliar=data.data;
          usuario=data.data;
          console.log("Usuario obtenido nativamente: "+usuario.Usuario+"  "+usuario.Password);
          console.log("Usuario obtenido nativamente: "+usuario.token);
        })
        .catch(error => {
          console.log("Error capturado al Logearse en el servidor Nativamente");
          console.log(error.status);
          console.log(error.error); // error message as string
          console.log(error.headers);

        });

        return of(usuarioAuxiliar);

      }else{
        return this.http.post<Usuario>(url, usuario, this.httpOptions).pipe(
          catchError(err => {
              // onError
              console.log("Error capturado al Logearse en el servidor");
              console.log(err.json);
              return throwError(err);
            }
          )
        );
      }

    }



    enviarNuevoMaterial(url:string, material:Material): Observable<Material>{
      url=this.url+url;
      return this.http.post<Material>(url, material, this.httpOptions).pipe(
        catchError(err => {
            // onError
            console.log("Error capturado al enviar materiales al servidor");
            console.log(err);
            return throwError(err);
          }
        )
      );
    }

    enviarNewRegister(url:string, registro:Registro): Observable<Registro>{
      url=this.url+url;
      return this.http.post<Registro>(url, registro, this.httpOptions).pipe(
        catchError(err => {
            // onError
            console.log("Error capturado al enviar registros al servidor");
            console.log(err);
            return throwError(err);
          }
        )
      );
    }


}
