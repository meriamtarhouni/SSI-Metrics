import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupPageCollaboratorComponent } from './signup-page-collaborator.component';

describe('SignupPageCollaboratorComponent', () => {
  let component: SignupPageCollaboratorComponent;
  let fixture: ComponentFixture<SignupPageCollaboratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupPageCollaboratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupPageCollaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
