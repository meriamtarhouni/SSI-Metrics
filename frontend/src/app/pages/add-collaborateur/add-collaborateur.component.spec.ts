import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCollaborateurComponent } from './add-collaborateur.component';

describe('AddCollaborateurComponent', () => {
  let component: AddCollaborateurComponent;
  let fixture: ComponentFixture<AddCollaborateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCollaborateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCollaborateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
