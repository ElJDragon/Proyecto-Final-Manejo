import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposdocumentosComponent } from './tiposdocumentos.component';

describe('TiposdocumentosComponent', () => {
  let component: TiposdocumentosComponent;
  let fixture: ComponentFixture<TiposdocumentosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TiposdocumentosComponent]
    });
    fixture = TestBed.createComponent(TiposdocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
