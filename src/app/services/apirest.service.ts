import { Injectable } from '@angular/core';
import { Frase } from '../shared/frase';
import { HttpClient , HttpHeaders} from "@angular/common/http";
import { observable, Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Usuario } from '../shared/Usuario';
import { Material } from '../shared/Material';


@Injectable({
  providedIn: 'root'
})
export class APIRESTService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Headers':'*',
    'Accept':'application/json, text/plain'
  })
  };



  constructor(private http: HttpClient) {
    console.log('Servicio HTTP:');
  }



    login(url:string , usuario: Usuario): Observable<Usuario> {
      return this.http.post<Usuario>(url, usuario, this.httpOptions);
    }


    //Bro, te podes basar en este metodo
    obtenerMateriales(url:string): Observable<Material[]>{
      return this.http.get<Material[]>(url, this.httpOptions);
    }


    /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    console.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

}
