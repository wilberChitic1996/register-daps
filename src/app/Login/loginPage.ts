import { Component, OnInit } from '@angular/core';
import {APIRESTService} from '../services/apirest.service';
import { Frase } from '../shared/frase';
import { Usuario } from '../shared/usuario';


@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage implements OnInit{

  private frase: Frase;
  private url = 'https://api.chucknorris.io/jokes/random'; // URL to web api

  usuario:Usuario={usuario:"", password:""};

  constructor(private apirest:APIRESTService) {
  }

  ngOnInit(): void {
    this.apirest.getFrase(this.url).subscribe(response => this.fraseRecibida(response));
  }

  autenticar(){

    //console.log("Frase obtenida de consumir el servicio: "+this.frase.id);
    //console.log("Frase obtenida de consumir el servicio: "+this.frase.url);
    //console.log("Frase obtenida de consumir el servicio: "+this.frase.icon_url);
    //console.log("Frase obtenida de consumir el servicio: "+this.frase.value);
    this.apirest.verificarusuario(this.url, this.usuario);
    //console.log("Nombre Usuario: "+this.usuario.usuario);
    //console.log("Contraseña: "+this.usuario.password);

    //Buscar la manera, de que si el usuario corresponde, te enrute a la siguiente pagina que es la del menu.
  }

  fraseRecibida(frase: Frase) {
    this.frase = frase;
  }



}
