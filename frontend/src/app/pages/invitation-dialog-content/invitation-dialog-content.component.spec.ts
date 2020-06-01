import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationDialogContentComponent } from './invitation-dialog-content.component';

describe('InvitationDialogContentComponent', () => {
  let component: InvitationDialogContentComponent;
  let fixture: ComponentFixture<InvitationDialogContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitationDialogContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitationDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
