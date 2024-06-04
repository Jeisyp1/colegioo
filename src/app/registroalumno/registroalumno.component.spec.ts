import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroalumnoComponent } from './registroalumno.component';

describe('RegistroalumnoComponent', () => {
  let component: RegistroalumnoComponent;
  let fixture: ComponentFixture<RegistroalumnoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroalumnoComponent]
    });
    fixture = TestBed.createComponent(RegistroalumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
