import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilAdministradorPedidosComponent } from './perfil-administrador-pedidos.component';

describe('PerfilAdministradorPedidosComponent', () => {
  let component: PerfilAdministradorPedidosComponent;
  let fixture: ComponentFixture<PerfilAdministradorPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilAdministradorPedidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilAdministradorPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
