import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWorkSpaceComponent } from './create-work-space.component';

describe('CreateWorkSpaceComponent', () => {
  let component: CreateWorkSpaceComponent;
  let fixture: ComponentFixture<CreateWorkSpaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateWorkSpaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWorkSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
