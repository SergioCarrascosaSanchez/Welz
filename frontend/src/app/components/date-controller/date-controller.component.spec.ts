import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DateControllerComponent } from './date-controller.component';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { IconButtonComponent } from '../icon-button/icon-button.component';

describe('DateControllerComponent', () => {
  let component: DateControllerComponent;
  let fixture: ComponentFixture<DateControllerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DateControllerComponent, IconButtonComponent],
    });
    fixture = TestBed.createComponent(DateControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all elements', () => {
    component.date = new Date(2021, 0, 3);
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('#left-arrow-button'))
    ).toBeTruthy();

    expect(fixture.debugElement.nativeElement.textContent).toContain(
      'January 2021'
    );

    expect(
      fixture.debugElement.query(By.css('#right-arrow-button'))
    ).toBeTruthy();
  });
});
