import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Level } from '../models/Level';

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  private levelRef$: AngularFireList<Level>
  levels$: Observable<Level[]>;

  constructor(private db: AngularFireDatabase) { 
    this.levelRef$ = this.db.list<Level>(Level.name)
    this.levels$ = this.levelRef$.snapshotChanges().pipe(
      map((actions: SnapshotAction<Level>[]) =>
        actions.map((a: SnapshotAction<Level>) => {
          const key = a.payload.key;
          const data = a.payload.val();
          return { key, ...data } as Level;
        })
      ),
      map(items => items.reverse())
    );
  }


  create(level: Level): Promise<void>{
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

  getAll(): Observable<Level[]>{
     return this.levels$;
  }

  update(level: Level): void {
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
