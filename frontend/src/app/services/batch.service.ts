import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Batch } from '../models/Batch';

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


  create(level: Batch): Promise<void>{
    console.log('create Level: ', level)
    return this.levelRef$.push(level).then(
      () => {
        console.log('Level added successfully');
      }
    ).catch(
      (error) => {
        console.log('Error adding Level:', error);
      }
    );
  }

  getAll(): Observable<Batch[]>{
     return this.levels$;
  }

  update(level: Batch): void {
    if (level.key != undefined){
      this.levelRef$.update(level.key, level).then(
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
