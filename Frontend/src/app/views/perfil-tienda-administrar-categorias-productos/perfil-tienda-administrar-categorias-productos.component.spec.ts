import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilTiendaAdministrarCategoriasProductosComponent } from './perfil-tienda-administrar-categorias-productos.component';

describe('PerfilTiendaAdministrarCategoriasProductosComponent', () => {
  let component: PerfilTiendaAdministrarCategoriasProductosComponent;
  let fixture: ComponentFixture<PerfilTiendaAdministrarCategoriasProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilTiendaAdministrarCategoriasProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilTiendaAdministrarCategoriasProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
