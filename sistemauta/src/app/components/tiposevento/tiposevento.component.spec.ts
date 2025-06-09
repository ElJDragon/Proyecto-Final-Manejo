import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposeventoComponent } from './tiposevento.component';

describe('TiposeventoComponent', () => {
  let component: TiposeventoComponent;
  let fixture: ComponentFixture<TiposeventoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TiposeventoComponent]
    });
    fixture = TestBed.createComponent(TiposeventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
