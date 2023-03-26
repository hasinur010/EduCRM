import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Batch } from '../models/Batch';
import { Student } from '../models/Student';

@Injectable({
  providedIn: 'root'
})
export class BatchService {

  private levelRef$: AngularFireList<Batch>
  levels$: Observable<Batch[]>;

  constructor(private db: AngularFireDatabase) { 
    this.levelRef$ = this.db.list<Batch>(Batch.name)
    this.levels$ = this.levelRef$.snapshotChanges().pipe(
      map((actions: SnapshotAction<Batch>[]) =>
        actions.map((a: SnapshotAction<Batch>) => {
          const key = a.payload.key;
          const data = a.payload.val();
          console.log(key)
          return {  ...data, key } as Batch;
        })
      ),
      map(items => items.reverse())
    );
  }


  create(batch: Batch){
    console.log('create batch: ', batch)
    const itemRef = this.levelRef$.push(batch)
    batch.key = itemRef.key!
  }

  getAll(): Observable<Batch[]>{
     return this.levels$;
  }

  getAllForKeys(keys:string[]): Observable<Batch[]>{
    //batch => level.batches.includes(batch.key)
    console.log("find batches for keys: ", keys)
    return this.levels$.pipe(map(batches => batches.filter(batch =>  keys.includes(batch.key))))
  }

  getIndex(i: number): Observable<Batch> {
    return this.levels$.pipe(map(levels => levels[0]));
  }

  getForKey(key: string): Observable<Batch | undefined>{
    
    return this.levels$.pipe(map(levels => levels.find(level => level.key === key) ));
  }

  update(batch: Batch): void {
    console.log("Request update batch: ", batch)
    if (batch.key != undefined){
      this.levelRef$.update(batch.key, batch).then(
        ()=> {
          console.log('level updated successfully');
        }
      ).catch(
        (error) => {
          console.log('level update error', error);
        }
      );
    }
  }

  delete(key: string): void {
    this.levelRef$.remove(key).then(
      ()=> {
        console.log('level deleted successfully');
      }
    ).catch(
      (error) => {
        console.log('level deletion error', error);
      }
    );
  }

}
