import { TestBed } from '@angular/core/testing';

import { AuthPerfilAdministradorGuard } from './auth-perfil-administrador.guard';

describe('AuthPerfilAdministradorGuard', () => {
  let guard: AuthPerfilAdministradorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthPerfilAdministradorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
