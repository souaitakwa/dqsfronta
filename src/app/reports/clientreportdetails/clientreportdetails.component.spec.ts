import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientreportdetailsComponent } from './clientreportdetails.component';

describe('ClientreportdetailsComponent', () => {
  let component: ClientreportdetailsComponent;
  let fixture: ComponentFixture<ClientreportdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientreportdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientreportdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
