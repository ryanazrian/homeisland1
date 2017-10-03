import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { UpdateAkunPage } from '../update-akun/update-akun';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  
  akun : any;
  constructor(public navCtrl: NavController, public http: Http) {

  }
ionViewWillEnter() {
    this.getdataAkun();
   }
   getdataAkun(){
    this.http.get("http://127.0.0.1/homeisland/backend/getAkun.php").subscribe(data => {
      let response = data.json();
      console.log(response);
      if(response.status=="200"){
        this.akun = response.data;   //ini disimpen ke variabel pasien diatas itu ,, yang udah di delacre
      }
    });
   }
   updateAkun(dataAkun){
     this.navCtrl.push(UpdateAkunPage,dataAkun);
   }
}
