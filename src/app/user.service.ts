import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { first } from 'rxjs/operators'
import { auth } from 'firebase/app'

interface user {
    user_name: string,
    
    uid: string
}
interface password{
    user_password: string,
}

interface age{
   age: string ,
}
interface sex{
    sex: string ,
 }

 interface job{
    job: string ,
 }

 interface school{
    school: string ,
 }
interface question {
    fullname : string
    qid : string
}
 interface position {
     position : string
 }


@Injectable()
export class UserService {
    private user: user 
    private user_password : password
    private password: password
    private age: age
    private sex: sex
    private job : job
    private school : school
    private position : position
    
    constructor( private afAuth: AngularFireAuth ) {

    }

    setUser(user: user) {
        this.user = user
    }
    getUsername(): string {
        return this.user.user_name
    }
    setPassword(password: password){
        this.password = password
    }

    reAuth(username: string, password: string) {
		return this.afAuth.auth.currentUser.reauthenticateAndRetrieveDataWithCredential(auth.EmailAuthProvider.credential(username , password))
	}

    updatePassword(newpassword: string) {
		return this.afAuth.auth.currentUser.updatePassword(newpassword)
	}

    updateEmail(newemail: string) {
		return this.afAuth.auth.currentUser.updateEmail(newemail)
	}

    setAge(age: age){
        this.age = age
    }
    setSex(sex: sex){
        this.sex = sex
    }
    setJob(job: job){
        this.job = job
    }
    setSchool(school: school){
        this.school = school
    }
    getUID() {
        return this.user.uid
    }

    getPosition(): string{
        return this.position.position

    }
    async isAuthenticated() {
		if(this.user) return true
        
        
        const user = await this.afAuth.authState.pipe(first()).toPromise()

		if(user) {
			this.setUser({
				user_name: user.email.split('@')[0],
				uid: user.uid
            })
    
			return true
		}
        return false
        
    }
    
    
}