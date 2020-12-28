import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilTiendaAdministrarDepartamentosComponent } from './perfil-tienda-administrar-departamentos.component';

describe('PerfilTiendaAdministrarDepartamentosComponent', () => {
  let component: PerfilTiendaAdministrarDepartamentosComponent;
  let fixture: ComponentFixture<PerfilTiendaAdministrarDepartamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilTiendaAdministrarDepartamentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilTiendaAdministrarDepartamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
