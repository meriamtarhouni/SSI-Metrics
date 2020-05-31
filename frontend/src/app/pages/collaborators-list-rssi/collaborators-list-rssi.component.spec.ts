import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorsListRssiComponent } from './collaborators-list-rssi.component';

describe('CollaboratorsListRssiComponent', () => {
  let component: CollaboratorsListRssiComponent;
  let fixture: ComponentFixture<CollaboratorsListRssiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollaboratorsListRssiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorsListRssiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
