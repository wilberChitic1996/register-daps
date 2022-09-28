import { Injectable } from '@angular/core';
import { Frase } from '../shared/frase';
import { HttpClient } from "@angular/common/http";
import { observable, Observable } from "rxjs";
import { Usuario } from '../shared/usuario';


@Injectable({
  providedIn: 'root'
})
export class APIRESTService {
  private frase: Frase = { value: "", icon_url: "", id: "", url: "" };

  constructor(private http: HttpClient) {
    console.log('Servicio HTTP:');
  }

  public getFrase(url:string): Observable<Frase>  {
    console.log("URL A CONSUMIR: "+url);
    return this.http.get<Frase>(url);
  }


  public verificarusuario(url:string, Usuario:Usuario):Observable<any>{

    return this.http.post(url, Usuario);
  }



}
