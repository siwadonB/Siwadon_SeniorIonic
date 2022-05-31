
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore'
import { AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from './../user.service';
import { auth } from 'firebase';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {

  
 //regisData: FirebaseObjectObservable <Register>

  

    mainuser: AngularFirestoreDocument
    mainuser_p: AngularFirestoreDocument
    sub
    user_name: string
    user_password:string

    age : string
    sex : string
    job : string 
    school : string
    
    constructor(private afs: AngularFirestore, private user: UserService, private router: Router) {
      this.mainuser = afs.doc(`members/${user.getUID()}`)
      this.sub = this.mainuser.valueChanges().subscribe(event => {
        this.user_name = event.user_name
        this.user_password = event.user_password
        this.age = event.age
        this.sex = event.sex
        this.job = event.job
        
        
      })
      // this.mainuser_p = afs.doc(`members/${password.getPassword()}`)

      // this.sub = this.mainuser.valueChanges().subscribe(event => {
  
      //   this.user_password=event.password
      // })

    }
  
    ngOnDestroy() {
      this.sub.unsubscribe()
    }    

  ngOnInit() {
 
}

//ionViewDidLoad() {}
 
  //this.afauth.authState.subscribe(data => {

      // this.regisData = this.afstore.doc(`members/${data.uid}`)
    

   
  

  
 
}