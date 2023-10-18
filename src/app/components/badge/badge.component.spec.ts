import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BadgeComponent } from './badge.component';
import { DebugElement } from '@angular/core';

describe('BadgeComponent', () => {
  let component: BadgeComponent;
  let fixture: ComponentFixture<BadgeComponent>;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BadgeComponent],
    });
    fixture = TestBed.createComponent(BadgeComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render text', () => {
    const text = 'Test text';
    component.text = text;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('div').textContent).toContain(
      text
    );
  });
  it('should have color aplied', () => {
    let customColor = 'rgb(0, 0, 1)';
    component.color = customColor;
    fixture.detectChanges();
    const colorEl: HTMLElement = fixture.debugElement.query(
      By.css('.badge')
    ).nativeElement;
    expect(colorEl.style.backgroundColor.toString()).toBe(customColor);
  });
  it('should render text and color', () => {
    const text = 'Test text 2';
    let customColor = 'rgb(255, 0, 0)';
    component.color = customColor;
    component.text = text;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('div').textContent).toContain(
      text
    );
  });
});
