import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CrudService } from 'src/app/service/crud.service'; // Importa el servicio
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit{

  users: any[] = [];
  loginForm: FormGroup;
  registerForm: FormGroup;

  errorMessage: string | null = null;
  registerErrorMessage: string | null = null;

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

  constructor(
    private router: Router,
    private firestore: AngularFirestore,
    private crudService: CrudService // Inyecta el servicio
  ) {
    this.loginForm = new FormGroup({
      user: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

    this.registerForm = new FormGroup({
      newName: new FormControl('', Validators.required),
      newId: new FormControl('', Validators.required),
      newPhone: new FormControl('', Validators.required),
      newEmail: new FormControl('', [Validators.required, Validators.email]),
      newPassword: new FormControl('', Validators.required),
    });
  }

  register() {
    const newName = this.registerForm.get('newName')?.value;
    const newId = this.registerForm.get('newId')?.value;
    const newPhone = this.registerForm.get('newPhone')?.value;
    const newEmail = this.registerForm.get('newEmail')?.value;
    const newPassword = this.registerForm.get('newPassword')?.value;

    // Crear un objeto con los datos del nuevo usuario
    const newUser = {
      name: newName,
      id: newId,
      phone: newPhone,
      email: newEmail,
      password: newPassword
    };

    // Llamar al método addUser del servicio CrudService para agregar el nuevo usuario a la base de datos
    this.crudService.addUser(newUser)
      .then(() => {
        console.log('Usuario registrado exitosamente');
        this.registerForm.reset();
      })
      .catch(error => {
        console.error('Error al registrar usuario:', error);
        this.registerErrorMessage = 'Error al registrar usuario';
      });
  }

  

}
