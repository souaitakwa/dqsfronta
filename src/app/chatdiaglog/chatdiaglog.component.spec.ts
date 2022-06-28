import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatdiaglogComponent } from './chatdiaglog.component';

describe('ChatdiaglogComponent', () => {
  let component: ChatdiaglogComponent;
  let fixture: ComponentFixture<ChatdiaglogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatdiaglogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatdiaglogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
