import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminreportdetailsComponent } from './adminreportdetails.component';

describe('AdminreportdetailsComponent', () => {
  let component: AdminreportdetailsComponent;
  let fixture: ComponentFixture<AdminreportdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminreportdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminreportdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
