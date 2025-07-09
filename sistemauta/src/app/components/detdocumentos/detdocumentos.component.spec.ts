import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetdocumentosComponent } from './detdocumentos.component';

describe('DetdocumentosComponent', () => {
  let component: DetdocumentosComponent;
  let fixture: ComponentFixture<DetdocumentosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetdocumentosComponent]
    });
    fixture = TestBed.createComponent(DetdocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
