import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../models/Student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm : FormGroup 
  EnrollCourseForm: FormGroup

  classes: string[] = [
    'Class 1',
    'Class 2',
    'Class 3',
    'Class 4',
    'Class 5',
  ];
  
  batches: string[] = [
    'Batch A',
    'Batch B',
    'Batch C',
    'Batch D',
    'Batch E',
  ];

  selectedClass: string
  selectedBatch: string

  constructor(private formBuilder: FormBuilder, private studentService: StudentService) { 
    this.registrationForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      fatherName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', [Validators.required]],
      address: ['', [Validators.required]]
    });

    this.EnrollCourseForm = this.formBuilder.group({
      class: ['', Validators.required],
      batch: ['', Validators.required]
    });

    this.selectedClass = this.classes[0]
    this.selectedBatch = this.batches[0]
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
    this.studentService.add(student)
    console.log('Registration for student: ', student)
  }

}
