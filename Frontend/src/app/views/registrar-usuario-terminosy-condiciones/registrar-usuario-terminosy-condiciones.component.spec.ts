import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarUsuarioTerminosyCondicionesComponent } from './registrar-usuario-terminosy-condiciones.component';

describe('RegistrarUsuarioTerminosyCondicionesComponent', () => {
  let component: RegistrarUsuarioTerminosyCondicionesComponent;
  let fixture: ComponentFixture<RegistrarUsuarioTerminosyCondicionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarUsuarioTerminosyCondicionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarUsuarioTerminosyCondicionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
