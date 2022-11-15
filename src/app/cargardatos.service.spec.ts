import { TestBed } from '@angular/core/testing';

import { CargardatosService } from './cargardatos.service';

describe('CargardatosService', () => {
  let service: CargardatosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargardatosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
