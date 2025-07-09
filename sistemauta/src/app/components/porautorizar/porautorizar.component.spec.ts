import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorautorizarComponent } from './porautorizar.component';

describe('PorautorizarComponent', () => {
  let component: PorautorizarComponent;
  let fixture: ComponentFixture<PorautorizarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PorautorizarComponent]
    });
    fixture = TestBed.createComponent(PorautorizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
