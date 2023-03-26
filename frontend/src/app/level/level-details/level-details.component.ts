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
import { Student } from 'src/app/models/Student';
import { StudentService } from 'src/app/student.service';


@Component({
  selector: 'app-level-details',
  templateUrl: './level-details.component.html',
  styleUrls: ['./level-details.component.css']
})
export class LevelDetailsComponent implements OnInit {
  level: Level
  batches: Batch[] = []

  selectedBatch: Batch = new Batch("Empty")
  allStudents: Student[] = [new Student("","","","",new Date(),"","")]
  displayedColumns: string[] = ['name', 'fatherName', 'email', 'phoneNumber']
  
  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<LevelDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Level, 
    private batchService: BatchService,
    private levelService: LevelService,
    private studentService: StudentService
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
      this.batchService.getAllForKeys([event.value]).subscribe(
        batches => {
          this.selectedBatch = batches[0]
          this.setAllStudents()
          console.log("Batch selected to: ", this.selectedBatch)
        }
      )
      
    }
  }

  setAllStudents(){
    this.studentService.getAllForKeys(this.selectedBatch.students).subscribe(
      students => {
        this.allStudents = students
      }
    );
  }

  onCancel(): void{
    this.dialogRef.close();
  }

  onOkay(): void{
  }

}
