import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarTiendaTerminosyCondicionesComponent } from './registrar-tienda-terminosy-condiciones.component';

describe('RegistrarTiendaTerminosyCondicionesComponent', () => {
  let component: RegistrarTiendaTerminosyCondicionesComponent;
  let fixture: ComponentFixture<RegistrarTiendaTerminosyCondicionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarTiendaTerminosyCondicionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarTiendaTerminosyCondicionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
