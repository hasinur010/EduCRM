import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddLevelModalComponent } from './add-level-modal/add-level-modal.component';
import { Observable } from 'rxjs';

import { Level } from '../models/Level';
import { LevelService } from '../services/level.service';
import { LevelDetailsComponent } from './level-details/level-details.component';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css']
})
export class LevelComponent implements OnInit {
  
  constructor(private dialog: MatDialog, private levelService: LevelService) { 
  }

  ngOnInit(): void {
  }

  addLevel(): void{
    const dialogRef = this.dialog.open(AddLevelModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      const level = new Level(result)
      this.levelService.create(level)
    });
    
  }

  getAllLevels(): Observable<Level[]> {
    return this.levelService.getAll()
  }

  openDetailsFor(level: Level){
    console.log("Details of level:", level)
    const dialogRef = this.dialog.open(LevelDetailsComponent,{
      data: level
    });

  }

}
