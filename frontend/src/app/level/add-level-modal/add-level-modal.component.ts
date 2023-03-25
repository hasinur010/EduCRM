import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-add-level-modal',
  templateUrl: './add-level-modal.component.html',
  styleUrls: ['./add-level-modal.component.css']
})
export class AddLevelModalComponent implements OnInit {
  inputLevelName: string;
  constructor(
    public dialogRef: MatDialogRef<AddLevelModalComponent>
  ) {
    this.inputLevelName = ""
  }

  ngOnInit(): void {
  }

  onCancel(): void{
    this.dialogRef.close();
  }

  onOkay(): void{
    this.dialogRef.close(this.inputLevelName)
  }

}
