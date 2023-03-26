import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatStepper } from '@angular/material/stepper';

import { Student } from '../models/Student';
import { Level } from '../models/Level';
import { Batch } from '../models/Batch';
import { BatchService } from '../services/batch.service';
import { LevelService } from '../services/level.service';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  // @ViewChild('stepper') stepper!: MatStepper;
  registrationForm : FormGroup 
  EnrollCourseForm: FormGroup

  levels: Observable<Level[]>;
  batches: Observable<Batch[]>;

  selectedBatch: Batch = new Batch("Empty")
  
  constructor(
    private formBuilder: FormBuilder, 
    private studentService: StudentService,
    private levelService: LevelService,
    private batchService: BatchService
    ) { 
    this.registrationForm = this.formBuilder.group({
      name: ['Hasinur', [Validators.required]],
      fatherName: ['Habibur', [Validators.required]],
      phoneNumber: ['01701617431', [Validators.required, Validators.pattern('^[0-9]*$')]],
      email: ['hasinur010@gmail.com', [Validators.required, Validators.email]],
      dateOfBirth: ['3/21/2023', [Validators.required]],
      address: ['Dhaka, Bangladesh', [Validators.required]]
    });

    this.levels = this.levelService.getAll()
    this.batches = this.batchService.getAll()
    
    this.EnrollCourseForm = this.formBuilder.group({
      class: ['', [Validators.required]],
      batch: ['', [Validators.required]]
    });
  }

  getErrorMessage(field: string) {
    if (this.registrationForm.controls[field].hasError('required')) {
      return 'You must enter a value';
    }

    if (this.registrationForm.controls[field].hasError('email')) {
      return 'Not a valid email';
    }

    if (this.registrationForm.controls[field].hasError('pattern')) {
      return 'Only numbers are allowed';
    }

    return '';
  }

  ngOnInit(): void {
    console.log('Registration: component initiated')
  }
  onSubmit(): void{
    
    const { name, fatherName, phoneNumber, email, dateOfBirth, address } = this.registrationForm.value;
    const student = new Student(name, fatherName, phoneNumber, email, dateOfBirth, address);

    this.studentService.create(student)
    console.log("created student: ", student)
    
    this.selectedBatch.students.push(student.key)
    console.log("attach student to batch: ", this.selectedBatch, "type: ", typeof(this.selectedBatch))
    this.batchService.update(this.selectedBatch)
  }

  onLevelChange(level: Level){
    this.batches = this.batchService.getAllForKeys(level.batches)
    
    this.batches.subscribe((batches: Batch[]) => {
      console.log("updated batches: ", batches)
    })
  }

  onBatchChange(batch: Batch){
    this.selectedBatch = batch
    console.log("Reg: batch changed to: ", batch)
  }

  getLevels(): Observable<Level[]>{
    return this.levelService.getAll();
  }

  getBatch(forKey: string): Observable<Batch | undefined>{
    return this.batchService.getForKey(forKey)
  }



}
