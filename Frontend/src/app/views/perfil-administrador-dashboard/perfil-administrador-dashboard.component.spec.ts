import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilAdministradorDashboardComponent } from './perfil-administrador-dashboard.component';

describe('PerfilAdministradorDashboardComponent', () => {
  let component: PerfilAdministradorDashboardComponent;
  let fixture: ComponentFixture<PerfilAdministradorDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilAdministradorDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilAdministradorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
