import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilAdministradorSolicitudesComponent } from './perfil-administrador-solicitudes.component';

describe('PerfilAdministradorSolicitudesComponent', () => {
  let component: PerfilAdministradorSolicitudesComponent;
  let fixture: ComponentFixture<PerfilAdministradorSolicitudesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilAdministradorSolicitudesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilAdministradorSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
