import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupPageRssiComponent } from './signup-page-rssi.component';

describe('SignupPageRssiComponent', () => {
  let component: SignupPageRssiComponent;
  let fixture: ComponentFixture<SignupPageRssiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupPageRssiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupPageRssiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
