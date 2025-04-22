import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';
import { AuthenticationService } from './../services/authentication.service';
import { AuthorizationService } from './../services/authorization.service';

/**
 * La clase LoginComponent
 *
 * @author J. Alvaro Mamani <jmamani@aps.gob.bo>
*/
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form!: UntypedFormGroup;
  listaUsuarios: any =
  [
    {value:'administrador' , label:'administrador'},
    {value:'operador' , label:'operador'},
    {value:'supervisor' , label:'supervisor'},
    {value:'consulta' , label:'consulta'},
  ];

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private authenticationService: AuthenticationService,
    public authorizationService: AuthorizationService,
  ) {
    }

  ngOnInit() {
    this.form = this.fb.group({
      uname: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    });
  }

  onSubmit() {
    //this.router.navigate(['/dashboard']);
    this.authenticationService.login(this.form.controls['uname'].value, this.form.controls['password'].value)
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigate(['/dashboard']);
          },
        )
  }

  changeUser(usuario:string){
    console.log('Aqui en change user: ',usuario);
    this.form.controls['uname'].setValue(usuario);
    this.form.controls['password'].setValue('clave123');
  }


}
