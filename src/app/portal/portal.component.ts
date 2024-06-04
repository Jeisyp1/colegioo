import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CrudService } from '../service/crud.service'; // Importa el servicio
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {
  mostrarMenuCarril: boolean = false;
  alumnosRecogidos: boolean = false;
  alumnosEnviados: boolean = false;
  showRegisterForm = false;
  alumnoForm: FormGroup;
  alumnos: any[] = [];

  constructor(

    private router: Router,
    private firestore: AngularFirestore,
    private crudService: CrudService // Inyecta el servicio
  ) {
    this.alumnoForm = new FormGroup
    
    ({
      nombre: new FormControl('', Validators.required),
      seccion: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.getAlumnos();
  }

  getAlumnos(): void {
    this.crudService.getAlumnos().subscribe(
      (data: any[]) => {
        this.alumnos = data;
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  toggleRegisterAlumno(): void {
    this.showRegisterForm = !this.showRegisterForm;
  }

  
  guardarAlumno(): void {
    const nuevoAlumno = this.alumnoForm.value;
    
    this.crudService.addAlumno(nuevoAlumno)
      .then(() => {
        console.log('Alumno agregado exitosamente');
        // Recargar la lista de alumnos desde Firebase después de agregar un nuevo alumno
        this.getAlumnos();
        this.alumnoForm.reset(); // Resetear el formulario después de agregar al alumno
      })
      .catch(error => {
        console.error('Error al agregar alumno:', error);
      });
  }
  



  eliminarAlumno(alumno: any): void {
    this.alumnos = this.alumnos.filter(a => a !== alumno);
    this.crudService.deleteAlumno(alumno.id).then(() => {
        console.log('Alumno eliminado exitosamente');
    }).catch(error => {
        console.error('Error al eliminar alumno:', error);
    });
  }

  
  
    toggleMenuCarril(): void {
      this.mostrarMenuCarril = !this.mostrarMenuCarril;
    }
  
    llegue(): void {
      // Implementa la lógica para registrar la llegada
    }

    recoger(): void {
      // Implementa la lógica para recoger a los estudiantes
      this.alumnosRecogidos = true;
    }
  
    enviarAlumnos(): void {
      // Implementa la lógica para enviar los datos de los alumnos a la base de datos
      // Supongamos que tienes una colección llamada "alumnos" en tu base de datos Firestore
      const datosAlumnos = {
        // Supongamos que aquí tienes los datos de los alumnos recogidos
        nombre: 'Nombre del alumno',
        seccion: 'Sección del alumno'
      };
  
      this.firestore.collection('alumnos').add(datosAlumnos)
        .then(() => {
          console.log('Datos de los alumnos enviados a la base de datos.');
          this.alumnosEnviados = true;
        })
        .catch((error) => {
          console.error('Error al enviar datos de los alumnos:', error);
        });
    }
  
  
}
