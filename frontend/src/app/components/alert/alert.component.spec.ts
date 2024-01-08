import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ALERT_TYPES, AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlertComponent],
    });
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render message', () => {
    const message = 'Test alert message';
    component.message = message;
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.textContent).toContain(message);
  });

  it('should have danger class and icon', () => {
    component.type = ALERT_TYPES.danger;
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.danger}`))
    ).toBeTruthy();
    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.success}`))
    ).toBeFalsy();
    expect(fixture.debugElement.query(By.css('svg'))).toBeTruthy();
  });

  it('should have success class', () => {
    component.type = ALERT_TYPES.success;
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.danger}`))
    ).toBeFalsy();
    expect(
      fixture.debugElement.query(By.css(`.${ALERT_TYPES.success}`))
    ).toBeTruthy();
    expect(fixture.debugElement.query(By.css('svg'))).toBeFalsy();
  });
});
