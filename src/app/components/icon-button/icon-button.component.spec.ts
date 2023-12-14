import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconButtonComponent } from './icon-button.component';
import { By } from '@angular/platform-browser';

describe('IconButtonComponent', () => {
  let component: IconButtonComponent;
  let fixture: ComponentFixture<IconButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IconButtonComponent],
    });
    fixture = TestBed.createComponent(IconButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply the correct styles to delete button', () => {
    component.type = 'delete';
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css(`.icon`))).toBeTruthy();
    expect(fixture.debugElement.query(By.css(`.transparent`))).toBeTruthy();
    expect(fixture.debugElement.query(By.css(`.crystal`))).toBeFalsy();

    const buttonElement = fixture.debugElement.query(By.css('button'));
    const svgElement = buttonElement.query(By.css('svg'));
    expect(svgElement.styles['width']).toEqual('19px');
    expect(svgElement.styles['height']).toEqual('19px');
    expect(buttonElement.styles['padding']).toEqual('0px');
    expect(buttonElement.styles['margin-right']).toEqual('10px');
  });
  it('should apply the correct styles to arrow-down button', () => {
    component.type = 'arrow-down';
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css(`.icon`))).toBeTruthy();
    expect(fixture.debugElement.query(By.css(`.transparent`))).toBeTruthy();
    expect(fixture.debugElement.query(By.css(`.crystal`))).toBeFalsy();

    const buttonElement = fixture.debugElement.query(By.css('button'));
    const svgElement = buttonElement.query(By.css('svg'));
    expect(svgElement.styles['width']).toEqual('24px');
    expect(svgElement.styles['height']).toEqual('24px');
    expect(buttonElement.styles['padding']).toEqual('0px');
    expect(buttonElement.styles['margin-right']).not.toEqual('10px');
  });
  it('should apply the correct styles to arrow-up button', () => {
    component.type = 'arrow-up';
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css(`.icon`))).toBeTruthy();
    expect(fixture.debugElement.query(By.css(`.transparent`))).toBeTruthy();
    expect(fixture.debugElement.query(By.css(`.crystal`))).toBeFalsy();

    const buttonElement = fixture.debugElement.query(By.css('button'));
    const svgElement = buttonElement.query(By.css('svg'));
    expect(svgElement.styles['width']).toEqual('24px');
    expect(svgElement.styles['height']).toEqual('24px');
    expect(buttonElement.styles['padding']).toEqual('0px');
    expect(buttonElement.styles['margin-right']).not.toEqual('10px');
  });
  it('should apply the correct styles to arrow-left button', () => {
    component.type = 'arrow-left';
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css(`.icon`))).toBeTruthy();
    expect(fixture.debugElement.query(By.css(`.transparent`))).toBeFalsy();
    expect(fixture.debugElement.query(By.css(`.crystal`))).toBeTruthy();

    const buttonElement = fixture.debugElement.query(By.css('button'));
    const svgElement = buttonElement.query(By.css('svg'));
    expect(svgElement.styles['width']).toEqual('24px');
    expect(svgElement.styles['height']).toEqual('24px');
    expect(buttonElement.styles['padding']).not.toEqual('0px');
    expect(buttonElement.styles['margin-right']).not.toEqual('10px');

    component.disabled = true;
    fixture.detectChanges();

    const buttonElementDisabled = fixture.debugElement.query(By.css('button'));
    expect(buttonElementDisabled.styles['background-color']).toEqual(
      'transparent'
    );
    expect(buttonElementDisabled.styles['cursor']).toEqual('default');
    expect(buttonElementDisabled.styles['border']).toEqual(
      '1px solid transparent'
    );
  });
  it('should apply the correct styles to arrow-right button', () => {
    component.type = 'arrow-right';
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css(`.icon`))).toBeTruthy();
    expect(fixture.debugElement.query(By.css(`.transparent`))).toBeFalsy();
    expect(fixture.debugElement.query(By.css(`.crystal`))).toBeTruthy();

    const buttonElement = fixture.debugElement.query(By.css('button'));
    const svgElement = buttonElement.query(By.css('svg'));
    expect(svgElement.styles['width']).toEqual('24px');
    expect(svgElement.styles['height']).toEqual('24px');
    expect(buttonElement.styles['padding']).not.toEqual('0px');
    expect(buttonElement.styles['margin-right']).not.toEqual('10px');

    component.disabled = true;
    fixture.detectChanges();

    const buttonElementDisabled = fixture.debugElement.query(By.css('button'));
    expect(buttonElementDisabled.styles['background-color']).toEqual(
      'transparent'
    );
    expect(buttonElementDisabled.styles['cursor']).toEqual('default');
    expect(buttonElementDisabled.styles['border']).toEqual(
      '1px solid transparent'
    );
  });
  it('should apply the correct styles to edit button', () => {
    component.type = 'edit';
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css(`.icon`))).toBeTruthy();
    expect(fixture.debugElement.query(By.css(`.transparent`))).toBeTruthy();
    expect(fixture.debugElement.query(By.css(`.crystal`))).toBeFalsy();

    const buttonElement = fixture.debugElement.query(By.css('button'));
    const svgElement = buttonElement.query(By.css('svg'));
    expect(svgElement.styles['width']).toEqual('19px');
    expect(svgElement.styles['height']).toEqual('19px');
    expect(buttonElement.styles['padding']).toEqual('0px');
    expect(buttonElement.styles['margin-right']).toEqual('10px');
  });
  it('should apply the correct styles to three-dots button', () => {
    component.type = 'three-dots';
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css(`.icon`))).toBeTruthy();
    expect(fixture.debugElement.query(By.css(`.transparent`))).toBeTruthy();
    expect(fixture.debugElement.query(By.css(`.crystal`))).toBeFalsy();

    const buttonElement = fixture.debugElement.query(By.css('button'));
    const svgElement = buttonElement.query(By.css('svg'));
    expect(svgElement.styles['width']).toEqual('19px');
    expect(svgElement.styles['height']).toEqual('19px');
    expect(buttonElement.styles['padding']).toEqual('0px');
    expect(buttonElement.styles['margin-right']).toEqual('10px');
  });

  it('should apply the correct styles to add button', () => {
    component.type = 'add';
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css(`.icon`))).toBeTruthy();
    expect(fixture.debugElement.query(By.css(`.transparent`))).toBeFalsy();
    expect(fixture.debugElement.query(By.css(`.crystal`))).toBeTruthy();

    const buttonElement = fixture.debugElement.query(By.css('button'));
    const svgElement = buttonElement.query(By.css('svg'));
    expect(svgElement.styles['width']).toEqual('24px');
    expect(svgElement.styles['height']).toEqual('24px');
    expect(buttonElement.styles['padding']).not.toEqual('0px');
    expect(buttonElement.styles['margin-right']).not.toEqual('10px');
  });
  it('should apply the correct styles to add-primary button', () => {
    component.type = 'add-primary';
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css(`.icon`))).toBeTruthy();
    expect(fixture.debugElement.query(By.css(`.transparent`))).toBeFalsy();
    expect(fixture.debugElement.query(By.css(`.crystal`))).toBeTruthy();

    const buttonElement = fixture.debugElement.query(By.css('button'));
    const svgElement = buttonElement.query(By.css('svg'));
    expect(svgElement.styles['width']).toEqual('24px');
    expect(svgElement.styles['height']).toEqual('24px');
    expect(buttonElement.styles['padding']).not.toEqual('0px');
    expect(buttonElement.styles['margin-right']).not.toEqual('10px');
  });
});
