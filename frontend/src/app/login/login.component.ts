import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({email:'', password:''});

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    console.log('login: component initiated')
  }
  onSubmit(): void{
    console.log('login: tried to login with data: ',this.loginForm.value)
  }
}
