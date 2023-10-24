import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AlertComponent } from './alert.component';

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

  it('should render message with alert class', () => {
    const message = 'Test alert message';
    component.message = message;
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.textContent).toContain(message);
    expect(fixture.debugElement.query(By.css('.alert'))).toBeTruthy();
  });
});
