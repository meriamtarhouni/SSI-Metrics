import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRssiComponent } from './edit-rssi.component';

describe('EditRssiComponent', () => {
  let component: EditRssiComponent;
  let fixture: ComponentFixture<EditRssiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRssiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRssiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
