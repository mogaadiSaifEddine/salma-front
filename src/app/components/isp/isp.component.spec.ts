import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ISPComponent } from './isp.component';

describe('ISPComponent', () => {
  let component: ISPComponent;
  let fixture: ComponentFixture<ISPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ISPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ISPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
