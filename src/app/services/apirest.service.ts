import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from "@angular/common/http";
import { observable, Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Usuario } from '../shared/Usuario';
import { Material } from '../shared/Material';
import { Registro } from '../shared/Registro';
import { Empleado } from '../shared/Empleado';


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



  constructor(private http: HttpClient) {
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
      return this.http.get<Material[]>(url, this.httpOptions);
    }

    obtenerRegistros(url:string): Observable<Registro[]>{
      url=this.url+url;
      return this.http.get<Registro[]>(url, this.httpOptions);
    }

    obtenerEmpleados(url:string): Observable<Empleado[]>{
      url=this.url+url;
      return this.http.get<Empleado[]>(url, this.httpOptions);
    }

    obtenerUsuarios(url:string): Observable<Usuario[]>{
      url=this.url+url;
      return this.http.get<Usuario[]>(url, this.httpOptions);
    }

    login(url:string , usuario: Usuario): Observable<Usuario> {
      url=this.url+url;
      return this.http.post<Usuario>(url, usuario, this.httpOptions);
    }



    enviarNuevoMaterial(url:string, material:Material): Observable<Material>{
      url=this.url+url;
      return this.http.post<Material>(url, material, this.httpOptions);
    }

    enviarNewRegister(url:string, registro:Registro): Observable<Registro>{
      url=this.url+url;
      return this.http.post<Registro>(url, registro, this.httpOptions);
    }


}
