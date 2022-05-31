import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, NavController, IonSlides } from '@ionic/angular';
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


export interface Employees { fullName: string; position: number; }
export interface EmployeesId extends Employees { id: string; }

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {
  // @ViewChild(Slides) slides: Slides;
  //public navCtrl : NavController
  private employeesCollection: AngularFirestoreCollection<Employees>;
  employees: Observable<EmployeesId[]>;
  main: AngularFirestoreDocument
  sub
  Questionlist: any
  id: string;
  anwsList = [];
  result: number = 0;
  range : any;
sum: string;

  constructor(public navCtrl: NavController, private afs: AngularFirestore, private user: UserService, private router: Router) {

    
    console.log('ionViewDidLoad', this.Questionlist);
  }


  async ngOnInit() {
    await this.onGetQuation();
    console.log('ionViewDidLoad', this.Questionlist);
    // await this.getRange();
  }

  async onGetQuation() {
    await this.afs.collection('/employees').snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data()
        //as Employees         
        const id = a.payload.doc.id
        return { id, ...data }
      })
    })).subscribe(async (snapshotChanges) => {
      this.Questionlist = await snapshotChanges
      console.log("in scribe", this.Questionlist)


    });


  }


  // gotoResult() {
  //   //this.navCtrl.navigateForward("/result")
  //   this.router.navigate(['/result', { ans: "aaaa" }]);

  // this.Qestionlist = Questionlist
  // this.navCtrl.navigateForward("/result"{
  //   data : Questionlist
  // })


  // }
  // save() {

  // }
  mcqAnswer(value, index) {
    let anws = { p: value, i: index }

    if (this.anwsList[index] !== undefined && index == this.anwsList[index].i) {
      this.anwsList[index].p = value
    } else {
      this.anwsList.push(anws)
    }


    console.log("=>", value, "=>", index)
    console.log("===>", this.anwsList)

  }
  async onResult() {
    for (let i = 0; i < this.anwsList.length; i++) {
      this.result = this.anwsList[i].p + this.result

    }
    console.log("result", this.result)



    // alert("result : "+this.result)


    if (this.result <=10) {
      this.sum = "Not Depression"
        console.log("Not Depression")
        }
        else {
          console.log ("Depression")
          this.sum = "Depression"
        }
        let navigationExtras: NavigationExtras = {
          state: {
            result:this.result,
            sum: this.sum
       
      }
    };
    this.router.navigate(['result1'], navigationExtras);
    
    // //ส่งผลคำนวนคะแนน ไปหน้า result
    // let navigationExtras: NavigationExtras = {
    //   state: {
    //     result: this.result
    //   }
    // };
    // this.router.navigate(['result1'], navigationExtras);
  }
//อัพเดทช่วงนี้
 





// async getSummary(){
//   if (this.result <=10) {
//     this.sum = "Not Depression"

//       console.log("Not Depression")
//       }
//       else {
//         console.log ("Depression")
//         this.sum = "Depression"
//       }
//       let navigationExtras: NavigationExtras = {
//         state: {
//           sum: this.sum
//         }
//       };
//       this.router.navigate(['result1'], navigationExtras);
//     }






  // async getRange() {
  //   await this.afs.collection('/ratingRange').snapshotChanges().pipe(map(actions => {
  //     return actions.map(a => {
  //       const data = a.payload.doc.data()   //as ratingRange        
  //       const id = a.payload.doc.id
  //       return { id, ...data }
  //     })
  //   })).subscribe(async (snapshotChanges) => {
  //     this.range = await snapshotChanges
  //     console.log("range", this.range)

  //   });


  // }

  // async getSummary() {
  //   if (this.result <=10) {
  //     this.sum = "Not Depression"
  //       console.log("Not Depression")
  //       }
  //       else {
  //         console.log ("Depression")
  //         this.sum = "Depression"
  //       }
  //       let navigationExtras: NavigationExtras = {
  //         state: {
  //           sum: this.sum
       
  //     }
  //   };
  //   this.router.navigate(['result1'], navigationExtras);
  // }

  // fnGotoNewArrivalList(id){
  // alert(JSON.stringify(id ));
  // }

}






