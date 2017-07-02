import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestHolidayComponent } from './request-holiday.component';

xdescribe('RequestHolidayComponent', () => {
  let component: RequestHolidayComponent;
  let fixture: ComponentFixture<RequestHolidayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestHolidayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
