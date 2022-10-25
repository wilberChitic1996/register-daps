import { Injectable } from '@angular/core';
import { Ndef, NFC, NfcTag } from '@awesome-cordova-plugins/nfc/ngx';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class NfcService {
  constructor(
    private alertController: AlertController,
    private nfc: NFC
    , private ndef: Ndef
  ) {

  }

  leerNFC(): Observable<string> {
    let respuesta='';
    let flags = this.nfc.FLAG_READER_NFC_A | this.nfc.FLAG_READER_NFC_V;
    return this.nfc.readerMode(flags).pipe(map((tag:NfcTag)=>{
        console.log(JSON.stringify(tag));
        console.log(JSON.stringify(this.nfc.bytesToHexString(tag.id)));
        console.log(JSON.stringify(tag.ndefMessage));
        console.log(this.nfc.bytesToHexString(tag.ndefMessage[0].id));
        console.log(this.nfc.bytesToHexString(tag.ndefMessage[0].payload));
        console.log(this.nfc.bytesToString(tag.ndefMessage[0].payload));
        console.log(this.nfc.bytesToHexString(tag.ndefMessage[0].type));
        console.log(tag.ndefMessage[0].tnf);
        respuesta=this.nfc.bytesToString(tag.ndefMessage[0].payload);
        //respuesta=respuesta.substring(3);
        console.log('Respuesta envíada desde el servicio NFC: '+respuesta);
        return respuesta;
      }
    ));
  }

  closeNFC():void{
    this.nfc.close();
  }
  /*leerNFC(): Promise<string> {
    let flags = this.nfc.FLAG_READER_NFC_A | this.nfc.FLAG_READER_NFC_V;
    this.nfc.readerMode(flags).subscribe(
      tag => {
        console.log(JSON.stringify(tag));
        console.log(JSON.stringify(this.nfc.bytesToHexString(tag.id)));
        console.log(JSON.stringify(tag.ndefMessage));
        tag.ndefMessage.forEach(mensaje =>{

            console.log(this.nfc.bytesToHexString(mensaje.id));
            console.log(this.nfc.bytesToHexString(mensaje.payload));
            console.log(this.nfc.bytesToString(mensaje.payload));
            console.log(this.nfc.bytesToHexString(mensaje.type));
            console.log(mensaje.tnf);
            let respuesta=this.nfc.bytesToString(mensaje.payload);
            respuesta=respuesta.substring(3);
            return Promise.resolve(respuesta);
          }
          );
        this.nfc.close();
      }
      ,
      err => {

        console.log('Error reading tag', err);
        Promise.reject(err);
      }
    );
  }*/

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'No se pudo Leer tarjeta NFC',
      //subHeader: 'Important message',
      message: 'Vuelva a intentar por favor!',
      buttons: ['OK'],
    });
    await alert.present();
  }

}
