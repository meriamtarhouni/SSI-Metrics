import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageCollaboratorComponent } from './login-page-collaborator.component';

describe('LoginPageCollaboratorComponent', () => {
  let component: LoginPageCollaboratorComponent;
  let fixture: ComponentFixture<LoginPageCollaboratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPageCollaboratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageCollaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
