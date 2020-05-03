import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePageCollaboratorComponent } from './profile-page-collaborator.component';

describe('ProfilePageCollaboratorComponent', () => {
  let component: ProfilePageCollaboratorComponent;
  let fixture: ComponentFixture<ProfilePageCollaboratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePageCollaboratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePageCollaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
