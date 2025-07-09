import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventodocumentosComponent } from './eventodocumentos.component';

describe('EventodocumentosComponent', () => {
  let component: EventodocumentosComponent;
  let fixture: ComponentFixture<EventodocumentosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventodocumentosComponent]
    });
    fixture = TestBed.createComponent(EventodocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
