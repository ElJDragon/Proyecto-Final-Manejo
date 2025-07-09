import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreadocumentosComponent } from './creadocumentos.component';

describe('CreadocumentosComponent', () => {
  let component: CreadocumentosComponent;
  let fixture: ComponentFixture<CreadocumentosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreadocumentosComponent]
    });
    fixture = TestBed.createComponent(CreadocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
