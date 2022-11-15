import { TestBed } from '@angular/core/testing';

import { VerdatosService } from './verdatos.service';

describe('VerdatosService', () => {
  let service: VerdatosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerdatosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
