import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultgaComponent } from './resultga.component';

describe('ResultgaComponent', () => {
  let component: ResultgaComponent;
  let fixture: ComponentFixture<ResultgaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultgaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultgaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
