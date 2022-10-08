import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from "@angular/common/http";
import { Observable, throwError, from  } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Usuario } from '../shared/Usuario';
import { Material } from '../shared/Material';
import { Registro } from '../shared/Registro';
import { Empleado } from '../shared/Empleado';

import { AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';


import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class APIRESTService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'
  })
  };

  token:string;

  //url:string="http://172.24.178.155/";
  url:string="http://172.22.2.78/";



  constructor(private http: HttpClient, public platform: Platform
    , private alertController:AlertController,
    private router:Router) {
    console.log('Servicio HTTP:');
  }

    async presentAlert() {
      const alert = await this.alertController.create({
        header: 'Sesión Caducada',
        //subHeader: 'Important message',
        message: 'Vuelva a iniciar sesión por favor!',
        buttons: ['OK'],
      });
      await alert.present();
    }

    setToken(token:string):void{
      console.log("Token recibido en el setToken: "+token);
      this.token=token;
      console.log('Seteo el token al servicio APIREST: '+this.token);
    }

    getAuthorizationToken():string{
      return 'Bearer ' + this.token;
    }

    login(url:string , usuario: Usuario): Observable<Usuario> {
      url=this.url+url;
      console.log("Url: "+url);
      console.log("Usuario: "+usuario.Usuario+"  "+usuario.Password);

      if (this.platform.is('hybrid')) {

        const options = {
          url: url,
          headers: { 'Content-Type': 'application/json',
          'Authorization':this.getAuthorizationToken()
          },
          data: usuario,
        };


        /*CapacitorHttp.post(options).then(response=>{
          console.log("Logro consumir el restapi nativamente");
          console.log(response);
          console.log("Estatus: "+response.status);
          console.log("Headers: "+response.headers);
          console.log("Data: "+response.data);
          usuario=response.data;
          console.log("Usuario: "+usuario.token);
          console.log("Usuario2: "+usuario.token);
          return of(usuario);
        });*/
        return from(CapacitorHttp.post(options))
        .pipe(map((response:HttpResponse)=>{
          console.log("Logro consumir el restapi nativamente");
          console.log(response);
          usuario=response.data;
          console.log("Usuario: "+usuario.token);
          return usuario;
        }));

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



    //Bro, te podes basar en este metodo
    obtenerMateriales(url:string): Observable<Material[]>{
      url=this.url+url;
      if (this.platform.is('hybrid')) {

        const options = {
          url: url,
          headers: { 'Content-Type': 'application/json',
          'Authorization':this.getAuthorizationToken()
          },

        };

        let materiales:Material[]=[];
        /*CapacitorHttp.get(options).then(response=>{
          console.log("Logro consumir el restapi nativamente");
          console.log(response);
          console.log("Estatus: "+response.status);
          console.log("Headers: "+response.headers);
          console.log("Data: "+response.data);
          materiales=response.data;

        });
        console.log("Materiales Obtenidos: "+materiales.length);
        return of(materiales);*/
        return from(CapacitorHttp.get(options))
        .pipe(map((response:HttpResponse)=>{
          if (response.status === 401) {
            console.log("Token caducado");
            this.presentAlert();
            this.router.navigate(['/login']);
          }
          console.log("Logro consumir el restapi nativamente");
          console.log(response);
          materiales=response.data;
          console.log("Materiales: "+materiales.length);
          return materiales;
        }));
      }else{
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



    }

    obtenerRegistros(url:string): Observable<Registro[]>{
      url=this.url+url;
      if (this.platform.is('hybrid')) {

        const options = {
          url: url,
          headers: { 'Content-Type': 'application/json',
          'Authorization':this.getAuthorizationToken()
          },

        };

        let registros:Registro[]=[];
        /*CapacitorHttp.get(options).then(response=>{
          console.log("Logro consumir el restapi nativamente");
          console.log(response);
          console.log("Estatus: "+response.status);
          console.log("Headers: "+response.headers);
          console.log("Data: "+response.data);
          registros=response.data;

        });
        console.log("Registros Obtenidos: "+registros.length);
        return of(registros);*/
        return from(CapacitorHttp.get(options))
        .pipe(map((response:HttpResponse)=>{
          if (response.status === 401) {
            console.log("Token caducado");
            this.presentAlert();
            this.router.navigate(['/login']);
          }
          console.log("Logro consumir el restapi nativamente");
          console.log(response);
          registros=response.data;
          console.log("Registros: "+registros.length);
          return registros;
        }));
      }else{
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

    }

    obtenerEmpleados(url:string): Observable<Empleado[]>{
      url=this.url+url;
      if (this.platform.is('hybrid')) {

        const options = {
          url: url,
          headers: { 'Content-Type': 'application/json',
          'Authorization':this.getAuthorizationToken()
          },

        };

        let empleados:Empleado[]=[];
        /*CapacitorHttp.get(options).then(response=>{
          console.log("Logro consumir el restapi nativamente");
          console.log(response);
          console.log("Estatus: "+response.status);
          console.log("Headers: "+response.headers);
          console.log("Data: "+response.data);
          empleados=response.data;

        });
        console.log("Empleados Obtenidos: "+empleados.length);
        return of(empleados);*/
        return from(CapacitorHttp.get(options))
        .pipe(map((response:HttpResponse)=>{
          if (response.status === 401) {
            console.log("Token caducado");
            this.presentAlert();
            this.router.navigate(['/login']);
          }
          console.log("Logro consumir el restapi nativamente");
          console.log(response);
          empleados=response.data;
          console.log("Empleados: "+empleados.length);
          return empleados;
        }));
      }else{

      }
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
      if (this.platform.is('hybrid')) {

        const options = {
          url: url,
          headers: { 'Content-Type': 'application/json',
          'Authorization':this.getAuthorizationToken()
          },

        };

        let usuarios:Usuario[]=[];
        /*CapacitorHttp.get(options).then(response=>{
          console.log("Logro consumir el restapi nativamente");
          console.log(response);
          console.log("Estatus: "+response.status);
          console.log("Headers: "+response.headers);
          console.log("Data: "+response.data);
          usuarios=response.data;

        });
        console.log("Usuarios Obtenidos: "+usuarios.length);
        return of(usuarios);*/
        return from(CapacitorHttp.get(options))
        .pipe(map((response:HttpResponse)=>{
          if (response.status === 401) {
            console.log("Token caducado");
            this.presentAlert();
            this.router.navigate(['/login']);
          }
          console.log("Logro consumir el restapi nativamente");
          console.log(response);
          usuarios=response.data;
          console.log("Usuarios: "+usuarios.length);
          return usuarios;
        }));
      }else{
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

    }




    enviarNuevoMaterial(url:string, material:Material): Observable<Material>{
      url=this.url+url;
      if (this.platform.is('hybrid')) {

        const options = {
          url: url,
          headers: { 'Content-Type': 'application/json',
          'Authorization':this.getAuthorizationToken()
          },
          data: material,
        };


        /*CapacitorHttp.post(options).then(response=>{
          console.log("Logro consumir el restapi nativamente");
          console.log(response);
          console.log("Estatus: "+response.status);
          console.log("Headers: "+response.headers);
          console.log("Data: "+response.data);
          material=response.data;
          console.log("Material: "+material.Descripcion);
        });
        console.log("Material2: "+material.Descripcion);
        return of(material);*/
        return from(CapacitorHttp.post(options))
        .pipe(map((response:HttpResponse)=>{
          if (response.status === 401) {
            console.log("Token caducado");
            this.presentAlert();
            this.router.navigate(['/login']);
          }
          console.log("Logro consumir el restapi nativamente");
          console.log(response);
          material=response.data;
          console.log("Material: "+material.Descripcion);
          return material;
        }));
      }else{

      }
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
      if (this.platform.is('hybrid')) {

        const options = {
          url: url,
          headers: { 'Content-Type': 'application/json',
          'Authorization':this.getAuthorizationToken()
          },
          data: registro,
        };


        /*CapacitorHttp.post(options).then(response=>{
          console.log("Logro consumir el restapi nativamente");
          console.log(response);
          console.log("Estatus: "+response.status);
          console.log("Headers: "+response.headers);
          console.log("Data: "+response.data);
          registro=response.data;
          console.log("New Registro: "+registro.Descripcion);
        });
        console.log("New Registro2: "+registro.Descripcion);
        return of(registro);*/
        return from(CapacitorHttp.post(options))
        .pipe(map((response:HttpResponse)=>{
          if (response.status === 401) {
            console.log("Token caducado");
            this.presentAlert();
            this.router.navigate(['/login']);
          }
          console.log("Logro consumir el restapi nativamente");
          console.log(response);
          registro=response.data;
          console.log("Registro: "+registro.Descripcion);
          return registro;
        }));
      }else{
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


}
