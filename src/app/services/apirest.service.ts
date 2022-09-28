import { Injectable } from '@angular/core';
import { Frase } from '../shared/frase';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";


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

}
