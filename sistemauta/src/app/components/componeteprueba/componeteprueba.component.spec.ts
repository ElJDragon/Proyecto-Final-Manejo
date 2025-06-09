import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponetepruebaComponent } from './componeteprueba.component';

describe('ComponetepruebaComponent', () => {
  let component: ComponetepruebaComponent;
  let fixture: ComponentFixture<ComponetepruebaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponetepruebaComponent]
    });
    fixture = TestBed.createComponent(ComponetepruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
