import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Authentification } from '../../../../common/authentification';
import { AuthService } from './auth.service';

/*
* Component pour faire l'authentification de vos utilisateurs
* Ce component sera affiché lorsque l'utilisateur n'est pas connecté
*/
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public errorMessage:string = '';
  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit(): void {
    this.errorMessage = '';
  }
  
  //Bouton login
  login(form: NgForm){
    this._authService.login(<Authentification>form.value).subscribe({
      error:err => this.errorMessage = err.error.errMessage
    })
    this.errorMessage = '';
  }
  
  //Bouton signup
  signup(form: NgForm){
    this._authService.signup(<Authentification>form.value).subscribe({
      error:err => this.errorMessage = err.error.errMessage
    })
    this.errorMessage = '';
  }

}
