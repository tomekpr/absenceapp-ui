import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinUserComponent } from './join-user.component';

xdescribe('JoinUserComponent', () => {
  let component: JoinUserComponent;
  let fixture: ComponentFixture<JoinUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
