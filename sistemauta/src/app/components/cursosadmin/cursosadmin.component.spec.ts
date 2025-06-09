import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosadminComponent } from './cursosadmin.component';

describe('CursosadminComponent', () => {
  let component: CursosadminComponent;
  let fixture: ComponentFixture<CursosadminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CursosadminComponent]
    });
    fixture = TestBed.createComponent(CursosadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
