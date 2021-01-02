import { TestBed } from '@angular/core/testing';

import { AuthPerfilUsuarioGuard } from './auth-perfil-usuario.guard';

describe('AuthPerfilUsuarioGuard', () => {
  let guard: AuthPerfilUsuarioGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthPerfilUsuarioGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
