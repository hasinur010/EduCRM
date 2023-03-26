import { Injectable } from '@angular/core';
import { Student } from './models/Student';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class StudentService {

  private studentRef$: AngularFireList<Student>
  students$: Observable<Student[]>;

  constructor(private db: AngularFireDatabase) { 
    this.studentRef$ = this.db.list<Student>(Student.name)
    this.students$ = this.studentRef$.snapshotChanges().pipe(
      map((actions: SnapshotAction<Student>[]) =>
        actions.map((a: SnapshotAction<Student>) => {
          const key = a.payload.key;
          const data = a.payload.val();
          console.log(key)
          return {  ...data, key } as Student;
        })
      ),
      map(items => items.reverse())
    );
  }


  create(student: Student){
    console.log('create student: ', student)
    const itemRef = this.studentRef$.push(student)
    student.key = itemRef.key!
  }

  getAll(): Observable<Student[]>{
     return this.students$;
  }

  getAllForKeys(keys:string[]): Observable<Student[]>{
    //student => student.studentes.includes(student.key)
    console.log("find studentes for keys: ", keys)
    return this.students$.pipe(map(students => students.filter(student =>  keys.includes(student.key))))
  }

  getIndex(i: number): Observable<Student> {
    return this.students$.pipe(map(students => students[0]));
  }

  getForKey(key: string): Observable<Student | undefined>{
    
    return this.students$.pipe(map(students => students.find(student => student.key === key) ));
  }

  update(student: Student): void {
    if (student.key != undefined){
      this.studentRef$.update(student.key, student).then(
        ()=> {
          console.log('student updated successfully');
        }
      ).catch(
        (error) => {
          console.log('student update error', error);
        }
      );
    }
  }

  delete(key: string): void {
    this.studentRef$.remove(key).then(
      ()=> {
        console.log('student deleted successfully');
      }
    ).catch(
      (error) => {
        console.log('student deletion error', error);
      }
    );
  }
}
