import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarTiendaComponent } from './registrar-tienda.component';

describe('RegistrarTiendaComponent', () => {
  let component: RegistrarTiendaComponent;
  let fixture: ComponentFixture<RegistrarTiendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarTiendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
