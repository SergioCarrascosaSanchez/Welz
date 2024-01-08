import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ColorPickerComponent } from './color-picker.component';

describe('ColorPickerComponent', () => {
  let component: ColorPickerComponent;
  let fixture: ComponentFixture<ColorPickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColorPickerComponent],
    });
    fixture = TestBed.createComponent(ColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render one element for each color', () => {
    const inputs = fixture.debugElement.queryAll(By.css('.color-box'));

    expect(inputs.length).toBe(component.colors.length);

    inputs.forEach((input, index) => {
      const inlineStyles = input.nativeElement.style;
      const color = component.colors[index];
      expect(inlineStyles.backgroundColor).toBe(color);
    });
  });

  it('should apply select class if element is clicked', () => {
    expect(fixture.debugElement.query(By.css('.selected'))).toBeFalsy();

    component.onColorClicked(component.colors[0]);
    fixture.detectChanges();

    const input = fixture.debugElement.queryAll(By.css('.selected'));
    expect(input.length).toBe(1);
    const inlineStyles = input[0].nativeElement.style;
    const color = component.colors[0];
    expect(inlineStyles.backgroundColor).toBe(color);
  });

  it('should apply select class to one element at a time', () => {
    expect(fixture.debugElement.query(By.css('.selected'))).toBeFalsy();

    component.onColorClicked(component.colors[0]);
    fixture.detectChanges();

    const input1 = fixture.debugElement.query(By.css('.selected'));
    const inlineStyles = input1.nativeElement.style;
    const color = component.colors[0];
    expect(inlineStyles.backgroundColor).toBe(color);

    component.onColorClicked(component.colors[1]);
    fixture.detectChanges();

    const input2 = fixture.debugElement.queryAll(By.css('.selected'));
    expect(input2.length).toBe(1);
    const inlineStyles2 = input2[0].nativeElement.style;
    const color2 = component.colors[1];
    expect(inlineStyles2.backgroundColor).toBe(color2);
  });
});
