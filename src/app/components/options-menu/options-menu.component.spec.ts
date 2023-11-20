import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  DeleteText,
  EditText,
  OptionsMenuComponent,
} from './options-menu.component';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { By } from '@angular/platform-browser';

describe('OptionsMenuComponent', () => {
  let component: OptionsMenuComponent;
  let fixture: ComponentFixture<OptionsMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OptionsMenuComponent, IconButtonComponent],
    });
    fixture = TestBed.createComponent(OptionsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display three-dots icon but no options by default', () => {
    expect(fixture.debugElement.query(By.css('#three-dots-icon'))).toBeTruthy();
    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      EditText
    );
    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      DeleteText
    );
  });

  it('should open and close options on toggle default', () => {
    component.displayMenu = true;
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.textContent).toContain(EditText);
    expect(fixture.debugElement.nativeElement.textContent).toContain(
      DeleteText
    );

    component.displayMenu = false;
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      EditText
    );
    expect(fixture.debugElement.nativeElement.textContent).not.toContain(
      DeleteText
    );
  });
});
