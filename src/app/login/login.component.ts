import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CrudService } from 'src/app/service/crud.service'; // Importa el servicio

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  users: any[] = [];
  loginForm: FormGroup;
  registroForm: FormGroup;

  errorMessage: string | null = null;
  registerErrorMessage: string | null = null;

  constructor(
    private router: Router,
    private firestore: AngularFirestore,
    private crudService: CrudService // Inyecta el servicio
  ) {
    this.loginForm = new FormGroup({
      user: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

    this.registroForm = new FormGroup({
      newName: new FormControl('', Validators.required),
      newId: new FormControl('', Validators.required),
      newPhone: new FormControl('', Validators.required),
      newEmail: new FormControl('', [Validators.required, Validators.email]),
      newPassword: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.crudService.getUsers().subscribe(
      (data: any[]) => {
        this.users = data;
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  login(): void {
    const enteredUsername = this.loginForm.get('user')?.value;
    const enteredPassword = this.loginForm.get('password')?.value;

    const foundUser = this.users.find(user => user.id === enteredUsername && user.password === enteredPassword);

    if (foundUser) {
      // Autenticación exitosa
      console.log('Autenticación exitosa');
      // Redirigir al usuario al componente "portal"
      this.router.navigate(['/portal']);
    } else {
      // Autenticación fallida
      this.errorMessage = 'Usuario y/o contraseña incorrectos';
      console.log('Usuario y/o contraseña incorrectos');
    }
  }

 
}
