import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlvideComponent } from './olvide.component';

describe('OlvideComponent', () => {
  let component: OlvideComponent;
  let fixture: ComponentFixture<OlvideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OlvideComponent]
    });
    fixture = TestBed.createComponent(OlvideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
