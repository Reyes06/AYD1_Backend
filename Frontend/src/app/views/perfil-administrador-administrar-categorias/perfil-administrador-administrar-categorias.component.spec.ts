import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilAdministradorAdministrarCategoriasComponent } from './perfil-administrador-administrar-categorias.component';

describe('PerfilAdministradorAdministrarCategoriasComponent', () => {
  let component: PerfilAdministradorAdministrarCategoriasComponent;
  let fixture: ComponentFixture<PerfilAdministradorAdministrarCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilAdministradorAdministrarCategoriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilAdministradorAdministrarCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
