import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExigenceComponent } from './exigence.component';

describe('ExigenceComponent', () => {
  let component: ExigenceComponent;
  let fixture: ComponentFixture<ExigenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExigenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExigenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
