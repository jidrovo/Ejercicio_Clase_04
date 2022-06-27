import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  latitud: number;
  longitud: number;
  altitud: number;
  speed: number;

  constructor(private geolocation:Geolocation, private alertController: AlertController) {}

  ubicacion(op:number){
    this.geolocation.getCurrentPosition().then((resp)=>{
      this.latitud=resp.coords.latitude;
      this.longitud=resp.coords.longitude;
      this.altitud=resp.coords.altitude;
      this.speed=resp.coords.speed;
      if(op==1)
      console.log('Latitud:',this.latitud,'Longitud:', this.longitud);
      else
      this.presentAlert();
    }).catch((error)=>{
      console.log('Error getting location', error);
      this.presentAlert();
    });
    }


ionViewWillEnter(){
  this.ubicacion(1);
}


async presentAlert(){
  const alert= await this.alertController.create({
    cssClass:'my-custom-class',
    header:'MI UBICACION',
    subHeader:'GPS',
    message:'Latitud:'+this.latitud+'\n'+
            'Longitud:'+this.latitud+'\n'+
            'Altitud:'+this.altitud+'\n'+
            'Velocidad:'+this.speed+'\n',
            buttons:['OK']
  });

  await alert.present();

}
}
