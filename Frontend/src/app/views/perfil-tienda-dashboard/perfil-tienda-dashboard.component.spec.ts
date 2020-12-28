import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilTiendaDashboardComponent } from './perfil-tienda-dashboard.component';

describe('PerfilTiendaDashboardComponent', () => {
  let component: PerfilTiendaDashboardComponent;
  let fixture: ComponentFixture<PerfilTiendaDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilTiendaDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilTiendaDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
