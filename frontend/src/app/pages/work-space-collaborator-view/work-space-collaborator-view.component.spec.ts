import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkSpaceCollaboratorViewComponent } from './work-space-collaborator-view.component';

describe('WorkSpaceCollaboratorViewComponent', () => {
  let component: WorkSpaceCollaboratorViewComponent;
  let fixture: ComponentFixture<WorkSpaceCollaboratorViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkSpaceCollaboratorViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkSpaceCollaboratorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
