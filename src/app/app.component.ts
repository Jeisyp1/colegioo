import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'colegioo';
  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;

  loginForm: FormGroup;
  registerForm: FormGroup;

  errorMessage: string | null = null;
  registerErrorMessage: string | null = null;

  constructor(private firestore: AngularFirestore) {
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

  login() {
    // Lógica para manejar el inicio de sesión
    const { user, password } = this.loginForm.value;

    if (user === 'demo' && password === 'demo') {
      this.errorMessage = null;
      alert('Inicio de sesión exitoso');
    } else {
      this.errorMessage = 'Usuario o contraseña incorrectos';
    }
  }

  register() {
    // Lógica para manejar el registro
    const { newName, newId, newPhone, newEmail, newPassword } = this.registerForm.value;

    if (this.registerForm.valid) {
      this.firestore.collection('usuarios').add({
        nombre: newName,
        identificacion: newId,
        celular: newPhone,
        correo: newEmail,
        contraseña: newPassword
      }).then(() => {
        this.registerErrorMessage = null;
        alert('Registro exitoso');
      }).catch((error) => {
        console.error('Error al registrar: ', error);
        this.registerErrorMessage = 'Error al registrar el usuario';
      });
    } else {
      this.registerErrorMessage = 'Por favor completa todos los campos correctamente';
    }
  }

}
