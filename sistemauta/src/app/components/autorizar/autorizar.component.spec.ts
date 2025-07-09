import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorizarComponent } from './autorizar.component';

describe('AutorizarComponent', () => {
  let component: AutorizarComponent;
  let fixture: ComponentFixture<AutorizarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutorizarComponent]
    });
    fixture = TestBed.createComponent(AutorizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
