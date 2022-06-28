import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionadminComponent } from './questionadmin.component';

describe('QuestionadminComponent', () => {
  let component: QuestionadminComponent;
  let fixture: ComponentFixture<QuestionadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
