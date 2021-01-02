import { TestBed } from '@angular/core/testing';

import { AuthPerfilTiendaGuard } from './auth-perfil-tienda.guard';

describe('AuthPerfilTiendaGuard', () => {
  let guard: AuthPerfilTiendaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthPerfilTiendaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
