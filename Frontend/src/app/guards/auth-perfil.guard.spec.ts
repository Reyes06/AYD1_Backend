import { TestBed } from '@angular/core/testing';

import { AuthPerfilGuard } from './auth-perfil.guard';

describe('AuthPerfilGuard', () => {
  let guard: AuthPerfilGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthPerfilGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
