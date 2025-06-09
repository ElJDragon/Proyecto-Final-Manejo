import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiopwdComponent } from './cambiopwd.component';

describe('CambiopwdComponent', () => {
  let component: CambiopwdComponent;
  let fixture: ComponentFixture<CambiopwdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CambiopwdComponent]
    });
    fixture = TestBed.createComponent(CambiopwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
