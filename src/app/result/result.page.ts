import { Component, OnInit } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, NavController, NavParams } from '@ionic/angular';
import { UserService } from '../user.service';
import { Http } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth';
import { snapshotChanges } from 'angularfire2/database';
import { Observable, empty } from 'rxjs';
import { map } from 'rxjs/operators';
import { database } from 'firebase';
import { async } from '@angular/core/testing';
import { ViewController } from '@ionic/core';

export interface Result { fullName: string; result: number; }
export interface ResultId extends Result { id: string; }

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})


export class ResultPage implements OnInit {
 // public navCtrl : NavController

 private resultCollection: AngularFirestoreCollection<Result>;
 employees: Observable<ResultId[]>;
 main: AngularFirestoreDocument
 id: string;


 point: any;
 result: any;
 constructor(private route: ActivatedRoute, private router: Router) {
   this.route.queryParams.subscribe(params => {
     if (this.router.getCurrentNavigation().extras.state) {
       this.result = this.router.getCurrentNavigation().extras.state.result;
     }
   });
 }

 ngOnInit() {
 }



  // constructor(  private route: ActivatedRoute) { 
  //   console.log("this.route.snapshot.paramMap.get : ", this.route.snapshot.paramMap.get('ans'))
  //   //const {uid} = this.viewCtrl.data
  //   //this.ans = this.ansp








}
