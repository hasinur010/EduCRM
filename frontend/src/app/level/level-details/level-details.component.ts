import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Level } from 'src/app/models/Level';
import { MatSelectChange } from '@angular/material/select';
import { BatchService } from 'src/app/services/batch.service';
import { LevelService } from 'src/app/services/level.service';

import { AddLevelModalComponent } from '../add-level-modal/add-level-modal.component';
import { Batch } from 'src/app/models/Batch';


@Component({
  selector: 'app-level-details',
  templateUrl: './level-details.component.html',
  styleUrls: ['./level-details.component.css']
})
export class LevelDetailsComponent implements OnInit {
  level: Level
  batches: Batch[] = []
  
  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<LevelDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Level, 
    private batchService: BatchService,
    private levelService: LevelService
  ) {
    this.level = data
    this.batchService.getAllForKeys(this.level.batches).subscribe(
      batches => {
        this.batches = batches
        console.log("initial batches loaded: ", this.level.batches)
      }
    )
  }

  ngOnInit(): void {
  }

  onBatchSelectionChange(event: MatSelectChange) {
    if (event.value === 'createNew') {
      console.log("Create new batch")
      
      const dialogRef = this.dialog.open(AddLevelModalComponent);

      dialogRef.afterClosed().subscribe(result => {
        if(result != null){
          const batch = new Batch(result)
          this.batchService.create(batch)
          this.level.batches.push(batch.key)
          this.levelService.update(this.level)
        }
      });
    }else{
      console.log("Batch selected to: ", event.value)
    }
  }

  onCancel(): void{
    this.dialogRef.close();
  }

  onOkay(): void{
  }

}
