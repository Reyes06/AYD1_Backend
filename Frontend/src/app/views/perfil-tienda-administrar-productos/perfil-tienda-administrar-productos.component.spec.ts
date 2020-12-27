import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilTiendaAdministrarProductosComponent } from './perfil-tienda-administrar-productos.component';

describe('PerfilTiendaAdministrarProductosComponent', () => {
  let component: PerfilTiendaAdministrarProductosComponent;
  let fixture: ComponentFixture<PerfilTiendaAdministrarProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilTiendaAdministrarProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilTiendaAdministrarProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
