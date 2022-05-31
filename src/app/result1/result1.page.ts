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
  selector: 'app-result1',
  templateUrl: './result1.page.html',
  styleUrls: ['./result1.page.scss'],
})
export class Result1Page implements OnInit {

  employees: Observable<ResultId[]>;
 main: AngularFirestoreDocument
 id: string;

 result: any;
range: any;
sum:string;

 constructor(private afs: AngularFirestore ,private route: ActivatedRoute, private router: Router) {
   this.route.queryParams.subscribe(params => {
     if (this.router.getCurrentNavigation().extras.state) {
      this.result = this.router.getCurrentNavigation().extras.state.result,
      this.sum = this.router.getCurrentNavigation().extras.state.sum;

     }
   });
 }
 async ngOnInit() {
}


// async getRange() {
//     await this.afs.collection('/ratingRange').snapshotChanges().pipe(map(actions => {
//       return actions.map(a => {
//         const data = a.payload.doc.data()   //as ratingRange        
//         const id = a.payload.doc.id
//         return { id, ...data }
//       })
//     })).subscribe(async (snapshotChanges) => {
//       this.range = await snapshotChanges
//       console.log("range", this.range)

//     });

//   }
// async getSummary(){
//   if (this.result <=10) {
//     this.sum = "Not Depression"

//       console.log("Not Depression")
//       }
//       else {
//         console.log ("Depression")
//         this.sum = "Depression"

//       }
   
// }

}
