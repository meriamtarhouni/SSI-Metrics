import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageRssiComponent } from './login-page-rssi.component';

describe('LoginPageRssiComponent', () => {
  let component: LoginPageRssiComponent;
  let fixture: ComponentFixture<LoginPageRssiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPageRssiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageRssiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
