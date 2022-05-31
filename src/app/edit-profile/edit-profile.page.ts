import { Component, OnInit } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserService } from '../user.service';
import { Http } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {


  mainuser: AngularFirestoreDocument
  mainuser_p: AngularFirestoreDocument
  sub
  user_name: string
  age: string
  sex: string
  job: string
  school: string

  user_password: string
  newpassword: string

  busy: boolean = false

  constructor(
    private http: Http,
    private afs: AngularFirestore,
    private router: Router,
    private alertController: AlertController,
    public afauth: AngularFireAuth,
    public alert: AlertController,
    public afstore: AngularFirestore,
    public user: UserService,
    public password: UserService,
    public age_storage: UserService,
    public sex_storage: UserService,
    public job_storage: UserService,
    public school_storage: UserService) {
    this.mainuser = afs.doc(`members/${user.getUID()}`)

    this.sub = this.mainuser.valueChanges().subscribe(event => {
      this.user_name = event.user_name
      this.user_password = event.user_password
    })

    // this.mainuser_p = afs.doc(`members/${password.getPassword()}`)
    // this.sub = this.mainuser.valueChanges().subscribe(event => {

    //   this.user_password=event.password
    //})
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  async presentAlert(title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK']
    })

    await alert.present()
  }

  async updateDetails() {
    this.busy = true

    if (!this.user_password) {
      this.busy = false
      return this.presentAlert('Error!', 'You have to enter a password')
    }

    try {
      await this.user.reAuth(this.user.getUsername(), this.user_password)

    } catch (error) {
      this.busy = false
      return this.presentAlert('Error!', 'Wrong password!')
    }

    // if (this.newpassword) {
    //   await this.password.updatePassword(this.newpassword)

    // }

    if (this.user_name !== this.user.getUsername()) {
      await this.user.updateEmail(this.user_name)
      this.mainuser.update({
        user_name: this.user_name
      })
    }

    try {
      await this.password.updatePassword(this.newpassword)
      this.mainuser.update({
        user_password: this.newpassword
      })
    }
    catch (error) { }

    this.user_password = ""
    this.newpassword = ""
    this.busy = false

    await this.presentAlert('Done!', 'Your profile was updated!')

    this.router.navigate(['/profile'])



  }
}

