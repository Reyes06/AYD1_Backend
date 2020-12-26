import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilUsuarioDashboardComponent } from './perfil-usuario-dashboard.component';

describe('PerfilUsuarioDashboardComponent', () => {
  let component: PerfilUsuarioDashboardComponent;
  let fixture: ComponentFixture<PerfilUsuarioDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilUsuarioDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilUsuarioDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
