import { Injectable } from '@angular/core';
import { Student } from './models/Student';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';


@Injectable({
  providedIn: 'root'
})

export class StudentService {

  private studentsRef: AngularFireList<Student>
  constructor(private db: AngularFireDatabase){
      this.studentsRef = this.db.list("Students")
  }
  
  add(student: Student): void{
      console.log("Student:: Added:: " + student)
      // this.studentsRef.push(student);
  }
}
