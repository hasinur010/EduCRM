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
          console.log(key)
          return {  ...data, key } as Level;
        })
      ),
      map(items => items.reverse())
    );
  }


  create(level: Level){
    console.log('create level: ', level)
    const itemRef = this.levelRef$.push(level)
    level.key = itemRef.key!
  }

  getAll(): Observable<Level[]>{
     return this.levels$;
  }

  getIndex(i: number): Observable<Level> {
    return this.levels$.pipe(map(levels => levels[0]));
  }

  getForKey(key: string): Observable<Level | undefined>{
    return this.levels$.pipe(map(levels => levels.find(level => level.key === key) ));
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
