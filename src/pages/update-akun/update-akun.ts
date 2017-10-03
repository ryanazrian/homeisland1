import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Http } from '@angular/http';
/**
 * Generated class for the UpdateAkunPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update-akun',
  templateUrl: 'update-akun.html',
})
export class UpdateAkunPage {

   user: {username?: string, password?: string, role?:string} = {};
   submitted = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  			  public toastCtrl: ToastController,
              public http: Http,
              //public userDataProvider:UserDataProvider,
              public loadCtrl: LoadingController
  	) {}

  ngAfterViewInit() {
             //   this.username1 = this.navParams.get('username');
                this.user.username = this.navParams.get('username');
                this.user.password = this.navParams.get('password');
                this.user.role = this.navParams.get('status');

              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateAkunPage');
  }

  onSignup(form: NgForm) {
                this.submitted = true;
                let loading = this.loadCtrl.create({
                    content: 'Tunggu sebentar...'
                });

                if (form.valid) {
                  loading.present();
                  let input = JSON.stringify({
                    username: this.user.username,
                    password: this.user.password,
                    status: this.user.role="tourist"
                  });
                  this.http.post("http://127.0.0.1/homeisland/backend/signUpInfo.php",input).subscribe(data => {
                       loading.dismiss();
                       let response = data.json();
                       if(response.status == 200){
                         let user=response.data;
                        // this.userDataProvider.login(user.id,user.username,user.status);
                        //  this.navCtrl.setRoot(LocationSelect);

                       }
                       this.showAlert(response.message);
                      // this.navCtrl.push(LoginPage);
        }, err => {
           loading.dismiss();
           this.showError(err);
        });
    }
  }

  showError(err: any){
    err.status==0?
    this.showAlert("Tidak ada koneksi. Cek kembali sambungan Internet perangkat Anda"):
    this.showAlert("Tidak dapat menyambungkan ke server. Mohon muat kembali halaman ini");
  }
  showAlert(message){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}
