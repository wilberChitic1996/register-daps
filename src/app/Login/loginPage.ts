import { Component, OnInit } from '@angular/core';
import {APIRESTService} from '../services/apirest.service';

import { Params, Router } from '@angular/router';
import { Usuario } from '../shared/Usuario';
import { Md5 } from 'ts-md5';


@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage implements OnInit{


  private url = 'https://api.chucknorris.io/jokes/random'; // URL to web api

  usuario:Usuario={Id_Usuario:0, Usuario:"", Password:"", token:""};

  constructor(private apirest:APIRESTService, private router:Router) {
  }

  ngOnInit(): void {

  }

  autenticar(){
    let url="login";
    let password=this.usuario.Password;
    this.usuario.Password=Md5.hashStr(this.usuario.Password);


    console.log("Password sin encriptar: "+password);
    console.log("Nombre Usuario: "+this.usuario.Usuario);
    console.log("Contraseña Encriptada: "+this.usuario.Password);
    console.log('Consumira el RestAPI: '+url);
    console.log(this.usuario);

    this.apirest.login(url, this.usuario).subscribe(usuario => {
            // Entra aquí con respuesta del servicio correcta código http 200
            console.log("Se autentico correctamente");
            console.log(usuario);
            this.apirest.setToken(usuario.token);
            this.usuario.Password="";
            this.router.navigate(['/menu']);
        }, err => {
            // Puedes pasarle el err en caso de que mandes el mensaje desde el
            console.log('Las credenciales no son correctas');
            console.log(err);
            this.usuario.Password="";
        }
    );

    //this.router.navigate(['/menu']);

  }





}
