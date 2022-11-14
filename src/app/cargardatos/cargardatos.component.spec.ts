import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargardatosComponent } from './cargardatos.component';

describe('CargardatosComponent', () => {
  let component: CargardatosComponent;
  let fixture: ComponentFixture<CargardatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargardatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CargardatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
