import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CrudService } from '../service/crud.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { PortalComponent } from '../portal/portal.component';

@Component({
  selector: 'app-registroalumno',
  templateUrl: './registroalumno.component.html',
  styleUrls: ['./registroalumno.component.css']
})
export class RegistroalumnoComponent implements OnInit {
  mostrarMenuCarril: boolean = false;
  carrilSeleccionado: string | null = null;
  alumnosRecogidos: boolean = false;
  showRegisterForm = false;
  showLlegueButton = true;
  showListoButton = false;
  alumnoForm: FormGroup;
  alumnosGuardadosLocalmente: any[] = [];
  ultimoCarrilSeleccionado: string | null = null;
  alumnosCarril1: any[] = [];
  alumnosCarril2: any[] = [];
  alumnosCarril3: any[] = [];

  constructor(
    private router: Router,
    private firestore: AngularFirestore,
    private crudService: CrudService
  ) {
    this.alumnoForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      seccion: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {

    this.crudService.getAlumnos().subscribe((alumnos: any[]) => {
      this.alumnosGuardadosLocalmente = alumnos;
      this.organizarAlumnosPorCarril();
    });
  }

  toggleRegisterAlumno(): void {
    this.showRegisterForm = !this.showRegisterForm;
  }

  seleccionarCarril(carril: string): void {
    this.ultimoCarrilSeleccionado = carril;
  }

  guardarAlumnoLocal(): void {
    const nuevoAlumno = this.alumnoForm.value;
    const carrilSeleccionado = this.ultimoCarrilSeleccionado;

    if (carrilSeleccionado) {
      nuevoAlumno.carril = carrilSeleccionado;
      this.alumnosGuardadosLocalmente.push(nuevoAlumno);
      this.organizarAlumnosPorCarril();
      this.alumnoForm.reset();
    } else {
      console.error('No se ha seleccionado ningún carril.');
    }
  }

  llegue(): void {
    const alumnosASubir = this.alumnosGuardadosLocalmente.filter(alumno => alumno.carril === this.ultimoCarrilSeleccionado && !alumno.enviado);
  
    if (alumnosASubir.length > 0) {
      this.enviarAlumnos();
      this.alumnosRecogidos = true;
      this.showLlegueButton = false;
      this.showListoButton = true;
    } else {
      console.warn('No hay alumnos para enviar.');
    }
  }
  
  

  listo(): void {
    if (this.ultimoCarrilSeleccionado) {
      this.eliminarAlumnosPorCarril(this.ultimoCarrilSeleccionado);
      this.eliminarAlumnosBaseDeDatos(this.ultimoCarrilSeleccionado);
    } else {
      console.error('No se ha seleccionado ningún carril.');
    }
  }
  
  
  eliminarAlumnosBaseDeDatos(carril: string): void {
    const idsAEliminar: string[] = [];
    this.crudService.getAlumnos().subscribe((alumnos: any[]) => {
      alumnos.forEach(alumno => {
        if (alumno.carril === carril) {
          idsAEliminar.push(alumno.id);
        }
      });
  
      // Eliminar los alumnos de la base de datos
      idsAEliminar.forEach(id => {
        this.crudService.deleteAlumno(id)
          .then(() => {
            console.log(`Alumno con ID ${id} eliminado de la base de datos.`);
          })
          .catch((error) => {
            console.error(`Error al eliminar alumno con ID ${id} de la base de datos:`, error);
          });
      });
    });
  }
  

  enviarAlumnos(): void {
    const alumnosASubir = this.alumnosGuardadosLocalmente.filter(alumno => alumno.carril === this.ultimoCarrilSeleccionado);
    alumnosASubir.forEach(alumno => {
      this.crudService.addAlumno(alumno)
        .then(() => {
          console.log('Datos del alumno enviados a la base de datos.');
        })
        .catch((error) => {
          console.error('Error al enviar datos del alumno:', error);
        });
    });
    this.organizarAlumnosPorCarril();
  }

  eliminarAlumnosPorCarril(carril: string): void {
    this.alumnosGuardadosLocalmente = this.alumnosGuardadosLocalmente.filter(alumno => alumno.carril !== carril);
    this.organizarAlumnosPorCarril();
    
  }

  eliminarAlumno(alumno: any): void {
    this.alumnosGuardadosLocalmente = this.alumnosGuardadosLocalmente.filter(a => a !== alumno);
    this.organizarAlumnosPorCarril();
  }

  toggleMenuCarril(): void {
    this.mostrarMenuCarril = !this.mostrarMenuCarril;
  }

  getColorByNivel(nivel: string): string {
    switch (nivel) {
      case 'Pre-escolar':
        return 'yellow';
      case 'Primaria':
        return 'red';
      case 'Bachillerato':
        return 'green';
      default:
        return 'white';
    }
  }

  organizarAlumnosPorCarril(): void {
    this.alumnosCarril1 = this.alumnosGuardadosLocalmente.filter(alumno => alumno.carril === 'carril1');
    this.alumnosCarril2 = this.alumnosGuardadosLocalmente.filter(alumno => alumno.carril === 'carril2');
    this.alumnosCarril3 = this.alumnosGuardadosLocalmente.filter(alumno => alumno.carril === 'carril3');
  }
}
