import { Component, OnInit } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection, QueryFn } from 'angularfire2/firestore';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, NavController,IonSlides  } from '@ionic/angular';
import { UserService } from '../user.service';
import { Http } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth';
import { snapshotChanges } from 'angularfire2/database';
import { Observable, empty } from 'rxjs';
import { map } from 'rxjs/operators';
import { database } from 'firebase';
import { async } from '@angular/core/testing';
import { ResultPage } from '../result/result.page';
import { forEach } from '@angular/router/src/utils/collection';
import { query } from '@angular/core/src/render3';
import { ActivatedRoute } from '@angular/router';


export interface Qq { question: string; }
export interface QqId extends Qq { id: string; }

export interface Ans extends QqId {ans : string;}
export interface AnsId extends Ans {a1 : string ; value : string ;}
// import interface Qq { qq: string; };
// import interface QqId extends Qq { id: string; };


@Component({
  selector: 'app-question1',
  templateUrl: './question1.page.html',
  styleUrls: ['./question1.page.scss'],
})
export class Question1Page implements OnInit {
  // @ViewChild(Slides) slides: Slides;
  //public navCtrl : NavController
  private qqCollection: AngularFirestoreCollection<Qq>;
  private answerQuery:QueryFn
  qq: Observable<QqId[]>;
  ans : Observable<AnsId[]>;
 
  main: AngularFirestoreDocument;
  sub
  ansReference:  AngularFirestoreDocument;
  qqReference:  AngularFirestoreDocument;
  qqID : string
  ansID: string
  Questionlist: any
  Answerlist: any
  id: string;
  data: any;



  constructor(public navCtrl: NavController, private afs: AngularFirestore, private user: UserService, private router: Router, 
    private route: ActivatedRoute) {
  

  }


  async ngOnInit() {
    await this.onGetQuation();
    console.log('ionViewDidLoad', this.Questionlist);
    // await this.onGetAnswer();
    // console.log('ionViewDidLoad', this.Answerlist);
    // this.ans$ = this.afs.collectionGroup('comments', ref => ref.where('uid', '==', 'jeffd23')).snapshotChanges();

    // this.qqID = this.route.snapshot.paramMap.get('id')
    // this.qqReference = this.afs.doc(`qq/${this.qqID}`)
    // this.ans = this.qqReference.valueChanges().subscribe(val => {
   
    // await this.onGetAnswer();
    // console.log('ionViewDidLoad', this.Answerlist);
 }

  async onGetQuation() {
    await this.afs.collection('/qq').snapshotChanges().pipe(map(actions => {

      const temp = this.afs.collection('/qq/EojNCD9V6qAWlXCFdk0l');
      console.log(temp);

      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        // const temp = a.payload.doc.get('EojNCD9V6qAWlXCFdk0l.ans');
        // const temp = a.payload.doc.get('qq.EojNCD9V6qAWlXCFdk0l');

        // console.log(temp);
        
        return { id, ...data };
      })
    }))
    .subscribe(async (snapshotChanges) => {
      this.Questionlist = await snapshotChanges
      console.log("in scribe", this.Questionlist)


    });

  }

    // async onGetAnswer() {
    //   this.afs.collection<any>('qq').doc("qqID").collection("ans").getDocumets(); 
      
   
   
   
      //   this.afs.collection('qq').doc('qqID').collection('ans').snapshotChanges().pipe(map(actions => {

    //     return actions.map(a => {
    //       const data = a.payload.doc.data() //as Qq     
    //       const id = a.payload.doc.id
    //       return { id, ...data }
    //     })
    //   }))
    //   .subscribe(async (snapshotChanges) => {
    //     this.Answerlist = await snapshotChanges
    //     console.log("in", this.Answerlist)
     
    // });


      // console.log("ans", );


    //   const collection = this.afs.collection<any>('collection1');
    // return collection.snapshotChanges()
    //   .map(participants => {
    //     return participants.map(participant => {
    //       const data = participant.payload.doc.data();
    //       const id = participant.payload.doc.id;
    //       return this.afs.doc('collection2/' + id).valueChanges()
    //         .map(data2 => Object.assign({}, {id, ...data, ...data2}));
    //     });
    //   }).flatMap(observables => Observable.combineLatest(observables));


      // this.afs.collection("qq").document("qqID").collection("ans").getDocuments();
      // await this.afs.collection( '/qq').snapshotChanges().pipe(map(actions => {
      //   return actions.map(a => {
      //     const data = a.payload.doc.data() //ans   
      //     const id = a.payload.doc.id
      //     return { id, ...data }
      //   })
      // })).subscribe(async (snapshotChanges) => {
      //   this.Answerlist = await snapshotChanges
      //   console.log("in answer", this.Answerlist)
  
  
      // });
  
    }
  





  //คิดคำนวนคะแนน
  // mcqAnswer(value, index) {
  //   let anws = { p: value, in: index }

  //   if (this.anwsList[index] !== undefined && index == this.anwsList[index].in) {
  //     this.anwsList[index].p = value
  //   } else {
  //     this.anwsList.push(anws)
  //   }


  //   console.log("=>", value, "=>", index)
  //   console.log("===>", this.anwsList)

  // }
  // async onResult() {
  //   for (let i = 0; i < this.anwsList.length; i++) {
  //    this.result = this.anwsList[i].p+this.result
  //   }
  //   console.log("result",this.result)
  //   // alert("result : "+this.result)



// ส่งผลคำนวนคะแนน ไปหน้า result
// let navigationExtras: NavigationExtras = {
//   state: {
//     result : this.result
//   }
// };
// this.router.navigate(['result'], navigationExtras);
// }

// fnGotoNewArrivalList(id){
// alert(JSON.stringify(id ));
// }








