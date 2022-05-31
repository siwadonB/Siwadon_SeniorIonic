import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app'
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular'
import { stringify } from 'querystring';
import { AngularFirestore } from 'angularfire2/firestore';
//import { AngularFirestore } from '@angular/fire/firestore'
import { type } from 'os';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {



  user_name: string = ""
  user_password: string = ""
  user_cpassword: string = ""
  user_email: string = ""
  age: string = ""
  sex: string = ""
  job: string = ""
  school: string = ""
  student: string = ""





  constructor(
    public afauth: AngularFireAuth,
    public alert: AlertController,
    public afstore: AngularFirestore,
    public user: UserService,
    public password: UserService,
    public age_storage: UserService,
    public sex_storage: UserService,
    public job_storage: UserService,
    public school_storage: UserService,
    public router: Router

    ,

  ) { }

  ngOnInit() {
  }



  async register() {
    const { user_name, user_password, user_cpassword, user_email, age, sex , job , school } = this
    if (user_password !== user_cpassword) {
      this.showAlert("Error!", "Passwords don't mach")
      return console.error("Passwords don't match")
    }
    else if (user_name == "") {
      this.showAlert("Error!", "Please invalid your username")
      return console.error
    }
    else if (age == "" ) {
      this.showAlert("Error!", "Please invalid your age")
      return console.error
    }

    else if (sex == "") {
      this.showAlert("Error!", "Please select your sex")
      return console.error
    }
    else if (job =="") {
      this.showAlert("Error!", "Please select your job")
      return console.error
    }
    else if (job == "Student"&& school ==""){
    this.showAlert("Error!", "Please select your school")
    return console.error}
  
    try {
      const res = await this.afauth.auth.createUserWithEmailAndPassword(user_name, user_password)
      console.log(res)
      //this.showAlert("Success!", "Sign up complete")

      this.afstore.doc(`members/${res.user.uid}`).set({
        user_name,
        user_password,
        age,
        sex,
        job,
        school
      })

      this.user.setUser({
        user_name,
        uid: res.user.uid
      })
      this.password.setPassword({
        user_password
      })
      this.age_storage.setAge({
        age
      })

      this.sex_storage.setSex({
        sex
      })
      this.job_storage.setJob({
        job
      })
      this.school_storage.setSchool({
        school
      })



      this.showAlert('Success', 'You are registered!')
      this.router.navigate(['/login'])

      this.afauth.authState.subscribe(user => {
        this.afstore.doc(`members/${user.uid}`).get({

        })
        //.then (( ) => this.router.navigate(['/profile']))
      })


    } catch (error) {

      console.dir(error)
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
