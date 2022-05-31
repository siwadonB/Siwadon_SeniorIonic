import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app'
import { Button } from 'protractor';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'
import { async } from '@angular/core/testing';
import { AngularFirestore } from 'angularfire2/firestore'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  user_name: string = ""
  user_password: string = ""
  
  constructor(public afAuth: AngularFireAuth,
    public user: UserService,
    public router: Router,
    public alert: AlertController,
    public afstore: AngularFirestore) { }

  async login() {
    const { user_name, user_password } = this
    try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(user_name, user_password)

      if (res.user) {
        this.user.setUser({
          user_name,
          uid: res.user.uid
        })
        this.router.navigate(['/profile'])
      }

    } catch (error) {
      //console.error ("Passwords don't match");
      console.dir(error)
      if (error.code === "auth/user-not-found") {
        this.showAlert("Error!!", "User not found!, Please register")
      }

      else if (error.code === "auth/invalid-email") {
        this.showAlert("Error!!", "Please invalid E-mail")
      }
      else 
        this.showAlert("Error", error.message)
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["Enter"]
    })
    await alert.present()
  }
}
