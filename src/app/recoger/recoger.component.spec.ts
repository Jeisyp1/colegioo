import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecogerComponent } from './recoger.component';

describe('RecogerComponent', () => {
  let component: RecogerComponent;
  let fixture: ComponentFixture<RecogerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecogerComponent]
    });
    fixture = TestBed.createComponent(RecogerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
