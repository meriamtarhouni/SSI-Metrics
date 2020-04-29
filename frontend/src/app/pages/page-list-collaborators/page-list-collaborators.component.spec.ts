import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageListCollaboratorsComponent } from './page-list-collaborators.component';

describe('PageListCollaboratorsComponent', () => {
  let component: PageListCollaboratorsComponent;
  let fixture: ComponentFixture<PageListCollaboratorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageListCollaboratorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageListCollaboratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
