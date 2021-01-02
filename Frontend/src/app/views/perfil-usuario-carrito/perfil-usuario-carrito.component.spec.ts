import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilUsuarioCarritoComponent } from './perfil-usuario-carrito.component';

describe('PerfilUsuarioCarritoComponent', () => {
  let component: PerfilUsuarioCarritoComponent;
  let fixture: ComponentFixture<PerfilUsuarioCarritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilUsuarioCarritoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilUsuarioCarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
