import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreareventosComponent } from './creareventos.component';

describe('CreareventosComponent', () => {
  let component: CreareventosComponent;
  let fixture: ComponentFixture<CreareventosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreareventosComponent]
    });
    fixture = TestBed.createComponent(CreareventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
